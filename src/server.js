const Fastify = require('fastify');
const Database = require('./database.js');
const jsonpatch = require('fast-json-patch');
const EventEmitter2 = require('eventemitter2');
const emitter = new EventEmitter2();

module.exports = ({logger, knexfile, longpollTimeout} = {}) => {
  if (!knexfile) {
    throw new Error("Knex file not defined");
  }
  const fastify = Fastify({
    logger
  });
  const db = new Database(knexfile);

  fastify.register(require('fastify-rate-limit'), {
    max: 100,
    timeWindow: '1 minute'
  });

  fastify.register(require('fastify-cors'), { origin: true })

  const validIdRegex = /^[A-Za-z0-9\-_]+$/g;
  fastify.addHook('preHandler', (request, reply, done) => {
    const { jsondir, jsonid } = request.params;

    if (jsondir || jsonid) { // TODO: use route validation
      if (!jsondir.match(validIdRegex) || !jsonid.match(validIdRegex) || (jsondir+jsonid).length >= 255) {
        return reply.code(400).send({ error: 'not valid id' });
      } else {
        request.jsondir = jsondir;
        request.jsonid = jsonid;
      }
    }

    if (request.body && (request.body.length > 1024 * 40 || typeof request.body !== "object")) {
      return reply.code(400).send({ error: 'json not valid or too big' });
    }

    done();
  })

  fastify.get('/:jsondir/:jsonid', async (request, reply) => {
    if (request.query.longpoll) {
      const patchUpdate = (patch, json) => {
        clearTimeout(timeout);
        clearEvents();
        if (request.query.patch) {
          return reply.code(200).send(patch);
        } else {
          return reply.code(200).send(json);
        }
      }
      const jsonUpdate = json => {
        clearTimeout(timeout);
        clearEvents();
        return reply.code(200).send(json);
      };
      const timeout = setTimeout(() => {
        clearEvents();
        return reply.code(204).send(undefined);
      }, longpollTimeout || 15000);
      emitter.on('patch.update', patchUpdate);
      emitter.on('json.update', jsonUpdate);
      const clearEvents = () => {
        emitter.off('patch.update', patchUpdate);
        emitter.off('json.update', jsonUpdate);
      }
      await reply;
    } else {
      const { jsondir, jsonid } = request;
      const data = await db.getRecord(jsondir + "/" + jsonid);
      return data && data.length > 0 ? reply.code(200).send(data[0].json) : reply.code(404).send({ error: 'json not found' });
    }
  });

  fastify.put('/:jsondir/:jsonid', async (request, reply) => {
    if (request.query.patch) {
      const { jsondir, jsonid } = request;

      const res = (await db.getRecord(jsondir + "/" + jsonid))[0];
      let obj;
      if (res && res.json) {
        obj = JSON.parse(res.json);
        const errors = jsonpatch.validate(request.body, obj);
        if (errors && errors.length > 0) {
          return reply.code(400).send({ error: 'json patch is not valid' });
        }
      } else {
        return reply.code(404).send({ error: 'json not found' });
      }

      let json;
      try {
        json = jsonpatch.applyPatch(obj, request.body).newDocument;
      } catch (err) {
        return reply.code(500).send({ error: 'error patching json' });
      }
      const body = JSON.stringify(json);
      if (json.length > 1024 * 40) {
        return reply.code(400).send({ error: 'json is too big' });
      }

      try {
        await db.updateRecord({
          jsonpath: jsondir + "/" + jsonid,
          ip: request.connection.remoteAddress,
          json: body
        });
      } catch (err) {
        return reply.code(500).send({ error: 'error updating json' });
      }

      emitter.emit('patch.update', request.body, body);
      return reply.code(201).send({ success: 'successfully updated' });
    } else {
      const { jsondir, jsonid } = request;

      try {
        await db.updateRecord({
          jsonpath: jsondir + "/" + jsonid,
          ip: request.connection.remoteAddress,
          json: JSON.stringify(request.body)
        });
      } catch (err) {
        return reply.code(500).send({ error: 'error updating json' });
      }

      emitter.emit('json.update', request.body);
      return reply.code(201).send({ success: 'successfully updated' });
    }
  });

  fastify.get('*', async (request, reply) => {
    return { welcome: 'welcome to my json db api' };
  });

  return fastify;
}