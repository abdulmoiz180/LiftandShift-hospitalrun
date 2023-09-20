import { Server, IncomingMessage, ServerResponse } from 'http'
import { FastifyInstance } from 'fastify'
//import { FastifyPluginCallback } from 'fastify'

export default (
  fastify: FastifyInstance<Server, IncomingMessage, ServerResponse>,
  _: {},
/// next: FastifyPluginCallback,
) => {
  fastify.get('/', (_, reply) => {
    reply.send({ root: true })
  })
  //next()
}
