"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const path_1 = require("path");
const autoload_1 = __importDefault(require("@fastify/autoload"));
// import { nextCallback } from 'fastify-http-proxy'
const fastify_no_icon_1 = __importDefault(require("fastify-no-icon"));
const helmet_1 = __importDefault(require("@fastify/helmet"));
const qs_1 = __importDefault(require("qs"));
//import cors  from 'fastify-cors'
function HospitalRun(fastify, opts) {
    fastify.register(require('fastify-cors'), {
        allowedHeaders: ['Content-Type', 'Authorization'],
    });
    fastify.register(helmet_1.default);
    fastify.register(fastify_no_icon_1.default);
    // This loads all application wide plugins defined in plugins folder
    fastify.register(autoload_1.default, {
        dir: (0, path_1.join)(__dirname, 'plugins'),
        // includeTypeScript: true,
        // options: { ...opts },
    });
    // This loads all routes and services defined in services folder
    fastify.register(autoload_1.default, {
        dir: (0, path_1.join)(__dirname, 'services'),
        // includeTypeScript: true,
        // options: { ...opts },
    });
    fastify.listen();
}
HospitalRun.options = {
    querystringParser: (str) => qs_1.default.parse(str),
    logger: true,
    ignoreTrailingSlash: true,
};
module.exports = HospitalRun;
