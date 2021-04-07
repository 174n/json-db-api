const { test, beforeEach, afterEach, teardown } = require('tap');
const app = require('../src/server.js');
const knex = require('knex');
const knexfile = require("../knexfile_test.js");

beforeEach((done, t) => {
  t.context.app = app({ knexfile });
  done();
});

afterEach((done, t) => {
  t.context.app.close();
  done();
});

// test('setups database', async t => { // damn workaround
//   t.doesNotThrow(async () => await knex(knexfile).migrate.up(), {}, { skip:true });
//   t.end();
// });
// teardown(async () => await knex(knexfile).migrate.down());

test('requests the "/" route', async t => {
  const app = t.context.app;
  try {
    const res = await app.inject({ url: '/' });
    t.strictEqual(res.statusCode, 200, 'returns a status code of 200');
  } catch (err) {
    t.error(err);
  }
  t.end();
});