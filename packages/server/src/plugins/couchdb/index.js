"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_plugin_1 = __importDefault(require("fastify-plugin"));
const nano_1 = __importDefault(require("nano"));
const proxy_1 = __importDefault(require("./proxy"));
const COUCHDB_URL = process.env.COUCHDB_URL ? String(process.env.COUCHDB_URL) : undefined;
function couchDB(fastify, options, next) {
    const url = COUCHDB_URL || options.url;
    const couch = (0, nano_1.default)(Object.assign(Object.assign({}, options), { url }));
    fastify.decorate('couch', couch);
    fastify.register(proxy_1.default, { url });
    next();
}
couchDB.autoConfig = {
    url: COUCHDB_URL,
};
exports.default = (0, fastify_plugin_1.default)(couchDB);
