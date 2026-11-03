'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { buildWifiPayload, escapeWifiValue } = require('../public/qr-content');

test('échappe tous les séparateurs réservés du format Wi-Fi', () => {
  assert.equal(escapeWifiValue('a\\b;c,d:e"f'), 'a\\\\b\\;c\\,d\\:e\\"f');
});

test('construit un payload Wi-Fi complet', () => {
  assert.equal(
    buildWifiPayload({ ssid: 'Café;Invités', password: 'p:a,s;s', encryption: 'WPA' }),
    'WIFI:T:WPA;S:Café\\;Invités;P:p\\:a\\,s\\;s;H:false;;',
  );
});

test('ne place pas de mot de passe en mode ouvert', () => {
  assert.equal(
    buildWifiPayload({ ssid: 'Public', password: 'ignoré', encryption: 'nopass' }),
    'WIFI:T:nopass;S:Public;P:;H:false;;',
  );
});
