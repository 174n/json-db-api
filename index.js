const fastify = require('fastify')({ logger: true });
const knex = require('knex')
const db = knex(require('./knexfile').development);
const argparse = require('cli-argparse');

fastify.register(require('fastify-rate-limit'), {
  max: 100,
  timeWindow: '1 minute'
});

fastify.register(require('fastify-cors'), { origin: true })

const validIdRegex = /^[A-Za-z0-9\-_]+$/g;

fastify.get('/:jsondir/:jsonid', async (request, reply) => {
  const { jsondir, jsonid } = request.params;
  if (!jsondir.match(validIdRegex) || !jsonid.match(validIdRegex) || (jsondir+jsonid).length >= 255) {
    return reply.code(400).send({ error: 'not valid id' });
  }
  const data = await db("jsons").select("json").where("jsonpath", jsondir + "/" + jsonid);
  return data && data.length > 0 ? data[0].json : reply.code(404).send({ error: 'json not found' });
});

fastify.put('/:jsondir/:jsonid', async (request, reply) => {
  const { jsondir, jsonid } = request.params;
  if (!jsondir.match(validIdRegex) || !jsonid.match(validIdRegex) || (jsondir+jsonid).length >= 255) {
    return reply.code(400).send({ error: 'not valid id' });
  }
  if (!request.body || request.body.length > 1024 * 40) {
    return reply.code(400).send({ error: 'json too big' });
  }
  let json;
  try {
    json = typeof request.body === "string" ? JSON.stringify(JSON.parse(request.body)) : JSON.stringify(request.body);
  } catch (err) {
    console.log(error);
    return reply.code(400).send({ error: 'json not valid' });
  } 
  return db('jsons')
    .where("jsonpath", jsondir + "/" + jsonid)
    .insert({
      jsonpath: jsondir + "/" + jsonid,
      ip: request.connection.remoteAddress,
      json,
      created_at: parseInt(new Date().getTime() / 1000),
      updated_at: parseInt(new Date().getTime() / 1000),
    })
    .onConflict('jsonpath')
    .merge(['json', 'ip', 'updated_at']);
});

fastify.get('*', async (request, reply) => {
  return { welcome: 'welcome to my json db api' };
});

module.exports = argv => {
  const args = argparse(argv);
  const start = async () => {
    try {
      await fastify.listen(args.options.port || 3000);
    } catch (err) {
      fastify.log.error(err);
      process.exit(1);
    }
  }
  start();
}