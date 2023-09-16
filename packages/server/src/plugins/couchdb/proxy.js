"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_proxy_1 = __importDefault(require("@fastify/http-proxy"));
function couchDBProxy(fastify, options, next) {
    fastify.register(http_proxy_1.default, {
        upstream: options.url,
        prefix: '/_db',
    });
    next();
}
couchDBProxy.autoConfig = {
    url: process.env.COUCHDB_URL,
};
exports.default = couchDBProxy;
