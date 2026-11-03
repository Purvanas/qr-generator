'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { secretMatches } = require('../server');

test('compare les autorisations sans accepter une longueur ou une valeur différente', () => {
  assert.equal(secretMatches('Bearer abcdef', 'Bearer abcdef'), true);
  assert.equal(secretMatches('Bearer abcdeg', 'Bearer abcdef'), false);
  assert.equal(secretMatches('Bearer abc', 'Bearer abcdef'), false);
  assert.equal(secretMatches(undefined, 'Bearer abcdef'), false);
});
