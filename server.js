const express = require("express");
const QRCode = require("qrcode");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const app = express();
const PORT = process.env.PORT || 3300;
const HOST = process.env.HOST || "127.0.0.1";
const ERRORS_TOKEN = process.env.ERRORS_TOKEN || "";

function secretMatches(received, expected) {
  if (typeof received !== "string" || typeof expected !== "string" || !expected) return false;
  const actual = Buffer.from(received);
  const wanted = Buffer.from(expected);
  return actual.length === wanted.length && crypto.timingSafeEqual(actual, wanted);
}

// ===== SECURITY =====
app.disable("x-powered-by");
app.set("trust proxy", 1);
app.use((req, res, next) => {
  res.set("X-Content-Type-Options", "nosniff");
  res.set("Referrer-Policy", "strict-origin-when-cross-origin");
  next();
});

app.use(express.json({ limit: "16kb" }));
app.use(express.static(path.join(__dirname, "public")));

// ===== STATS =====
const STATS_FILE = path.join(__dirname, "stats.json");
let stats = { generated: 0 };
if (fs.existsSync(STATS_FILE)) {
  try { stats = { ...stats, ...JSON.parse(fs.readFileSync(STATS_FILE, "utf-8")) }; } catch {}
}
function saveJson(file, value) {
  const temporary = `${file}.${process.pid}.tmp`;
  fs.writeFileSync(temporary, JSON.stringify(value, null, 2), { mode: 0o600 });
  fs.chmodSync(temporary, 0o600);
  fs.renameSync(temporary, file);
}
function saveStats() { saveJson(STATS_FILE, stats); }
setInterval(saveStats, 30_000).unref();

// Generate QR as PNG data URL
app.post("/api/generate", async (req, res) => {
  const {
    content,
    format = "both",
    size = 400,
    errorCorrection = "M",
    fgColor = "#000000",
    bgColor = "#ffffff",
  } = req.body || {};

  if (!content || typeof content !== "string") {
    return res.status(400).json({ error: "No content" });
  }
  if (content.length > 4000) {
    return res.status(400).json({ error: "Content too long (max 4000 chars)" });
  }

  if (!["png", "svg", "both"].includes(format)) {
    return res.status(400).json({ error: "Unsupported format" });
  }
  if (!["L", "M", "Q", "H"].includes(errorCorrection)) {
    return res.status(400).json({ error: "Invalid error correction level" });
  }
  const colorPattern = /^#[0-9a-f]{6}$/i;
  if (!colorPattern.test(fgColor) || !colorPattern.test(bgColor)) {
    return res.status(400).json({ error: "Invalid color" });
  }
  if (fgColor.toLowerCase() === bgColor.toLowerCase()) {
    return res.status(400).json({ error: "Foreground and background colors must differ" });
  }

  const options = {
    errorCorrectionLevel: errorCorrection,
    width: Math.min(Math.max(parseInt(size) || 400, 100), 2000),
    margin: 2,
    color: { dark: fgColor, light: bgColor },
  };

  try {
    if (format === "both") {
      const [png, svg] = await Promise.all([
        QRCode.toDataURL(content, options),
        QRCode.toString(content, { ...options, type: "svg" }),
      ]);
      stats.generated++;
      res.json({ png, svg, format: "both" });
    } else if (format === "svg") {
      const svg = await QRCode.toString(content, { ...options, type: "svg" });
      stats.generated++;
      res.json({ data: svg, format: "svg" });
    } else {
      const dataUrl = await QRCode.toDataURL(content, options);
      stats.generated++;
      res.json({ data: dataUrl, format: "png" });
    }
  } catch (err) {
    console.error("[GENERATE]", err.message);
    res.status(422).json({ error: "Le contenu ne peut pas être encodé avec ces options." });
  }
});

app.get("/api/stats", (req, res) => {
  res.json({ cumulative: stats });
});


// ===== ERROR LOGGING =====
const ERRORS_FILE = path.join(__dirname, "errors.json");
let errorLogs = [];
if (fs.existsSync(ERRORS_FILE)) {
  try { errorLogs = JSON.parse(fs.readFileSync(ERRORS_FILE, "utf-8")); } catch {}
}

function logError(type, error, extra) {
  const entry = { time: new Date().toISOString(), type, error: typeof error === "string" ? error.substring(0, 500) : String(error).substring(0, 500), ...extra };
  errorLogs.push(entry);
  if (errorLogs.length > 500) errorLogs = errorLogs.slice(-500);
  try { saveJson(ERRORS_FILE, errorLogs); } catch {}
  console.log("[ERROR-LOG] " + type + " — " + entry.error.substring(0, 100));
}

app.post("/api/report-bug", (req, res) => {
  const { error, comment, userAgent, page } = req.body || {};
  logError("user-report", error || "No error message", {
    comment: String(comment || "").substring(0, 500),
    page: String(page || "/").substring(0, 200),
    userAgent: String(userAgent || req.headers["user-agent"] || "").substring(0, 300),
  });
  res.json({ ok: true });
});

app.get("/api/errors", (req, res) => {
  if (!ERRORS_TOKEN || !secretMatches(req.headers.authorization, `Bearer ${ERRORS_TOKEN}`)) {
    return res.status(404).json({ error: "Not found" });
  }
  res.set("Cache-Control", "no-store");
  res.json(errorLogs.slice(-100).reverse());
});
// ===== 404 CATCH-ALL =====
app.use((req, res) => {
  res.status(404).json({ error: "Not found" });
});

// ===== GLOBAL ERROR HANDLER =====
app.use((err, req, res, next) => {
  console.error("[ERROR]", err.message);
  if (err.type === "entity.too.large") return res.status(413).json({ error: "Requête trop volumineuse" });
  if (err.type === "entity.parse.failed") return res.status(400).json({ error: "JSON invalide" });
  res.status(500).json({ error: "Erreur interne du serveur" });
});


if (require.main === module) {
  app.listen(PORT, HOST, () => {
    console.log(`QR Generator running on http://${HOST}:${PORT}`);
  });
}

module.exports = { app, secretMatches };
