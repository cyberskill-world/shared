"use strict";
function _array_like_to_array(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function _array_without_holes(arr) {
    if (Array.isArray(arr)) return _array_like_to_array(arr);
}
function _define_property(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
function _iterable_to_array(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _non_iterable_spread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _object_spread(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === "function") {
            ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
                return Object.getOwnPropertyDescriptor(source, sym).enumerable;
            }));
        }
        ownKeys.forEach(function(key) {
            _define_property(target, key, source[key]);
        });
    }
    return target;
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
// src/constants/index.ts
var constants_exports = {};
__export(constants_exports, {
    BUILD_DIRECTORY: function() {
        return BUILD_DIRECTORY;
    },
    COMMAND: function() {
        return COMMAND;
    },
    COMMIT_LINT_CLI: function() {
        return COMMIT_LINT_CLI;
    },
    CYBERSKILL_CLI: function() {
        return CYBERSKILL_CLI;
    },
    CYBERSKILL_DIRECTORY: function() {
        return CYBERSKILL_DIRECTORY;
    },
    CYBERSKILL_PACKAGE_NAME: function() {
        return CYBERSKILL_PACKAGE_NAME;
    },
    CYBERSKILL_STORAGE: function() {
        return CYBERSKILL_STORAGE;
    },
    ESLINT_CLI: function() {
        return ESLINT_CLI;
    },
    ESLINT_INSPECT_CLI: function() {
        return ESLINT_INSPECT_CLI;
    },
    GIT_CLI: function() {
        return GIT_CLI;
    },
    GIT_COMMIT_EDITMSG: function() {
        return GIT_COMMIT_EDITMSG;
    },
    GIT_HOOK: function() {
        return GIT_HOOK;
    },
    GIT_IGNORE: function() {
        return GIT_IGNORE;
    },
    HOOK: function() {
        return HOOK;
    },
    LINT_STAGED_CLI: function() {
        return LINT_STAGED_CLI;
    },
    NODE_MODULES: function() {
        return NODE_MODULES;
    },
    NODE_MODULES_INSPECT_CLI: function() {
        return NODE_MODULES_INSPECT_CLI;
    },
    PACKAGE_JSON: function() {
        return PACKAGE_JSON;
    },
    PACKAGE_LOCK_JSON: function() {
        return PACKAGE_LOCK_JSON;
    },
    PATH: function() {
        return PATH;
    },
    PNPM_CLI: function() {
        return PNPM_CLI;
    },
    PNPM_DLX_CLI: function() {
        return PNPM_DLX_CLI;
    },
    PNPM_EXEC_CLI: function() {
        return PNPM_EXEC_CLI;
    },
    PNPM_LOCK_YAML: function() {
        return PNPM_LOCK_YAML;
    },
    RESPONSE_STATUS: function() {
        return RESPONSE_STATUS;
    },
    RIMRAF_CLI: function() {
        return RIMRAF_CLI;
    },
    SIMPLE_GIT_HOOK_CLI: function() {
        return SIMPLE_GIT_HOOK_CLI;
    },
    SIMPLE_GIT_HOOK_JSON: function() {
        return SIMPLE_GIT_HOOK_JSON;
    },
    TSCONFIG_JSON: function() {
        return TSCONFIG_JSON;
    },
    TSC_CLI: function() {
        return TSC_CLI;
    },
    TSX_CLI: function() {
        return TSX_CLI;
    },
    VITEST_CLI: function() {
        return VITEST_CLI;
    },
    WORKING_DIRECTORY: function() {
        return WORKING_DIRECTORY;
    }
});
module.exports = __toCommonJS(constants_exports);
// node_modules/.pnpm/tsup@8.4.0_@microsoft+api-extractor@7.52.2_@types+node@22.13.15__@swc+core@1.11.16_@swc_2cf618e3551c9a9c667a9bb2a289f06e/node_modules/tsup/assets/cjs_shims.js
var getImportMetaUrl = function() {
    return typeof document === "undefined" ? new URL("file:".concat(__filename)).href : document.currentScript && document.currentScript.src || new URL("main.js", document.baseURI).href;
};
var importMetaUrl = /* @__PURE__ */ getImportMetaUrl();
// src/constants/path.ts
var import_node_process3 = __toESM(require("process"), 1);
var import_node_url = require("url");
// src/utils/command.ts
var import_boxen = __toESM(require("boxen"), 1);
var import_chalk = __toESM(require("chalk"), 1);
var import_node_child_process = require("child_process");
var import_node_process2 = __toESM(require("process"), 1);
var util = __toESM(require("util"), 1);
// src/utils/package.ts
var import_node_fetch = __toESM(require("node-fetch"), 1);
// src/utils/fs.ts
var fs = __toESM(require("fs"), 1);
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
// src/utils/storage-server.ts
var import_node_persist = __toESM(require("node-persist"), 1);
var import_node_os = __toESM(require("os"), 1);
var import_node_path = __toESM(require("path"), 1);
var import_node_process = __toESM(require("process"), 1);
// src/utils/package.ts
var CACHE_EXPIRATION_MS = 24 * 60 * 60 * 1e3;
// src/utils/command.ts
var DEBUG = import_node_process2.default.env.DEBUG === "true";
var execPromise = util.promisify(import_node_child_process.exec);
var _import_chalk_default = import_chalk.default, gray = _import_chalk_default.gray, blue = _import_chalk_default.blue;
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
function HOOK(param) {
    var isCurrentProject = param.isCurrentProject;
    return _object_spread({
        "postinstall": "setup",
        "pre-commit": LINT_STAGED_CLI,
        "commit-msg": COMMIT_LINT_CLI
    }, isCurrentProject && {
        "pre-push": commandFormatter.raw("".concat(GIT_CLI, " pull"))
    });
}
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
    BUILD_DIRECTORY: BUILD_DIRECTORY,
    COMMAND: COMMAND,
    COMMIT_LINT_CLI: COMMIT_LINT_CLI,
    CYBERSKILL_CLI: CYBERSKILL_CLI,
    CYBERSKILL_DIRECTORY: CYBERSKILL_DIRECTORY,
    CYBERSKILL_PACKAGE_NAME: CYBERSKILL_PACKAGE_NAME,
    CYBERSKILL_STORAGE: CYBERSKILL_STORAGE,
    ESLINT_CLI: ESLINT_CLI,
    ESLINT_INSPECT_CLI: ESLINT_INSPECT_CLI,
    GIT_CLI: GIT_CLI,
    GIT_COMMIT_EDITMSG: GIT_COMMIT_EDITMSG,
    GIT_HOOK: GIT_HOOK,
    GIT_IGNORE: GIT_IGNORE,
    HOOK: HOOK,
    LINT_STAGED_CLI: LINT_STAGED_CLI,
    NODE_MODULES: NODE_MODULES,
    NODE_MODULES_INSPECT_CLI: NODE_MODULES_INSPECT_CLI,
    PACKAGE_JSON: PACKAGE_JSON,
    PACKAGE_LOCK_JSON: PACKAGE_LOCK_JSON,
    PATH: PATH,
    PNPM_CLI: PNPM_CLI,
    PNPM_DLX_CLI: PNPM_DLX_CLI,
    PNPM_EXEC_CLI: PNPM_EXEC_CLI,
    PNPM_LOCK_YAML: PNPM_LOCK_YAML,
    RESPONSE_STATUS: RESPONSE_STATUS,
    RIMRAF_CLI: RIMRAF_CLI,
    SIMPLE_GIT_HOOK_CLI: SIMPLE_GIT_HOOK_CLI,
    SIMPLE_GIT_HOOK_JSON: SIMPLE_GIT_HOOK_JSON,
    TSCONFIG_JSON: TSCONFIG_JSON,
    TSC_CLI: TSC_CLI,
    TSX_CLI: TSX_CLI,
    VITEST_CLI: VITEST_CLI,
    WORKING_DIRECTORY: WORKING_DIRECTORY
});
