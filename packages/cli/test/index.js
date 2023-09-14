"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tap_1 = require("tap");
const path_1 = require("path");
const mkdirp_1 = __importDefault(require("mkdirp"));
const rimraf_1 = __importDefault(require("rimraf"));
const extract_1 = __importDefault(require("../src/ddoc/extract/extract"));
const dummyData = (0, path_1.join)(__dirname, './dummy-data');
(0, tap_1.test)('Should extract design documents from a backup', (t) => __awaiter(void 0, void 0, void 0, function* () {
    const destinationFolder = (0, path_1.join)(dummyData, 'output');
    yield (0, mkdirp_1.default)(destinationFolder);
    t.test('to json', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, extract_1.default)((0, path_1.join)(dummyData, 'main.txt'), {
            destination: destinationFolder,
            format: 'json',
            noVerbose: true,
        });
    }));
    t.test('to JavaScript', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, extract_1.default)((0, path_1.join)(dummyData, 'main.txt'), {
            destination: destinationFolder,
            format: 'js',
            noVerbose: true,
        });
    }));
    t.test('to TypeScript', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, extract_1.default)((0, path_1.join)(dummyData, 'main.txt'), {
            destination: destinationFolder,
            format: 'ts',
            noVerbose: true,
        });
    }));
    t.tearDown(() => rimraf_1.default.sync(destinationFolder));
    t.end();
}));
