# QR Generator

**Free online QR code generator** — Create customizable QR codes instantly. Text, URL, WiFi, email, phone numbers.

**[Use it now → qr.purvanas.fr](https://qr.purvanas.fr)**

## Features

- **Multiple types**: URL, text, WiFi, email, phone, SMS, vCard
- **Customizable**: colors, size, error correction level
- **Instant download**: PNG export, no watermark
- **No account required**: paste, generate, download
- **Privacy**: nothing is sent to any server — QR codes are generated in your browser

## Tech Stack

- **Backend**: Node.js, Express
- **QR engine**: qrcode.js (client-side generation)
- **Frontend**: Vanilla HTML/CSS/JS
- **Hosting**: Self-hosted on Ubuntu Server

## Self-hosting

```bash
git clone https://github.com/Purvanas/qr-generator.git
cd qr-generator
npm install
node server.js
```

Runs on port 3300 by default.

## License

MIT

## Links

- **Live demo**: [qr.purvanas.fr](https://qr.purvanas.fr)
- **Author**: [Purvanas](https://purvanas.fr)
- **Other tools**: [Universal Downloader](https://dl.purvanas.fr) · [FileDrop](https://drop.purvanas.fr) · [Converter](https://convert.purvanas.fr) · [Photo Editor](https://edit.purvanas.fr)
