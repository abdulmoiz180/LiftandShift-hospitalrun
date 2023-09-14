"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const build_1 = __importDefault(require("./build"));
const extract_1 = __importDefault(require("./extract"));
exports.default = (prog) => {
    (0, build_1.default)(prog);
    (0, extract_1.default)(prog);
};
