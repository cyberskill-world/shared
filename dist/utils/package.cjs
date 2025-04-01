"use strict";
function _array_like_to_array(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function _array_without_holes(arr) {
    if (Array.isArray(arr)) return _array_like_to_array(arr);
}
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
        var info = gen[key](arg);
        var value = info.value;
    } catch (error) {
        reject(error);
        return;
    }
    if (info.done) {
        resolve(value);
    } else {
        Promise.resolve(value).then(_next, _throw);
    }
}
function _async_to_generator(fn) {
    return function() {
        var self = this, args = arguments;
        return new Promise(function(resolve, reject) {
            var gen = fn.apply(self, args);
            function _next(value) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
            }
            function _throw(err) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
            }
            _next(undefined);
        });
    };
}
function _iterable_to_array(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _non_iterable_spread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
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
// src/utils/package.ts
var package_exports = {};
__export(package_exports, {
    checkPackage: function() {
        return checkPackage;
    },
    getLatestPackageVersion: function() {
        return getLatestPackageVersion;
    },
    getPackageJson: function() {
        return getPackageJson;
    }
});
module.exports = __toCommonJS(package_exports);
// node_modules/.pnpm/tsup@8.4.0_@microsoft+api-extractor@7.52.2_@types+node@22.13.17__@swc+core@1.11.16_@swc_95e38cac10676cdf66b55e0093c30cae/node_modules/tsup/assets/cjs_shims.js
var getImportMetaUrl = function() {
    return typeof document === "undefined" ? new URL("file:".concat(__filename)).href : document.currentScript && document.currentScript.src || new URL("main.js", document.baseURI).href;
};
var importMetaUrl = /* @__PURE__ */ getImportMetaUrl();
// src/utils/package.ts
var import_node_fetch = __toESM(require("node-fetch"), 1);
// src/constants/path.ts
var import_node_process3 = __toESM(require("process"), 1);
var import_node_url = require("url");
// src/utils/command.ts
var import_boxen = __toESM(require("boxen"), 1);
var import_chalk = __toESM(require("chalk"), 1);
var import_node_child_process = require("child_process");
var import_node_process2 = __toESM(require("process"), 1);
var util = __toESM(require("util"), 1);
// src/utils/storage-server.ts
var import_node_persist = __toESM(require("node-persist"), 1);
var import_node_os = __toESM(require("os"), 1);
var import_node_path = __toESM(require("path"), 1);
var import_node_process = __toESM(require("process"), 1);
function getStorageDir() {
    return import_node_process.default.env.CYBERSKILL_STORAGE_DIR || import_node_path.default.join(import_node_os.default.homedir(), CYBERSKILL_STORAGE);
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
// src/utils/command.ts
var DEBUG = import_node_process2.default.env.DEBUG === "true";
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
// src/utils/path.ts
var import_node_module = require("module");
var path2 = __toESM(require("path"), 1);
function resolveCyberSkillPath() {
    for(var _len = arguments.length, urls = new Array(_len), _key = 0; _key < _len; _key++){
        urls[_key] = arguments[_key];
    }
    var _path2;
    return (_path2 = path2).resolve.apply(_path2, [
        CYBERSKILL_DIRECTORY
    ].concat(_to_consumable_array(urls)));
}
function resolveWorkingPath() {
    for(var _len = arguments.length, urls = new Array(_len), _key = 0; _key < _len; _key++){
        urls[_key] = arguments[_key];
    }
    var _path2;
    return (_path2 = path2).resolve.apply(_path2, [
        WORKING_DIRECTORY
    ].concat(_to_consumable_array(urls)));
}
function resolve2() {
    for(var _len = arguments.length, urls = new Array(_len), _key = 0; _key < _len; _key++){
        urls[_key] = arguments[_key];
    }
    var _path2;
    return (_path2 = path2).resolve.apply(_path2, _to_consumable_array(urls));
}
function dirname2(url) {
    return path2.dirname(url);
}
function join2() {
    for(var _len = arguments.length, urls = new Array(_len), _key = 0; _key < _len; _key++){
        urls[_key] = arguments[_key];
    }
    var _path2;
    return (_path2 = path2).join.apply(_path2, _to_consumable_array(urls));
}
// src/constants/path.ts
var __filename2 = (0, import_node_url.fileURLToPath)(importMetaUrl);
var __dirname = dirname2(__filename2);
var CYBERSKILL_DIRECTORY = resolve2(__dirname, "../../");
var WORKING_DIRECTORY = import_node_process3.default.env.INIT_CWD || import_node_process3.default.cwd();
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
    checkPackage: checkPackage,
    getLatestPackageVersion: getLatestPackageVersion,
    getPackageJson: getPackageJson
});
