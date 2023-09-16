"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import { nextCallback } from 'fastify-plugin'
exports.default = (fastify, _) => {
    fastify.get('/', (_, reply) => {
        reply.send({ root: true });
    });
    // next()
};
