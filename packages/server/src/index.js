"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// we need this file because of this issue: https://github.com/fastify/fastify-cli/issues/131
require("make-promises-safe");
const Fastify = require("fastify")();
const app_1 = __importDefault(require("./app"));
const blipp = require('fastify-blipp');
const port = Number(process.env.PORT) || 3000;
const ip = process.env.IP || '0.0.0.0';
const fastify = Fastify(app_1.default.options);
fastify.register(app_1.default);
if (process.env.NODE_ENV !== 'production') {
    fastify.register(blipp);
}
fastify.listen(port, ip, (err) => {
    if (err) {
        fastify.log.error(err);
        process.exit(1);
    }
    if (process.env.NODE_ENV !== 'production') {
        fastify.blipp();
        fastify.log.info(`Database username 'dev', password 'dev, GUI running on: http://localhost:5984/_utils`);
    }
});
