"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.build = exports.config = void 0;
const fastify_1 = __importDefault(require("fastify"));
const fastify_plugin_1 = __importDefault(require("fastify-plugin"));
const app_1 = __importDefault(require("../src/app"));
// Fill in this config with all the configurations
// needed for testing the application
const config = () => ({
    url: 'http://localhost:5984',
});
exports.config = config;
// automatically build and tear down our instance
const build = (t) => {
    const app = (0, fastify_1.default)();
    // fastify-plugin ensures that all decorators
    // are exposed for testing purposes, this is
    // different from the production setup
    app.register((0, fastify_plugin_1.default)(app_1.default), (0, exports.config)());
    // tear down our app after we are done
    t.tearDown(app.close.bind(app));
    return app;
};
exports.build = build;
exports.default = {
    config: exports.config,
    build: exports.build,
};
