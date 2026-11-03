'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { app } = require('../server');

test('génère PNG et SVG en une requête et valide les options', async (t) => {
  const server = app.listen(0, '127.0.0.1');
  await new Promise((resolve) => server.once('listening', resolve));
  t.after(() => new Promise((resolve) => server.close(resolve)));
  const base = `http://127.0.0.1:${server.address().port}`;

  const generated = await fetch(`${base}/api/generate`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ content: 'https://purvanas.fr', format: 'both' }),
  });
  assert.equal(generated.status, 200);
  const body = await generated.json();
  assert.match(body.png, /^data:image\/png;base64,/);
  assert.match(body.svg, /^<svg/);

  const invalid = await fetch(`${base}/api/generate`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ content: 'test', fgColor: 'red' }),
  });
  assert.equal(invalid.status, 400);

  const errors = await fetch(`${base}/api/errors`);
  assert.equal(errors.status, 404);
});
