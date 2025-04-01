"use strict";
function _array_like_to_array(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function _array_with_holes(arr) {
    if (Array.isArray(arr)) return arr;
}
function _array_without_holes(arr) {
    if (Array.isArray(arr)) return _array_like_to_array(arr);
}
function asyncGeneratorStep(gen, resolve1, reject, _next, _throw, key, arg) {
    try {
        var info = gen[key](arg);
        var value = info.value;
    } catch (error) {
        reject(error);
        return;
    }
    if (info.done) {
        resolve1(value);
    } else {
        Promise.resolve(value).then(_next, _throw);
    }
}
function _async_to_generator(fn) {
    return function() {
        var self = this, args = arguments;
        return new Promise(function(resolve1, reject) {
            var gen = fn.apply(self, args);
            function _next(value) {
                asyncGeneratorStep(gen, resolve1, reject, _next, _throw, "next", value);
            }
            function _throw(err) {
                asyncGeneratorStep(gen, resolve1, reject, _next, _throw, "throw", err);
            }
            _next(undefined);
        });
    };
}
function _iterable_to_array(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _iterable_to_array_limit(arr, i) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
    if (_i == null) return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _s, _e;
    try {
        for(_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true){
            _arr.push(_s.value);
            if (i && _arr.length === i) break;
        }
    } catch (err) {
        _d = true;
        _e = err;
    } finally{
        try {
            if (!_n && _i["return"] != null) _i["return"]();
        } finally{
            if (_d) throw _e;
        }
    }
    return _arr;
}
function _non_iterable_rest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _non_iterable_spread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _sliced_to_array(arr, i) {
    return _array_with_holes(arr) || _iterable_to_array_limit(arr, i) || _unsupported_iterable_to_array(arr, i) || _non_iterable_rest();
}
function _to_consumable_array(arr) {
    return _array_without_holes(arr) || _iterable_to_array(arr) || _unsupported_iterable_to_array(arr) || _non_iterable_spread();
}
function _type_of(obj) {
    "@swc/helpers - typeof";
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
}
function _unsupported_iterable_to_array(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _array_like_to_array(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _array_like_to_array(o, minLen);
}
function _ts_generator(thisArg, body) {
    var f, y, t, g, _ = {
        label: 0,
        sent: function() {
            if (t[0] & 1) throw t[1];
            return t[1];
        },
        trys: [],
        ops: []
    };
    return g = {
        next: verb(0),
        "throw": verb(1),
        "return": verb(2)
    }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
        return this;
    }), g;
    function verb(n) {
        return function(v) {
            return step([
                n,
                v
            ]);
        };
    }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while(_)try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [
                op[0] & 2,
                t.value
            ];
            switch(op[0]){
                case 0:
                case 1:
                    t = op;
                    break;
                case 4:
                    _.label++;
                    return {
                        value: op[1],
                        done: false
                    };
                case 5:
                    _.label++;
                    y = op[1];
                    op = [
                        0
                    ];
                    continue;
                case 7:
                    op = _.ops.pop();
                    _.trys.pop();
                    continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                        _ = 0;
                        continue;
                    }
                    if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                        _.label = op[1];
                        break;
                    }
                    if (op[0] === 6 && _.label < t[1]) {
                        _.label = t[1];
                        t = op;
                        break;
                    }
                    if (t && _.label < t[2]) {
                        _.label = t[2];
                        _.ops.push(op);
                        break;
                    }
                    if (t[2]) _.ops.pop();
                    _.trys.pop();
                    continue;
            }
            op = body.call(thisArg, _);
        } catch (e) {
            op = [
                6,
                e
            ];
            y = 0;
        } finally{
            f = t = 0;
        }
        if (op[0] & 5) throw op[1];
        return {
            value: op[0] ? op[1] : void 0,
            done: true
        };
    }
}
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = function(target, all) {
    for(var name in all)__defProp(target, name, {
        get: all[name],
        enumerable: true
    });
};
var __copyProps = function(to, from, except, desc) {
    if (from && (typeof from === "undefined" ? "undefined" : _type_of(from)) === "object" || typeof from === "function") {
        var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
        try {
            var _loop = function() {
                var key = _step.value;
                if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
                    get: function() {
                        return from[key];
                    },
                    enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
                });
            };
            for(var _iterator = __getOwnPropNames(from)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true)_loop();
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally{
            try {
                if (!_iteratorNormalCompletion && _iterator.return != null) {
                    _iterator.return();
                }
            } finally{
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }
    }
    return to;
};
var __toESM = function(mod, isNodeMode, target) {
    return target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(// If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", {
        value: mod,
        enumerable: true
    }) : target, mod);
};
var __toCommonJS = function(mod) {
    return __copyProps(__defProp({}, "__esModule", {
        value: true
    }), mod);
};
// src/utils/index-nodejs.ts
var index_nodejs_exports = {};
__export(index_nodejs_exports, {
    appendFileSync: function() {
        return appendFileSync2;
    },
    checkPackage: function() {
        return checkPackage;
    },
    clearAllErrorLists: function() {
        return clearAllErrorLists;
    },
    commandFormatter: function() {
        return commandFormatter;
    },
    commandLog: function() {
        return commandLog;
    },
    dirname: function() {
        return dirname2;
    },
    executeCommand: function() {
        return executeCommand;
    },
    existsSync: function() {
        return existsSync2;
    },
    getLatestPackageVersion: function() {
        return getLatestPackageVersion;
    },
    getPackageJson: function() {
        return getPackageJson;
    },
    getStorageDir: function() {
        return getStorageDir;
    },
    getStoredErrorLists: function() {
        return getStoredErrorLists;
    },
    initNodePersist: function() {
        return initNodePersist;
    },
    join: function() {
        return join2;
    },
    readFileSync: function() {
        return readFileSync2;
    },
    require: function() {
        return require2;
    },
    resolve: function() {
        return resolve2;
    },
    resolveCommands: function() {
        return resolveCommands;
    },
    resolveCyberSkillPath: function() {
        return resolveCyberSkillPath;
    },
    resolveWorkingPath: function() {
        return resolveWorkingPath;
    },
    saveErrorListToStorage: function() {
        return saveErrorListToStorage;
    },
    storageServer: function() {
        return storageServer;
    },
    throwResponse: function() {
        return throwResponse;
    },
    writeFileSync: function() {
        return writeFileSync2;
    }
});
module.exports = __toCommonJS(index_nodejs_exports);
// node_modules/.pnpm/tsup@8.4.0_@microsoft+api-extractor@7.52.2_@types+node@22.13.15__@swc+core@1.11.16_@swc_2cf618e3551c9a9c667a9bb2a289f06e/node_modules/tsup/assets/cjs_shims.js
var getImportMetaUrl = function() {
    return typeof document === "undefined" ? new URL("file:".concat(__filename)).href : document.currentScript && document.currentScript.src || new URL("main.js", document.baseURI).href;
};
var importMetaUrl = /* @__PURE__ */ getImportMetaUrl();
// src/utils/command.ts
var import_boxen = __toESM(require("boxen"), 1);
var import_chalk = __toESM(require("chalk"), 1);
var import_node_child_process = require("child_process");
var import_node_process3 = __toESM(require("process"), 1);
var util = __toESM(require("util"), 1);
// src/constants/path.ts
var import_node_process = __toESM(require("process"), 1);
var import_node_url = require("url");
// src/utils/path.ts
var import_node_module = require("module");
var path = __toESM(require("path"), 1);
function resolveCyberSkillPath() {
    for(var _len = arguments.length, urls = new Array(_len), _key = 0; _key < _len; _key++){
        urls[_key] = arguments[_key];
    }
    var _path;
    return (_path = path).resolve.apply(_path, [
        CYBERSKILL_DIRECTORY
    ].concat(_to_consumable_array(urls)));
}
function resolveWorkingPath() {
    for(var _len = arguments.length, urls = new Array(_len), _key = 0; _key < _len; _key++){
        urls[_key] = arguments[_key];
    }
    var _path;
    return (_path = path).resolve.apply(_path, [
        WORKING_DIRECTORY
    ].concat(_to_consumable_array(urls)));
}
function resolve2() {
    for(var _len = arguments.length, urls = new Array(_len), _key = 0; _key < _len; _key++){
        urls[_key] = arguments[_key];
    }
    var _path;
    return (_path = path).resolve.apply(_path, _to_consumable_array(urls));
}
function dirname2(url) {
    return path.dirname(url);
}
function require2() {
    return (0, import_node_module.createRequire)(CYBERSKILL_DIRECTORY);
}
function join2() {
    for(var _len = arguments.length, urls = new Array(_len), _key = 0; _key < _len; _key++){
        urls[_key] = arguments[_key];
    }
    var _path;
    return (_path = path).join.apply(_path, _to_consumable_array(urls));
}
// src/constants/path.ts
var __filename2 = (0, import_node_url.fileURLToPath)(importMetaUrl);
var __dirname = dirname2(__filename2);
var CYBERSKILL_DIRECTORY = resolve2(__dirname, "../../");
var WORKING_DIRECTORY = import_node_process.default.env.INIT_CWD || import_node_process.default.cwd();
var CYBERSKILL_PACKAGE_NAME = "@cyberskill/shared";
var CYBERSKILL_STORAGE = ".cyberskill-storage";
var NODE_MODULES = "node_modules";
var BUILD_DIRECTORY = "dist";
var PACKAGE_JSON = "package.json";
var PACKAGE_LOCK_JSON = "package-lock.json";
var TSCONFIG_JSON = "tsconfig.json";
var GIT_IGNORE = ".gitignore";
var SIMPLE_GIT_HOOK_JSON = ".simple-git-hooks.json";
var PNPM_LOCK_YAML = "pnpm-lock.yaml";
var GIT_HOOK = ".git/hooks";
var GIT_COMMIT_EDITMSG = ".git/COMMIT_EDITMSG";
var CYBERSKILL_CLI = "cyberskill";
var ESLINT_CLI = "eslint";
var VITEST_CLI = "vitest";
var COMMIT_LINT_CLI = "commitlint";
var LINT_STAGED_CLI = "lint-staged";
var RIMRAF_CLI = "rimraf";
var TSC_CLI = "tsc";
var TSX_CLI = "tsx";
var GIT_CLI = "git";
var PNPM_CLI = "pnpm";
var PNPM_DLX_CLI = "pnpm dlx";
var PNPM_EXEC_CLI = "pnpm exec";
var SIMPLE_GIT_HOOK_CLI = "simple-git-hooks";
var ESLINT_INSPECT_CLI = "@eslint/config-inspector";
var NODE_MODULES_INSPECT_CLI = "node_modules-inspect";
var PATH = {
    CYBERSKILL_DIRECTORY: CYBERSKILL_DIRECTORY,
    WORKING_DIRECTORY: WORKING_DIRECTORY,
    TS_CONFIG: resolveWorkingPath(TSCONFIG_JSON),
    GIT_IGNORE: resolveWorkingPath(GIT_IGNORE),
    GIT_HOOK: resolveWorkingPath(GIT_HOOK),
    GIT_COMMIT_MSG: resolveWorkingPath(GIT_COMMIT_EDITMSG),
    SIMPLE_GIT_HOOKS: resolveWorkingPath(SIMPLE_GIT_HOOK_JSON),
    PACKAGE_JSON: resolveWorkingPath(PACKAGE_JSON),
    PACKAGE_LOCK_JSON: resolveWorkingPath(PACKAGE_LOCK_JSON),
    PNPM_LOCK_YAML: resolveWorkingPath(PNPM_LOCK_YAML),
    NODE_MODULES: resolveWorkingPath(NODE_MODULES),
    CYBERSKILL: {
        LINT_STAGED_CONFIG: resolveCyberSkillPath("./configs/lint-staged/base.js"),
        COMMITLINT_CONFIG: resolveCyberSkillPath("./configs/commitlint/base.js"),
        UNIT_TEST_CONFIG: resolveCyberSkillPath("./configs/vitest/react/unit.js"),
        E2E_TEST_CONFIG: resolveCyberSkillPath("./configs/vitest/react/e2e.js")
    }
};
var COMMAND = {
    SIMPLE_GIT_HOOKS: commandFormatter.raw("".concat(PNPM_EXEC_CLI, " ").concat(SIMPLE_GIT_HOOK_CLI)),
    ESLINT_INSPECT: commandFormatter.raw("".concat(PNPM_EXEC_CLI, " ").concat(ESLINT_INSPECT_CLI)),
    NODE_MODULES_INSPECT: commandFormatter.raw("".concat(PNPM_EXEC_CLI, " ").concat(NODE_MODULES_INSPECT_CLI)),
    RESET: commandFormatter.raw("".concat(PNPM_EXEC_CLI, " ").concat(RIMRAF_CLI, " ").concat(NODE_MODULES, " ").concat(PNPM_LOCK_YAML)),
    ESLINT_CHECK: commandFormatter.raw("".concat(PNPM_EXEC_CLI, " ").concat(ESLINT_CLI, " ").concat(PATH.WORKING_DIRECTORY)),
    ESLINT_FIX: commandFormatter.raw("".concat(PNPM_EXEC_CLI, " ").concat(ESLINT_CLI, " ").concat(PATH.WORKING_DIRECTORY, " --fix")),
    TYPESCRIPT_CHECK: commandFormatter.raw("".concat(PNPM_EXEC_CLI, " ").concat(TSC_CLI, " -p ").concat(PATH.TS_CONFIG, " --noEmit")),
    CYBERSKILL: {
        TEST_UNIT: commandFormatter.raw("".concat(PNPM_EXEC_CLI, " ").concat(VITEST_CLI, " --config ").concat(PATH.CYBERSKILL.UNIT_TEST_CONFIG)),
        TEST_E2E: commandFormatter.raw("".concat(PNPM_EXEC_CLI, " ").concat(VITEST_CLI, " --config ").concat(PATH.CYBERSKILL.E2E_TEST_CONFIG)),
        COMMIT_LINT: commandFormatter.raw("".concat(PNPM_EXEC_CLI, " ").concat(COMMIT_LINT_CLI, " --edit ").concat(PATH.GIT_COMMIT_MSG, " --config ").concat(PATH.CYBERSKILL.COMMITLINT_CONFIG)),
        LINT_STAGED: commandFormatter.raw("".concat(PNPM_EXEC_CLI, " ").concat(LINT_STAGED_CLI, " --config ").concat(PATH.CYBERSKILL.LINT_STAGED_CONFIG))
    },
    CONFIGURE_GIT_HOOK: commandFormatter.raw("".concat(GIT_CLI, " config core.hooksPath ").concat(PATH.GIT_HOOK)),
    BUILD: commandFormatter.raw("".concat(PNPM_CLI, " run build")),
    STAGE_BUILD_DIRECTORY: commandFormatter.raw("".concat(GIT_CLI, " add ").concat(BUILD_DIRECTORY)),
    PNPM_INSTALL_STANDARD: commandFormatter.raw("".concat(PNPM_CLI, " install")),
    PNPM_INSTALL_LEGACY: commandFormatter.raw("".concat(PNPM_CLI, " install --legacy-peer-deps")),
    PNPM_INSTALL_FORCE: commandFormatter.raw("".concat(PNPM_CLI, " install --force"))
};
// src/utils/package.ts
var import_node_fetch = __toESM(require("node-fetch"), 1);
// src/utils/fs.ts
var fs = __toESM(require("fs"), 1);
var existsSync2 = function(filePath) {
    return fs.existsSync(filePath);
};
function readFileSync2(filePath, options) {
    var content = fs.readFileSync(filePath, "utf-8");
    if (options === null || options === void 0 ? void 0 : options.asJson) {
        try {
            var parsed = JSON.parse(content);
            if ((typeof parsed === "undefined" ? "undefined" : _type_of(parsed)) === "object" && parsed !== null) {
                return parsed;
            }
            throw new Error("Parsed JSON is not an object or array");
        } catch (e) {
            throw new Error("Failed to parse JSON from file: ".concat(filePath));
        }
    }
    return content;
}
function writeFileSync2(filePath, data) {
    var options = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    var _options_isJson = options.isJson, isJson = _options_isJson === void 0 ? false : _options_isJson;
    var content = isJson && (typeof data === "undefined" ? "undefined" : _type_of(data)) === "object" ? JSON.stringify(data, null, 4) : String(data);
    fs.writeFileSync(filePath, content, "utf-8");
}
function appendFileSync2(filePath, data) {
    var options = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    var _options_isJson = options.isJson, isJson = _options_isJson === void 0 ? false : _options_isJson;
    var content = isJson && (typeof data === "undefined" ? "undefined" : _type_of(data)) === "object" ? JSON.stringify(data, null, 4) : String(data);
    fs.appendFileSync(filePath, content, "utf-8");
}
// src/utils/storage-server.ts
var import_node_persist = __toESM(require("node-persist"), 1);
var import_node_os = __toESM(require("os"), 1);
var import_node_path = __toESM(require("path"), 1);
var import_node_process2 = __toESM(require("process"), 1);
function getStorageDir() {
    return import_node_process2.default.env.CYBERSKILL_STORAGE_DIR || import_node_path.default.join(import_node_os.default.homedir(), CYBERSKILL_STORAGE);
}
function initNodePersist() {
    return _initNodePersist.apply(this, arguments);
}
function _initNodePersist() {
    _initNodePersist = _async_to_generator(function() {
        return _ts_generator(this, function(_state) {
            switch(_state.label){
                case 0:
                    if (!!import_node_persist.default.defaultInstance) return [
                        3,
                        2
                    ];
                    return [
                        4,
                        import_node_persist.default.init({
                            dir: getStorageDir(),
                            stringify: JSON.stringify,
                            parse: JSON.parse,
                            encoding: "utf8",
                            logging: false,
                            forgiveParseErrors: true
                        })
                    ];
                case 1:
                    _state.sent();
                    _state.label = 2;
                case 2:
                    return [
                        2
                    ];
            }
        });
    });
    return _initNodePersist.apply(this, arguments);
}
var storageServer = {
    get: function get(key) {
        return _async_to_generator(function() {
            var result, error;
            return _ts_generator(this, function(_state) {
                switch(_state.label){
                    case 0:
                        _state.trys.push([
                            0,
                            3,
                            ,
                            4
                        ]);
                        return [
                            4,
                            initNodePersist()
                        ];
                    case 1:
                        _state.sent();
                        return [
                            4,
                            import_node_persist.default.getItem(key)
                        ];
                    case 2:
                        result = _state.sent();
                        return [
                            2,
                            result !== null && result !== void 0 ? result : null
                        ];
                    case 3:
                        error = _state.sent();
                        console.error('❌ [Storage:get] Error getting key "'.concat(key, '":'), error);
                        return [
                            2,
                            null
                        ];
                    case 4:
                        return [
                            2
                        ];
                }
            });
        })();
    },
    set: function set(key, value) {
        return _async_to_generator(function() {
            var error;
            return _ts_generator(this, function(_state) {
                switch(_state.label){
                    case 0:
                        _state.trys.push([
                            0,
                            3,
                            ,
                            4
                        ]);
                        return [
                            4,
                            initNodePersist()
                        ];
                    case 1:
                        _state.sent();
                        return [
                            4,
                            import_node_persist.default.setItem(key, value)
                        ];
                    case 2:
                        _state.sent();
                        return [
                            3,
                            4
                        ];
                    case 3:
                        error = _state.sent();
                        console.error('❌ [Storage:set] Error setting key "'.concat(key, '":'), error);
                        return [
                            3,
                            4
                        ];
                    case 4:
                        return [
                            2
                        ];
                }
            });
        })();
    },
    remove: function remove(key) {
        return _async_to_generator(function() {
            var error;
            return _ts_generator(this, function(_state) {
                switch(_state.label){
                    case 0:
                        _state.trys.push([
                            0,
                            3,
                            ,
                            4
                        ]);
                        return [
                            4,
                            initNodePersist()
                        ];
                    case 1:
                        _state.sent();
                        return [
                            4,
                            import_node_persist.default.removeItem(key)
                        ];
                    case 2:
                        _state.sent();
                        return [
                            3,
                            4
                        ];
                    case 3:
                        error = _state.sent();
                        console.error('❌ [Storage:remove] Error removing key "'.concat(key, '":'), error);
                        return [
                            3,
                            4
                        ];
                    case 4:
                        return [
                            2
                        ];
                }
            });
        })();
    },
    keys: function keys() {
        return _async_to_generator(function() {
            var keys, error;
            return _ts_generator(this, function(_state) {
                switch(_state.label){
                    case 0:
                        _state.trys.push([
                            0,
                            3,
                            ,
                            4
                        ]);
                        return [
                            4,
                            initNodePersist()
                        ];
                    case 1:
                        _state.sent();
                        return [
                            4,
                            import_node_persist.default.keys()
                        ];
                    case 2:
                        keys = _state.sent();
                        if (!Array.isArray(keys)) {
                            console.warn("⚠️ [Storage:keys] Invalid keys response:", keys);
                            return [
                                2,
                                []
                            ];
                        }
                        return [
                            2,
                            keys
                        ];
                    case 3:
                        error = _state.sent();
                        console.error("❌ [Storage:keys] Error getting keys:", error);
                        return [
                            2,
                            []
                        ];
                    case 4:
                        return [
                            2
                        ];
                }
            });
        })();
    },
    getLogLink: function getLogLink(key) {
        return _async_to_generator(function() {
            var storagePath;
            return _ts_generator(this, function(_state) {
                try {
                    storagePath = getStorageDir();
                    return [
                        2,
                        "".concat(storagePath, " (key: ").concat(key, ")")
                    ];
                } catch (error) {
                    console.error("❌ [Storage:getLogLink] Error getting log link:", error);
                    return [
                        2,
                        null
                    ];
                }
                return [
                    2
                ];
            });
        })();
    }
};
// src/utils/package.ts
var CACHE_EXPIRATION_MS = 24 * 60 * 60 * 1e3;
function getPackageJson(packageName) {
    var workingPackageJsonPath = join2(WORKING_DIRECTORY, PACKAGE_JSON);
    if (existsSync2(workingPackageJsonPath)) {
        try {
            var pkg = readFileSync2(workingPackageJsonPath, {
                asJson: true
            });
            if (pkg.name === packageName) {
                return {
                    path: workingPackageJsonPath,
                    file: pkg
                };
            }
        } catch (error) {
            commandLog.warning("Failed to read local package.json: ".concat(error.message));
        }
    }
    var externalPackageJsonPath = join2(WORKING_DIRECTORY, NODE_MODULES, packageName, PACKAGE_JSON);
    if (existsSync2(externalPackageJsonPath)) {
        try {
            var pkg1 = readFileSync2(externalPackageJsonPath, {
                asJson: true
            });
            if (pkg1.name === packageName) {
                return {
                    path: externalPackageJsonPath,
                    file: pkg1
                };
            }
        } catch (error) {
            commandLog.warning("Failed to read node_modules package.json for ".concat(packageName, ": ").concat(error.message));
        }
    }
    return false;
}
function getLatestPackageVersion(packageName) {
    return _getLatestPackageVersion.apply(this, arguments);
}
function _getLatestPackageVersion() {
    _getLatestPackageVersion = _async_to_generator(function(packageName) {
        var forceRefresh, versionCacheKey, metadataCacheKey, cached, metadata, isCacheValid, headers, response, data, latestVersion, error;
        var _arguments = arguments;
        return _ts_generator(this, function(_state) {
            switch(_state.label){
                case 0:
                    forceRefresh = _arguments.length > 1 && _arguments[1] !== void 0 ? _arguments[1] : false;
                    versionCacheKey = "npm_version:".concat(packageName);
                    metadataCacheKey = "npm_metadata:".concat(packageName);
                    return [
                        4,
                        storageServer.get(versionCacheKey)
                    ];
                case 1:
                    cached = _state.sent();
                    return [
                        4,
                        storageServer.get(metadataCacheKey)
                    ];
                case 2:
                    metadata = _state.sent();
                    isCacheValid = cached && Date.now() - cached.timestamp < CACHE_EXPIRATION_MS;
                    if (!forceRefresh && isCacheValid) {
                        return [
                            2,
                            cached.version
                        ];
                    }
                    headers = {};
                    if (metadata === null || metadata === void 0 ? void 0 : metadata.etag) {
                        headers["If-None-Match"] = metadata.etag;
                    }
                    if (metadata === null || metadata === void 0 ? void 0 : metadata.lastModified) {
                        headers["If-Modified-Since"] = metadata.lastModified;
                    }
                    _state.label = 3;
                case 3:
                    _state.trys.push([
                        3,
                        8,
                        ,
                        9
                    ]);
                    return [
                        4,
                        (0, import_node_fetch.default)("https://registry.npmjs.org/".concat(packageName, "/latest"), {
                            headers: headers
                        })
                    ];
                case 4:
                    response = _state.sent();
                    if (response.status === 304 && cached) {
                        return [
                            2,
                            cached.version
                        ];
                    }
                    if (!response.ok) {
                        throw new Error("Failed to fetch latest version: ".concat(response.statusText));
                    }
                    return [
                        4,
                        response.json()
                    ];
                case 5:
                    data = _state.sent();
                    latestVersion = data.version;
                    return [
                        4,
                        storageServer.set(versionCacheKey, {
                            version: latestVersion,
                            timestamp: Date.now()
                        })
                    ];
                case 6:
                    _state.sent();
                    return [
                        4,
                        storageServer.set(metadataCacheKey, {
                            etag: response.headers.get("ETag") || void 0,
                            lastModified: response.headers.get("Last-Modified") || void 0
                        })
                    ];
                case 7:
                    _state.sent();
                    return [
                        2,
                        latestVersion
                    ];
                case 8:
                    error = _state.sent();
                    commandLog.error("Error fetching latest version for ".concat(packageName, ": ").concat(error.message));
                    if (cached) {
                        commandLog.warning("Falling back to cached version for ".concat(packageName, ": ").concat(cached.version));
                        return [
                            2,
                            cached.version
                        ];
                    }
                    throw error;
                case 9:
                    return [
                        2
                    ];
            }
        });
    });
    return _getLatestPackageVersion.apply(this, arguments);
}
function checkPackage(packageName) {
    return _checkPackage.apply(this, arguments);
}
function _checkPackage() {
    _checkPackage = _async_to_generator(function(packageName) {
        var result, packageFound, cyberskillPackageJsonPath, isCurrentProject, _tmp, error;
        return _ts_generator(this, function(_state) {
            switch(_state.label){
                case 0:
                    result = {
                        isInstalled: false,
                        isCurrentProject: false,
                        installedPath: "",
                        installedVersion: "",
                        latestVersion: "",
                        file: {}
                    };
                    _state.label = 1;
                case 1:
                    _state.trys.push([
                        1,
                        5,
                        ,
                        6
                    ]);
                    packageFound = getPackageJson(packageName);
                    if (!packageFound) {
                        return [
                            2,
                            result
                        ];
                    }
                    cyberskillPackageJsonPath = resolveCyberSkillPath(PACKAGE_JSON);
                    isCurrentProject = packageFound.path === cyberskillPackageJsonPath;
                    result.file = packageFound.file;
                    result.isInstalled = true;
                    result.installedPath = packageFound.path;
                    result.installedVersion = packageFound.file.version;
                    result.isCurrentProject = isCurrentProject;
                    if (!isCurrentProject) return [
                        3,
                        2
                    ];
                    _tmp = packageFound.file.version;
                    return [
                        3,
                        4
                    ];
                case 2:
                    return [
                        4,
                        getLatestPackageVersion(packageName, true)
                    ];
                case 3:
                    _tmp = _state.sent();
                    _state.label = 4;
                case 4:
                    result.latestVersion = _tmp;
                    return [
                        2,
                        result
                    ];
                case 5:
                    error = _state.sent();
                    commandLog.error('Error checking package "'.concat(packageName, '": ').concat(error.message));
                    return [
                        2,
                        result
                    ];
                case 6:
                    return [
                        2
                    ];
            }
        });
    });
    return _checkPackage.apply(this, arguments);
}
// src/utils/command.ts
var DEBUG = import_node_process3.default.env.DEBUG === "true";
var execPromise = util.promisify(import_node_child_process.exec);
var _import_chalk_default = import_chalk.default, gray = _import_chalk_default.gray, blue = _import_chalk_default.blue;
var getTimeStamp = function() {
    return gray("[".concat(/* @__PURE__ */ new Date().toLocaleTimeString(), "]"));
};
function chalkKeyword(color) {
    var chalkColor = import_chalk.default[color];
    return typeof chalkColor === "function" ? chalkColor : import_chalk.default.green;
}
function printLog(type, color, icon, message) {
    var chalkColor = chalkKeyword(color);
    console.log("".concat(getTimeStamp(), " ").concat(chalkColor("".concat(icon, " ").concat(type)), " ").concat(message));
}
function printBoxedLog(title, content) {
    var _ref = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, _ref_color = _ref.color, color = _ref_color === void 0 ? "green" : _ref_color, _ref_padding = _ref.padding, padding = _ref_padding === void 0 ? 1 : _ref_padding, _ref_margin = _ref.margin, margin = _ref_margin === void 0 ? 1 : _ref_margin, _ref_borderStyle = _ref.borderStyle, borderStyle = _ref_borderStyle === void 0 ? "round" : _ref_borderStyle, _ref_titleColor = _ref.titleColor, titleColor = _ref_titleColor === void 0 ? "bold" : _ref_titleColor;
    var chalkColor = chalkKeyword(color);
    var chalkTitleColor = chalkKeyword(titleColor);
    if (typeof content === "string") {
        console.log((0, import_boxen.default)(chalkTitleColor(chalkColor("".concat(title, "\n").concat(content))), {
            padding: padding,
            margin: margin,
            borderStyle: borderStyle,
            borderColor: color
        }));
        return;
    }
    if (Array.isArray(content) && content.length) {
        content.forEach(function(param) {
            var file = param.file, position = param.position, rule = param.rule, message = param.message;
            console.log("".concat(getTimeStamp(), " ").concat(chalkColor("File:"), " ").concat(blue("".concat(file).concat(position ? ":".concat(position) : ""))));
            if (rule) console.log("   ".concat(chalkColor("Rule:"), " ").concat(chalkColor(rule)));
            console.log("   ".concat(chalkColor("Message:"), " ").concat(chalkColor(message)));
        });
        console.log((0, import_boxen.default)(chalkTitleColor(chalkColor("".concat(title, ": ").concat(content.length))), {
            padding: padding,
            margin: margin,
            borderStyle: borderStyle,
            borderColor: color
        }));
        console.log(gray("\u2500".repeat(40)));
    }
}
var commandLog = {
    success: function(message) {
        return printLog("SUCCESS", "green", "\u2714", message);
    },
    error: function(message) {
        return printLog("ERROR", "red", "\u2716", message);
    },
    warning: function(message) {
        return printLog("WARNING", "yellow", "\u26A0", message);
    },
    info: function(message) {
        return printLog("INFO", "blue", "\u2139", message);
    },
    printBoxedLog: printBoxedLog
};
var getErrorListKey = function(timestamp) {
    return "error_list:".concat(timestamp);
};
function saveErrorListToStorage(errorList) {
    return _saveErrorListToStorage.apply(this, arguments);
}
function _saveErrorListToStorage() {
    _saveErrorListToStorage = _async_to_generator(function(errorList) {
        var timestamp, key, error;
        return _ts_generator(this, function(_state) {
            switch(_state.label){
                case 0:
                    if (errorList.length === 0) {
                        return [
                            2
                        ];
                    }
                    timestamp = Date.now();
                    key = getErrorListKey(timestamp);
                    _state.label = 1;
                case 1:
                    _state.trys.push([
                        1,
                        3,
                        ,
                        4
                    ]);
                    return [
                        4,
                        storageServer.set(key, {
                            errors: errorList,
                            timestamp: timestamp
                        })
                    ];
                case 2:
                    _state.sent();
                    setTimeout(/*#__PURE__*/ _async_to_generator(function() {
                        var logPath;
                        return _ts_generator(this, function(_state) {
                            switch(_state.label){
                                case 0:
                                    return [
                                        4,
                                        storageServer.getLogLink(key)
                                    ];
                                case 1:
                                    logPath = _state.sent();
                                    if (logPath) {
                                        commandLog.info("\uD83D\uDCC2 Open the error list manually: ".concat(logPath));
                                    }
                                    return [
                                        2
                                    ];
                            }
                        });
                    }), 10);
                    return [
                        3,
                        4
                    ];
                case 3:
                    error = _state.sent();
                    commandLog.error("Failed to save errors: ".concat(error.message));
                    return [
                        3,
                        4
                    ];
                case 4:
                    return [
                        2
                    ];
            }
        });
    });
    return _saveErrorListToStorage.apply(this, arguments);
}
function getStoredErrorLists() {
    return _getStoredErrorLists.apply(this, arguments);
}
function _getStoredErrorLists() {
    _getStoredErrorLists = _async_to_generator(function() {
        var keys, errorKeys, allErrors, error;
        return _ts_generator(this, function(_state) {
            switch(_state.label){
                case 0:
                    _state.trys.push([
                        0,
                        3,
                        ,
                        4
                    ]);
                    return [
                        4,
                        storageServer.keys()
                    ];
                case 1:
                    keys = _state.sent();
                    errorKeys = Array.isArray(keys) ? keys.filter(function(key) {
                        var _key_startsWith;
                        return key === null || key === void 0 ? void 0 : (_key_startsWith = key.startsWith) === null || _key_startsWith === void 0 ? void 0 : _key_startsWith.call(key, "error_list:");
                    }) : [];
                    return [
                        4,
                        Promise.all(errorKeys.map(/*#__PURE__*/ function() {
                            var _ref = _async_to_generator(function(key) {
                                var entry;
                                return _ts_generator(this, function(_state) {
                                    switch(_state.label){
                                        case 0:
                                            return [
                                                4,
                                                storageServer.get(key)
                                            ];
                                        case 1:
                                            entry = _state.sent();
                                            return [
                                                2,
                                                (entry === null || entry === void 0 ? void 0 : entry.errors) || []
                                            ];
                                    }
                                });
                            });
                            return function(key) {
                                return _ref.apply(this, arguments);
                            };
                        }()))
                    ];
                case 2:
                    allErrors = _state.sent();
                    return [
                        2,
                        allErrors.flat()
                    ];
                case 3:
                    error = _state.sent();
                    commandLog.error("Failed to retrieve stored errors: ".concat(error.message));
                    return [
                        2,
                        []
                    ];
                case 4:
                    return [
                        2
                    ];
            }
        });
    });
    return _getStoredErrorLists.apply(this, arguments);
}
function clearAllErrorLists() {
    return _clearAllErrorLists.apply(this, arguments);
}
function _clearAllErrorLists() {
    _clearAllErrorLists = _async_to_generator(function() {
        var keys, errorKeys, error;
        return _ts_generator(this, function(_state) {
            switch(_state.label){
                case 0:
                    _state.trys.push([
                        0,
                        3,
                        ,
                        4
                    ]);
                    return [
                        4,
                        storageServer.keys()
                    ];
                case 1:
                    keys = _state.sent();
                    errorKeys = Array.isArray(keys) ? keys.filter(function(key) {
                        var _key_startsWith;
                        return key === null || key === void 0 ? void 0 : (_key_startsWith = key.startsWith) === null || _key_startsWith === void 0 ? void 0 : _key_startsWith.call(key, "error_list:");
                    }) : [];
                    return [
                        4,
                        Promise.all(errorKeys.map(function(key) {
                            return storageServer.remove(key);
                        }))
                    ];
                case 2:
                    _state.sent();
                    return [
                        3,
                        4
                    ];
                case 3:
                    error = _state.sent();
                    commandLog.error("Failed to clear error lists: ".concat(error.message));
                    return [
                        3,
                        4
                    ];
                case 4:
                    return [
                        2
                    ];
            }
        });
    });
    return _clearAllErrorLists.apply(this, arguments);
}
function parseTextErrors(output) {
    var errorList = [];
    var unmatchedLines = [];
    var lastFilePath = "";
    var eslintErrorDetailsRegex = /^\s*(\d+):(\d+)\s+(error|warning)\s+(.+?)\s+(\S+)$/;
    var tsRegex = /^(.+?)\((\d+),(\d+)\):\s+(error|warning)\s+TS\d+:\s+(\S.+)$/;
    var commitlintRegex = /^✖\s+(.*?)\s+\[(.*?)\]$/;
    output.split("\n").forEach(function(line) {
        if (line.startsWith("/")) {
            lastFilePath = line.trim();
        } else {
            var eslintMatch = eslintErrorDetailsRegex.exec(line) || [];
            var tsMatch = tsRegex.exec(line) || [];
            var commitlintMatch = commitlintRegex.exec(line) || [];
            if (eslintMatch.length && lastFilePath) {
                errorList.push({
                    file: lastFilePath,
                    position: "".concat(eslintMatch[1], ":").concat(eslintMatch[2]),
                    type: eslintMatch[3] === "error" /* Error */  ? "error" /* Error */  : "warning" /* Warning */ ,
                    message: eslintMatch[4].trim(),
                    rule: eslintMatch[5].trim()
                });
            } else if (tsMatch.length) {
                errorList.push({
                    file: tsMatch[1],
                    position: "".concat(tsMatch[2], ":").concat(tsMatch[3]),
                    type: tsMatch[4] === "error" /* Error */  ? "error" /* Error */  : "warning" /* Warning */ ,
                    message: tsMatch[5].trim()
                });
            } else if (commitlintMatch.length) {
                errorList.push({
                    file: "commitlint",
                    type: "error" /* Error */ ,
                    message: commitlintMatch[1].trim(),
                    rule: commitlintMatch[2].trim()
                });
            } else {
                unmatchedLines.push(line.trim());
            }
        }
    });
    if (errorList.length) {
        saveErrorListToStorage(errorList);
    }
    if (unmatchedLines.length && DEBUG) {
        commandLog.warning("Unmatched lines:");
        unmatchedLines.forEach(function(line) {
            return console.log("  ".concat(line));
        });
    }
}
function parseCommandOutput(output) {
    try {
        var results = JSON.parse(output);
        var errorList = [];
        results.forEach(function(param) {
            var filePath = param.filePath, messages = param.messages;
            messages.forEach(function(param) {
                var severity = param.severity, line = param.line, column = param.column, ruleId = param.ruleId, message = param.message;
                errorList.push({
                    type: severity === 2 ? "error" /* Error */  : "warning" /* Warning */ ,
                    file: filePath,
                    position: "".concat(line, ":").concat(column),
                    rule: ruleId,
                    message: message
                });
            });
        });
        if (errorList.length) {
            saveErrorListToStorage(errorList);
        }
    } catch (e) {
        parseTextErrors(output);
    }
}
function executeCommand(command) {
    return _executeCommand.apply(this, arguments);
}
function _executeCommand() {
    _executeCommand = _async_to_generator(function(command) {
        var parser, controller, _ref, stdout, stderr, error, stdout1, stderr1, message;
        var _arguments = arguments;
        return _ts_generator(this, function(_state) {
            switch(_state.label){
                case 0:
                    parser = _arguments.length > 1 && _arguments[1] !== void 0 ? _arguments[1] : parseCommandOutput;
                    controller = new AbortController();
                    import_node_process3.default.on("SIGINT", function() {
                        commandLog.warning("Process interrupted. Terminating...");
                        controller.abort();
                        import_node_process3.default.exit();
                    });
                    _state.label = 1;
                case 1:
                    _state.trys.push([
                        1,
                        3,
                        ,
                        4
                    ]);
                    return [
                        4,
                        execPromise(command, {
                            maxBuffer: 1024 * 1024 * 100,
                            signal: controller.signal
                        })
                    ];
                case 2:
                    _ref = _state.sent(), stdout = _ref.stdout, stderr = _ref.stderr;
                    [
                        stdout,
                        stderr
                    ].forEach(function(output) {
                        return output && parser(output);
                    });
                    return [
                        3,
                        4
                    ];
                case 3:
                    error = _state.sent();
                    stdout1 = error.stdout, stderr1 = error.stderr, message = error.message;
                    [
                        stdout1,
                        stderr1
                    ].forEach(function(output) {
                        return output && parser(output);
                    });
                    if (!stderr1 && !stdout1) {
                        commandLog.error("Command failed: ".concat(message));
                    }
                    return [
                        3,
                        4
                    ];
                case 4:
                    return [
                        2
                    ];
            }
        });
    });
    return _executeCommand.apply(this, arguments);
}
var commandFormatter = {
    raw: function(cmd) {
        return {
            raw: true,
            cmd: cmd
        };
    },
    isRaw: function isRaw(cmd) {
        return (typeof cmd === "undefined" ? "undefined" : _type_of(cmd)) === "object" && cmd !== null && cmd.raw === true;
    },
    format: function format(command, context) {
        if (typeof command === "function") {
            return commandFormatter.formatCLI(command(context), context);
        }
        if (commandFormatter.isRaw(command)) {
            return command.cmd;
        }
        return commandFormatter.formatCLI(command, context);
    },
    formatCLI: function formatCLI(command, context) {
        if (context === null || context === void 0 ? void 0 : context.isRemote) {
            return "".concat(PNPM_DLX_CLI, " ").concat(CYBERSKILL_PACKAGE_NAME, " ").concat(command);
        }
        if (context === null || context === void 0 ? void 0 : context.isCurrentProject) {
            return "".concat(PNPM_EXEC_CLI, " ").concat(TSX_CLI, " src/cli.ts ").concat(command);
        }
        return "".concat(PNPM_EXEC_CLI, " ").concat(CYBERSKILL_CLI, " ").concat(command);
    }
};
function resolveCommands(input) {
    return _resolveCommands.apply(this, arguments);
}
function _resolveCommands() {
    _resolveCommands = _async_to_generator(function(input) {
        var context, _context_isRemote, isRemote, isCurrentProject, _tmp, ctx, commands;
        var _arguments = arguments;
        return _ts_generator(this, function(_state) {
            switch(_state.label){
                case 0:
                    context = _arguments.length > 1 && _arguments[1] !== void 0 ? _arguments[1] : {};
                    isRemote = (_context_isRemote = context === null || context === void 0 ? void 0 : context.isRemote) !== null && _context_isRemote !== void 0 ? _context_isRemote : false;
                    if (!isRemote) return [
                        3,
                        1
                    ];
                    _tmp = false;
                    return [
                        3,
                        3
                    ];
                case 1:
                    return [
                        4,
                        checkPackage(CYBERSKILL_PACKAGE_NAME)
                    ];
                case 2:
                    _tmp = _state.sent().isCurrentProject;
                    _state.label = 3;
                case 3:
                    isCurrentProject = _tmp;
                    ctx = {
                        isRemote: isRemote,
                        isCurrentProject: isCurrentProject
                    };
                    commands = typeof input === "function" ? input(ctx) : input;
                    return [
                        2,
                        Object.fromEntries(Object.entries(commands).map(function(param) {
                            var _param = _sliced_to_array(param, 2), key = _param[0], cmd = _param[1];
                            return [
                                key,
                                commandFormatter.format(cmd, ctx)
                            ];
                        }))
                    ];
            }
        });
    });
    return _resolveCommands.apply(this, arguments);
}
// src/utils/log.ts
var import_graphql = require("graphql");
// src/constants/response-status.ts
var RESPONSE_STATUS = {
    GRAPHQL_PARSE_FAILED: {
        CODE: "GRAPHQL_PARSE_FAILED",
        MESSAGE: "The GraphQL operation string contains a syntax error."
    },
    GRAPHQL_VALIDATION_FAILED: {
        CODE: "GRAPHQL_VALIDATION_FAILED",
        MESSAGE: "The GraphQL operation is not valid against the server's schema."
    },
    BAD_USER_INPUT: {
        CODE: "BAD_USER_INPUT",
        MESSAGE: "The GraphQL operation includes an invalid value for a field argument."
    },
    PERSISTED_QUERY_NOT_FOUND: {
        CODE: "PERSISTED_QUERY_NOT_FOUND",
        MESSAGE: "A client sent the hash of a query string to execute via automatic persisted queries, but the query was not in the APQ cache."
    },
    PERSISTED_QUERY_NOT_SUPPORTED: {
        CODE: "PERSISTED_QUERY_NOT_SUPPORTED",
        MESSAGE: "A client sent the hash of a query string to execute via automatic persisted queries, but the server has disabled APQ."
    },
    OPERATION_RESOLUTION_FAILURE: {
        CODE: "OPERATION_RESOLUTION_FAILURE",
        MESSAGE: "The request was parsed successfully and is valid against the server's schema, but the server couldn't resolve which operation to run. This occurs when a request containing multiple named operations doesn't specify which operation to run (i.e.,operationName), or if the named operation isn't included in the request."
    },
    CONTINUE: {
        CODE: 100,
        MESSAGE: "Continue"
    },
    SWITCHING_PROTOCOLS: {
        CODE: 101,
        MESSAGE: "Switching Protocols"
    },
    PROCESSING: {
        CODE: 102,
        MESSAGE: "Processing"
    },
    OK: {
        CODE: 200,
        MESSAGE: "OK"
    },
    CREATED: {
        CODE: 201,
        MESSAGE: "Created"
    },
    ACCEPTED: {
        CODE: 202,
        MESSAGE: "Accepted"
    },
    NON_AUTHORITATIVE_INFORMATION: {
        CODE: 203,
        MESSAGE: "Non Authoritative Information"
    },
    NO_CONTENT: {
        CODE: 204,
        MESSAGE: "No Content"
    },
    RESET_CONTENT: {
        CODE: 205,
        MESSAGE: "Reset Content"
    },
    PARTIAL_CONTENT: {
        CODE: 206,
        MESSAGE: "Partial Content"
    },
    MULTI_STATUS: {
        CODE: 207,
        MESSAGE: "Multi-Status"
    },
    MULTIPLE_CHOICES: {
        CODE: 300,
        MESSAGE: "Multiple Choices"
    },
    MOVED_PERMANENTLY: {
        CODE: 301,
        MESSAGE: "Moved Permanently"
    },
    MOVED_TEMPORARILY: {
        CODE: 302,
        MESSAGE: "Moved Temporarily"
    },
    SEE_OTHER: {
        CODE: 303,
        MESSAGE: "See Other"
    },
    NOT_MODIFIED: {
        CODE: 304,
        MESSAGE: "Not Modified"
    },
    USE_PROXY: {
        CODE: 305,
        MESSAGE: "Use Proxy"
    },
    TEMPORARY_REDIRECT: {
        CODE: 307,
        MESSAGE: "Temporary Redirect"
    },
    PERMANENT_REDIRECT: {
        CODE: 308,
        MESSAGE: "Permanent Redirect"
    },
    BAD_REQUEST: {
        CODE: 400,
        MESSAGE: "Bad Request"
    },
    UNAUTHORIZED: {
        CODE: 401,
        MESSAGE: "Unauthorized"
    },
    PAYMENT_REQUIRED: {
        CODE: 402,
        MESSAGE: "Payment Required"
    },
    FORBIDDEN: {
        CODE: 403,
        MESSAGE: "Forbidden"
    },
    NOT_FOUND: {
        CODE: 404,
        MESSAGE: "Not Found"
    },
    METHOD_NOT_ALLOWED: {
        CODE: 405,
        MESSAGE: "Method Not Allowed"
    },
    NOT_ACCEPTABLE: {
        CODE: 406,
        MESSAGE: "Not Acceptable"
    },
    PROXY_AUTHENTICATION_REQUIRED: {
        CODE: 407,
        MESSAGE: "Proxy Authentication Required"
    },
    REQUEST_TIMEOUT: {
        CODE: 408,
        MESSAGE: "Request Timeout"
    },
    CONFLICT: {
        CODE: 409,
        MESSAGE: "Conflict"
    },
    GONE: {
        CODE: 410,
        MESSAGE: "Gone"
    },
    LENGTH_REQUIRED: {
        CODE: 411,
        MESSAGE: "Length Required"
    },
    PRECONDITION_FAILED: {
        CODE: 412,
        MESSAGE: "Precondition Failed"
    },
    REQUEST_TOO_LONG: {
        CODE: 413,
        MESSAGE: "Request Entity Too Large"
    },
    REQUEST_URI_TOO_LONG: {
        CODE: 414,
        MESSAGE: "Request-URI Too Long"
    },
    UNSUPPORTED_MEDIA_TYPE: {
        CODE: 415,
        MESSAGE: "Unsupported Media Type"
    },
    REQUESTED_RANGE_NOT_SATISFIABLE: {
        CODE: 416,
        MESSAGE: "Requested Range Not Satisfiable"
    },
    EXPECTATION_FAILED: {
        CODE: 417,
        MESSAGE: "Expectation Failed"
    },
    IM_A_TEAPOT: {
        CODE: 418,
        MESSAGE: "I'm a teapot"
    },
    INSUFFICIENT_SPACE_ON_RESOURCE: {
        CODE: 419,
        MESSAGE: "Insufficient Space on Resource"
    },
    METHOD_FAILURE: {
        CODE: 420,
        MESSAGE: "Method Failure"
    },
    MISDIRECTED_REQUEST: {
        CODE: 421,
        MESSAGE: "Misdirected Request"
    },
    UNPROCESSABLE_ENTITY: {
        CODE: 422,
        MESSAGE: "Unprocessable Entity"
    },
    LOCKED: {
        CODE: 423,
        MESSAGE: "Locked"
    },
    FAILED_DEPENDENCY: {
        CODE: 424,
        MESSAGE: "Failed Dependency"
    },
    PRECONDITION_REQUIRED: {
        CODE: 428,
        MESSAGE: "Precondition Required"
    },
    TOO_MANY_REQUESTS: {
        CODE: 429,
        MESSAGE: "Too Many Requests"
    },
    REQUEST_HEADER_FIELDS_TOO_LARGE: {
        CODE: 431,
        MESSAGE: "Request Header Fields Too Large"
    },
    UNAVAILABLE_FOR_LEGAL_REASONS: {
        CODE: 451,
        MESSAGE: "Unavailable For Legal Reasons"
    },
    INTERNAL_SERVER_ERROR: {
        CODE: 500,
        MESSAGE: "Internal Server Error"
    },
    NOT_IMPLEMENTED: {
        CODE: 501,
        MESSAGE: "Not Implemented"
    },
    BAD_GATEWAY: {
        CODE: 502,
        MESSAGE: "Bad Gateway"
    },
    SERVICE_UNAVAILABLE: {
        CODE: 503,
        MESSAGE: "Service Unavailable"
    },
    GATEWAY_TIMEOUT: {
        CODE: 504,
        MESSAGE: "Gateway Timeout"
    },
    HTTP_VERSION_NOT_SUPPORTED: {
        CODE: 505,
        MESSAGE: "HTTP Version Not Supported"
    },
    INSUFFICIENT_STORAGE: {
        CODE: 507,
        MESSAGE: "Insufficient Storage"
    },
    NETWORK_AUTHENTICATION_REQUIRED: {
        CODE: 511,
        MESSAGE: "Network Authentication Required"
    }
};
// src/utils/log.ts
function throwResponse(param) {
    var message = param.message, _param_status = param.status, status = _param_status === void 0 ? RESPONSE_STATUS.INTERNAL_SERVER_ERROR : _param_status, _param_type = param.type, type = _param_type === void 0 ? "graphql" : _param_type;
    var _ref;
    var responseMessage = (_ref = message !== null && message !== void 0 ? message : status.MESSAGE) !== null && _ref !== void 0 ? _ref : "Internal server error";
    if (type === "graphql") {
        throw new import_graphql.GraphQLError(responseMessage, {
            extensions: {
                code: status.CODE
            }
        });
    } else {
        throw new Error(responseMessage);
    }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
    appendFileSync: appendFileSync,
    checkPackage: checkPackage,
    clearAllErrorLists: clearAllErrorLists,
    commandFormatter: commandFormatter,
    commandLog: commandLog,
    dirname: dirname,
    executeCommand: executeCommand,
    existsSync: existsSync,
    getLatestPackageVersion: getLatestPackageVersion,
    getPackageJson: getPackageJson,
    getStorageDir: getStorageDir,
    getStoredErrorLists: getStoredErrorLists,
    initNodePersist: initNodePersist,
    join: join,
    readFileSync: readFileSync,
    require: require,
    resolve: resolve,
    resolveCommands: resolveCommands,
    resolveCyberSkillPath: resolveCyberSkillPath,
    resolveWorkingPath: resolveWorkingPath,
    saveErrorListToStorage: saveErrorListToStorage,
    storageServer: storageServer,
    throwResponse: throwResponse,
    writeFileSync: writeFileSync
});
