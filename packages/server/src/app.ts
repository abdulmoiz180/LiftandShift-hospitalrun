import { join } from 'path'
import AutoLoad from '@fastify/autoload'
import { FastifyInstance } from 'fastify'
import noIcon from 'fastify-no-icon'
import fastifyHelmet from '@fastify/helmet'
import qs from 'qs'
import cors from '@fastify/cors'
// opts: any, next: FastifyPluginCallback
function HospitalRun(fastify: FastifyInstance, 
) {
  fastify.register(cors, {
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
  fastify.register(fastifyHelmet)
  fastify.register(noIcon)

  // This loads all application wide plugins defined in plugins folder
  fastify.register(AutoLoad, {
    dir: join(__dirname, 'plugins'),
    // includeTypeScript: true,
    // options: { ...opts },
  })

  // This loads all routes and services defined in services folder
  fastify.register(AutoLoad, {
    dir: join(__dirname, 'services'),
    // includeTypeScript: true,
    // options: { ...opts },
  })

  // next()
}

HospitalRun.options = {
  querystringParser: (str: string) => qs.parse(str),
  logger: true,
  ignoreTrailingSlash: true,
}

export = HospitalRun







