// import { test } from 'tap'
import Fastify from 'fastify'
import Support from '../../src/plugins/support'
import { test } from 'node:test'  // it was import { test } from 'tap'

test('support works standalone', async (t: any) => {
  const fastify = Fastify()
  fastify.register(Support)

  await fastify.ready()
  t.equal(fastify.someSupport(), 'hugs')
})
