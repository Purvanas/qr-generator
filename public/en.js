i18n.init({ en: {
  // Header
  '.subtitle': 'Free QR code generator',

  // Type toggle
  '.type-btn[data-type="text"]': 'Text / URL',
  '.type-btn[data-type="wifi"]': 'WiFi',
  '.type-btn[data-type="email"]': 'Email',

  // Text input
  '#input-text label': 'Content',
  '#qr-content': { placeholder: 'Enter text or a URL...' },

  // WiFi input
  '#input-wifi .input-group:nth-child(1) label': 'Network name (SSID)',
  '#input-wifi .input-group:nth-child(2) label': 'Password',
  '#input-wifi .input-group:nth-child(3) label': 'Encryption',
  '#wifi-enc option[value="nopass"]': 'None',

  // Email input
  '#input-email .input-group:nth-child(1) label': 'Email address',
  '#input-email .input-group:nth-child(2) label': 'Subject (optional)',
  '#input-email .input-group:nth-child(3) label': 'Body (optional)',
  '#email-subject': { placeholder: 'Email subject' },
  '#email-body': { placeholder: 'Email body...' },

  // Options
  '.option:nth-child(1) label': 'Size',
  '.option:nth-child(2) label': 'Correction',

  // Colors
  '.color-group:nth-child(1) label': 'Color',
  '.color-group:nth-child(2) label': 'Background',

  // Preview
  '.preview .placeholder': 'Enter content to generate a QR code',

  // Buttons
  '#dl-png': 'Download PNG',
  '#dl-svg': 'Download SVG',

  // Cross-links
  '[href="https://dl.purvanas.fr"]': '<span style="color:#22c55e">\u2193</span> Download a video',
  '[href="https://convert.purvanas.fr"]': '<span style="color:#f59e0b">\u2699</span> Convert a file',
  '[href="https://drop.purvanas.fr"]': '<span style="color:#6ea8fe">\u21ea</span> Share a file',

  // SEO content
  'div[style*="max-width:420px"] > h2:first-of-type': 'Free online QR Code Generator',
  'div[style*="max-width:420px"] > p:nth-of-type(1)': 'Create custom QR codes instantly with no sign-up or software to install. The content is sent to the generator service and is not stored by the application.',

  'div[style*="max-width:420px"] > h3:nth-of-type(1)': 'QR Code for URLs and websites',
  'div[style*="max-width:420px"] > p:nth-of-type(2)': 'Generate a QR code for any URL. Perfect for business cards, flyers, posters, or restaurant menus. Paste your link, customize the colors, and download the QR code as PNG.',

  'div[style*="max-width:420px"] > h3:nth-of-type(2)': 'WiFi QR Code',
  'div[style*="max-width:420px"] > p:nth-of-type(3)': 'Create a WiFi QR code that your guests can scan to connect automatically to your network. No need to dictate the password \u2014 one scan is all it takes. Compatible with all smartphones.',

  'div[style*="max-width:420px"] > h3:nth-of-type(3)': 'QR Code for text, email, and phone',
  'div[style*="max-width:420px"] > p:nth-of-type(4)': 'Encode free text, an email address (mailto:), a phone number (tel:), or an SMS into a QR code. Useful for marketing materials, product labels, or email signatures.',

  'div[style*="max-width:420px"] > h3:nth-of-type(4)': 'Customization and size',
  'div[style*="max-width:420px"] > p:nth-of-type(5)': 'Choose the QR code colors (foreground and background), pixel size, and error correction level (L, M, Q, H). A higher correction level allows the QR code to be read even when partially damaged.',

  // FAQ
  'div[style*="max-width:420px"] div[style*="margin-top:1.5rem"] > h2': 'Frequently asked questions',
  'div[style*="max-width:420px"] details:nth-of-type(1) summary': 'How do I create a free QR code?',
  'div[style*="max-width:420px"] details:nth-of-type(1) p': 'Paste your text, URL, or WiFi information into the field, customize the colors and size, then click Download. The QR code is generated instantly as a PNG.',
  'div[style*="max-width:420px"] details:nth-of-type(2) summary': 'Does the QR code expire?',
  'div[style*="max-width:420px"] details:nth-of-type(2) p': 'No. A QR code is a static image \u2014 it never expires. The encoded information remains accessible as long as the destination (URL, WiFi, etc.) is active.',
  'div[style*="max-width:420px"] details:nth-of-type(3) summary': 'Is my content stored?',
  'div[style*="max-width:420px"] details:nth-of-type(3) p': 'The content is sent to the server to generate the PNG and SVG files. The application does not store it after returning the result.',
  'div[style*="max-width:420px"] details:nth-of-type(4) summary': 'Which file formats are available?',
  'div[style*="max-width:420px"] details:nth-of-type(4) p': 'Use PNG for everyday needs or SVG for a scalable vector file.',

  // Footer
  '.footer': 'No data stored \u00b7 Instant server-side generation<br><a href="https://purvanas.fr">purvanas.fr</a>',

  // Bug report
  '#bug-desc': { placeholder: 'Describe the issue...' },

  // Legal footer
  '#legal-links a:nth-child(1)': 'Legal notice',
  '#legal-links a:nth-child(2)': 'Privacy policy',

  // Legal modal
  '#legal-modal h2': 'Legal notice',
  '#legal-modal h3:nth-of-type(1)': 'Service description',
  '#legal-modal h3:nth-of-type(2)': 'Liability',
  '#legal-modal h3:nth-of-type(3)': 'Intellectual property',
  '#legal-modal button': 'Close',

  // Privacy modal
  '#privacy-modal h2': 'Privacy policy',
  '#privacy-modal h3:nth-of-type(1)': 'Data collected',
  '#privacy-modal h3:nth-of-type(2)': 'Analytics',
  '#privacy-modal h3:nth-of-type(3)': 'Advertising',
  '#privacy-modal h3:nth-of-type(4)': 'Processed files',
  '#privacy-modal h3:nth-of-type(5)': 'Server logs',
  '#privacy-modal h3:nth-of-type(6)': 'Contact',
  '#privacy-modal button': 'Close',
}});
