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
const util_1 = require("util");
const fs_1 = __importDefault(require("fs"));
const Sade_1 = __importDefault(require("Sade"));
const typescript_1 = __importDefault(require("typescript"));
const require_from_string_1 = __importDefault(require("require-from-string"));
const glob_1 = __importDefault(require("glob"));
const chalk_1 = __importDefault(require("chalk"));
const path_1 = __importDefault(require("path"));
const mkdirp_1 = require("mkdirp");
const stat = (0, util_1.promisify)(fs_1.default.stat);
const readFile = (0, util_1.promisify)(fs_1.default.readFile);
const writeFile = (0, util_1.promisify)(fs_1.default.writeFile);
const unlink = (0, util_1.promisify)(fs_1.default.unlink);
const glob = (0, util_1.promisify)(glob_1.default);
function deleteOldDdocs(dest) {
    return __awaiter(this, void 0, void 0, function* () {
        const oldDdocs = yield glob(path_1.default.join(dest, '**/*.json'));
        return Promise.all(oldDdocs.map((file) => unlink(file)));
    });
}
const prog = (0, Sade_1.default)('ddoc');
prog.version('0.1.0');
prog
    .command('build <src>', 'Build design document(s) from TypeScript soruce directory or file.', {
    default: true,
})
    .describe('Build design documents from TypeScript soruce directory or file.')
    .option('-c, --config', 'Provide path to custom tsconfig.json', './tsconfig.json')
    .example('build src/db/designs')
    .example('build src/db/designs/patient.ts -c src/db/tsconfig.json')
    .action((src, opts) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const cwd = process.cwd();
        const tsconfigPath = path_1.default.isAbsolute(opts.config) ? opts.config : path_1.default.join(cwd, opts.config);
        console.log(`> ${chalk_1.default.bgBlueBright(chalk_1.default.black(' ddoc build config '))} ${chalk_1.default.cyan(tsconfigPath)}`);
        const tsconfig = require(tsconfigPath); // eslint-disable-line
        src = path_1.default.isAbsolute(src) ? path_1.default.normalize(src) : path_1.default.join(cwd, src); // eslint-disable-line
        let srcStats;
        try {
            srcStats = yield stat(src);
        }
        catch (e) {
            const err = e;
            if (err === 'ENOENT') {
                console.log(chalk_1.default.bgGreen(chalk_1.default.black(`\n ddoc build - No input files found. Done. `)));
                process.exit(0);
            }
            throw err;
        }
        // use outDir if specified inside tsconfig, otherwise build json alongside ts files
        let dest = ((_a = tsconfig === null || tsconfig === void 0 ? void 0 : tsconfig.compilerOptions) === null || _a === void 0 ? void 0 : _a.outDir)
            ? path_1.default.join(path_1.default.dirname(tsconfigPath), tsconfig.compilerOptions.outDir)
            : '';
        let ddocs;
        if (srcStats.isDirectory()) {
            dest = dest || src;
            ddocs = yield glob(path_1.default.join(src, '**/*.ts'));
        }
        else {
            dest = dest || path_1.default.dirname(src);
            ddocs = [src];
        }
        console.log(`> ${chalk_1.default.bgBlueBright(chalk_1.default.black(' ddoc build src '))} ${chalk_1.default.cyan(src)}`);
        yield (0, mkdirp_1.mkdirp)(dest);
        yield deleteOldDdocs(dest);
        console.log(`> ${chalk_1.default.bgBlueBright(chalk_1.default.black(' ddoc build dest '))} ${chalk_1.default.cyan(dest)}`);
        const errors = [];
        yield Promise.all(ddocs.map((srcPath) => __awaiter(void 0, void 0, void 0, function* () {
            var _b;
            try {
                const sourceFile = (yield readFile(srcPath)).toString();
                const output = typescript_1.default.transpileModule(sourceFile, tsconfig);
                const filename = path_1.default.basename(srcPath, '.ts');
                const ddoc = (0, require_from_string_1.default)(output.outputText);
                const stringifiedDesign = JSON.stringify((_b = ddoc.default) !== null && _b !== void 0 ? _b : ddoc, (_, val) => {
                    if (typeof val === 'function') {
                        return val.toString();
                    }
                    return val;
                }, 1);
                yield writeFile(path_1.default.join(dest, `${filename}.json`), stringifiedDesign);
            }
            catch (e) {
                let error = e;
                errors.push({ file: srcPath, error });
            }
        })));
        if (errors.length > 0) {
            errors.forEach(err => {
                var _a;
                console.log(`\n> ${chalk_1.default.bgRed(chalk_1.default.white(' ddoc build compile error '))} ${chalk_1.default.cyan(err.file)}${(_a = err.error.stack) === null || _a === void 0 ? void 0 : _a.toString()}\n`);
            });
            throw new Error(`ddoc compilation failed. Resolve errors ${errors.length} ${errors.length > 1 ? 'files' : 'file'} and try again.`);
        }
        console.log(chalk_1.default.bgGreen(chalk_1.default.black(`\n ddoc build - done on ${ddocs.length} files. `)));
    }
    catch (e) {
        const err = e;
        console.error(chalk_1.default.bgRed(chalk_1.default.white(` ${(err).message} `)));
        process.exit(1);
    }
}));
prog.parse(process.argv);
