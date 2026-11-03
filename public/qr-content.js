(function exposeQrContent(root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.QrContent = api;
}(typeof globalThis !== 'undefined' ? globalThis : this, function createQrContent() {
  'use strict';

  function escapeWifiValue(value) {
    return String(value ?? '').replace(/([\\;,:"])/g, '\\$1');
  }

  function buildWifiPayload({ ssid, password, encryption, hidden = false }) {
    const type = ['WPA', 'WEP', 'nopass'].includes(encryption) ? encryption : 'WPA';
    const pass = type === 'nopass' ? '' : escapeWifiValue(password);
    return `WIFI:T:${type};S:${escapeWifiValue(ssid)};P:${pass};H:${hidden ? 'true' : 'false'};;`;
  }

  return { escapeWifiValue, buildWifiPayload };
}));
