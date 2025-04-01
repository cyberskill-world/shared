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
function _assert_this_initialized(self) {
    if (self === void 0) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return self;
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
function _call_super(_this, derived, args) {
    derived = _get_prototype_of(derived);
    return _possible_constructor_return(_this, _is_native_reflect_construct() ? Reflect.construct(derived, args || [], _get_prototype_of(_this).constructor) : derived.apply(_this, args));
}
function _class_call_check(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}
function _defineProperties(target, props) {
    for(var i = 0; i < props.length; i++){
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}
function _create_class(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
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
function _get_prototype_of(o) {
    _get_prototype_of = Object.setPrototypeOf ? Object.getPrototypeOf : function getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _get_prototype_of(o);
}
function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function");
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
            value: subClass,
            writable: true,
            configurable: true
        }
    });
    if (superClass) _set_prototype_of(subClass, superClass);
}
function _instanceof(left, right) {
    if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {
        return !!right[Symbol.hasInstance](left);
    } else {
        return left instanceof right;
    }
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
function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        if (enumerableOnly) {
            symbols = symbols.filter(function(sym) {
                return Object.getOwnPropertyDescriptor(object, sym).enumerable;
            });
        }
        keys.push.apply(keys, symbols);
    }
    return keys;
}
function _object_spread_props(target, source) {
    source = source != null ? source : {};
    if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
        ownKeys(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
    }
    return target;
}
function _object_without_properties(source, excluded) {
    if (source == null) return {};
    var target = _object_without_properties_loose(source, excluded);
    var key, i;
    if (Object.getOwnPropertySymbols) {
        var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
        for(i = 0; i < sourceSymbolKeys.length; i++){
            key = sourceSymbolKeys[i];
            if (excluded.indexOf(key) >= 0) continue;
            if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
            target[key] = source[key];
        }
    }
    return target;
}
function _object_without_properties_loose(source, excluded) {
    if (source == null) return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;
    for(i = 0; i < sourceKeys.length; i++){
        key = sourceKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        target[key] = source[key];
    }
    return target;
}
function _possible_constructor_return(self, call) {
    if (call && (_type_of(call) === "object" || typeof call === "function")) {
        return call;
    }
    return _assert_this_initialized(self);
}
function _set_prototype_of(o, p) {
    _set_prototype_of = Object.setPrototypeOf || function setPrototypeOf(o, p) {
        o.__proto__ = p;
        return o;
    };
    return _set_prototype_of(o, p);
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
function _is_native_reflect_construct() {
    try {
        var result = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}));
    } catch (_) {}
    return (_is_native_reflect_construct = function() {
        return !!result;
    })();
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
// src/index.ts
var index_exports = {};
__export(index_exports, {
    ApolloProvider: function() {
        return ApolloProvider;
    },
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
    C_Collection: function() {
        return C_Collection;
    },
    C_Db: function() {
        return C_Db;
    },
    C_Document: function() {
        return C_Document;
    },
    C_Model: function() {
        return C_Model;
    },
    ESLINT_CLI: function() {
        return ESLINT_CLI;
    },
    ESLINT_INSPECT_CLI: function() {
        return ESLINT_INSPECT_CLI;
    },
    E_ErrorType: function() {
        return E_ErrorType;
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
    Loading: function() {
        return Loading;
    },
    LoadingContext: function() {
        return LoadingContext;
    },
    LoadingProvider: function() {
        return LoadingProvider;
    },
    MongoController: function() {
        return MongoController;
    },
    MongooseController: function() {
        return MongooseController;
    },
    NODE_MODULES: function() {
        return NODE_MODULES;
    },
    NODE_MODULES_INSPECT_CLI: function() {
        return NODE_MODULES_INSPECT_CLI;
    },
    NextIntlContext: function() {
        return NextIntlContext;
    },
    NextIntlProvider: function() {
        return NextIntlProvider;
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
    },
    aggregatePaginate: function() {
        return import_mongoose_aggregate_paginate_v2.default;
    },
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
    deepMerge: function() {
        return deepMerge;
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
    generateShortId: function() {
        return generateShortId;
    },
    generateSlug: function() {
        return generateSlug;
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
    isJson: function() {
        return isJson;
    },
    join: function() {
        return join2;
    },
    mongo: function() {
        return mongo;
    },
    mongoosePaginate: function() {
        return import_mongoose_paginate_v2.default;
    },
    readFileSync: function() {
        return readFileSync2;
    },
    regexSearchMapper: function() {
        return regexSearchMapper;
    },
    removeAccent: function() {
        return removeAccent;
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
    serializer: function() {
        return serializer;
    },
    storageClient: function() {
        return storageClient;
    },
    storageServer: function() {
        return storageServer;
    },
    throwResponse: function() {
        return throwResponse;
    },
    useLoading: function() {
        return useLoading;
    },
    useNextIntl: function() {
        return useNextIntl;
    },
    useStorage: function() {
        return useStorage;
    },
    useTranslateNextIntl: function() {
        return useTranslateNextIntl;
    },
    validate: function() {
        return validate;
    },
    withNextIntl: function() {
        return withNextIntl;
    },
    writeFileSync: function() {
        return writeFileSync2;
    }
});
module.exports = __toCommonJS(index_exports);
// node_modules/.pnpm/tsup@8.4.0_@microsoft+api-extractor@7.52.2_@types+node@22.13.15__@swc+core@1.11.16_@swc_2cf618e3551c9a9c667a9bb2a289f06e/node_modules/tsup/assets/cjs_shims.js
var getImportMetaUrl = function() {
    return typeof document === "undefined" ? new URL("file:".concat(__filename)).href : document.currentScript && document.currentScript.src || new URL("main.js", document.baseURI).href;
};
var importMetaUrl = /* @__PURE__ */ getImportMetaUrl();
// src/configs/index.ts
var import_eslint_config = __toESM(require("@antfu/eslint-config"), 1);
// src/utils/config.ts
function deepMerge() {
    for(var _len = arguments.length, configs = new Array(_len), _key = 0; _key < _len; _key++){
        configs[_key] = arguments[_key];
    }
    var merge = function(target, source) {
        var result = _object_spread({}, target);
        Object.keys(source).forEach(function(key) {
            if (!Object.hasOwnProperty.call(source, key)) {
                return;
            }
            var sourceValue = source[key];
            var targetValue = result[key];
            if (Array.isArray(sourceValue)) {
                result[key] = _to_consumable_array(/* @__PURE__ */ new Set(_to_consumable_array(Array.isArray(targetValue) ? targetValue : []).concat(_to_consumable_array(sourceValue))));
            } else if ((typeof sourceValue === "undefined" ? "undefined" : _type_of(sourceValue)) === "object" && sourceValue !== null && !Array.isArray(sourceValue)) {
                result[key] = merge((typeof targetValue === "undefined" ? "undefined" : _type_of(targetValue)) === "object" && targetValue !== null && !Array.isArray(targetValue) ? targetValue : {}, sourceValue);
            } else {
                result[key] = sourceValue;
            }
        });
        return result;
    };
    return configs.flatMap(function(config) {
        return Array.isArray(config) ? config : [
            config
        ];
    }).reduce(function(acc, config) {
        return merge(acc, config);
    }, {});
}
// src/constants/path.ts
var import_node_process3 = __toESM(require("process"), 1);
var import_node_url = require("url");
// src/utils/command.ts
var import_boxen = __toESM(require("boxen"), 1);
var import_chalk = __toESM(require("chalk"), 1);
var import_node_child_process = require("child_process");
var import_node_process2 = __toESM(require("process"), 1);
var util = __toESM(require("util"), 1);
// src/typescript/command.ts
var E_ErrorType = /* @__PURE__ */ function(E_ErrorType2) {
    E_ErrorType2["Error"] = "error";
    E_ErrorType2["Warning"] = "warning";
    return E_ErrorType2;
}(E_ErrorType || {});
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
    var tmp = options.isJson, isJson2 = tmp === void 0 ? false : tmp;
    var content = isJson2 && (typeof data === "undefined" ? "undefined" : _type_of(data)) === "object" ? JSON.stringify(data, null, 4) : String(data);
    fs.writeFileSync(filePath, content, "utf-8");
}
function appendFileSync2(filePath, data) {
    var options = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    var tmp = options.isJson, isJson2 = tmp === void 0 ? false : tmp;
    var content = isJson2 && (typeof data === "undefined" ? "undefined" : _type_of(data)) === "object" ? JSON.stringify(data, null, 4) : String(data);
    fs.appendFileSync(filePath, content, "utf-8");
}
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
                    import_node_process2.default.on("SIGINT", function() {
                        commandLog.warning("Process interrupted. Terminating...");
                        controller.abort();
                        import_node_process2.default.exit();
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
// src/nodejs/mongo.ts
var import_date_fns = require("date-fns");
var import_mongoose = require("mongoose");
var import_mongoose_aggregate_paginate_v2 = __toESM(require("mongoose-aggregate-paginate-v2"), 1);
var import_mongoose_paginate_v2 = __toESM(require("mongoose-paginate-v2"), 1);
var import_uuid = require("uuid");
// src/utils/string.ts
var import_crypto_js = __toESM(require("crypto-js"), 1);
var import_slugify = __toESM(require("slugify"), 1);
var slugify = import_slugify.default.default || import_slugify.default;
function generateSlug() {
    var str = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "", options = arguments.length > 1 ? arguments[1] : void 0;
    var _ref = options || {}, _ref_lower = _ref.lower, lower = _ref_lower === void 0 ? true : _ref_lower, _ref_locale = _ref.locale, locale = _ref_locale === void 0 ? "vi" : _ref_locale, rest = _object_without_properties(_ref, [
        "lower",
        "locale"
    ]);
    return slugify(str, _object_spread({
        lower: lower,
        locale: locale
    }, rest));
}
function generateShortId(uuid) {
    var length = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 4;
    return import_crypto_js.default.SHA256(uuid).toString(import_crypto_js.default.enc.Hex).slice(0, length);
}
// src/utils/validate.ts
var validate = {
    isEmpty: function isEmpty(value) {
        if (value === null || value === void 0) {
            return true;
        }
        if (Array.isArray(value)) {
            return value.length === 0;
        }
        if ((typeof value === "undefined" ? "undefined" : _type_of(value)) === "object") {
            if (_instanceof(value, Date)) {
                return false;
            }
            return Object.keys(value).length === 0;
        }
        if (typeof value === "string") {
            return value.trim().length === 0;
        }
        return false;
    }
};
// src/nodejs/mongo.ts
var mongo = {
    getDateTime: function getDateTime() {
        var now = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : /* @__PURE__ */ new Date();
        return (0, import_date_fns.format)(now, "yyyy-MM-dd HH:mm:ss.SSS");
    },
    createGenericFields: function createGenericFields() {
        var _ref = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, _ref_returnDateAs = _ref.returnDateAs, returnDateAs = _ref_returnDateAs === void 0 ? "string" : _ref_returnDateAs;
        var now = returnDateAs === "string" ? mongo.getDateTime() : /* @__PURE__ */ new Date();
        return {
            id: (0, import_uuid.v4)(),
            isDel: false,
            createdAt: now,
            updatedAt: now
        };
    },
    applyPlugins: function applyPlugins(schema, plugins) {
        plugins.filter(function(plugin) {
            return typeof plugin === "function";
        }).forEach(function(plugin) {
            return schema.plugin(plugin);
        });
    },
    applyMiddlewares: function applyMiddlewares(schema, middlewares) {
        middlewares.forEach(function(param) {
            var method = param.method, pre = param.pre, post = param.post;
            if (method && pre) {
                schema.pre(method, pre);
            }
            if (method && post) {
                schema.post(method, post);
            }
        });
    },
    createGenericSchema: function createGenericSchema(mongoose) {
        return new mongoose.Schema({
            id: {
                type: String,
                default: import_uuid.v4,
                required: true,
                unique: true
            },
            isDel: {
                type: Boolean,
                default: false,
                required: true
            }
        }, {
            timestamps: true
        });
    },
    createSchema: function createSchema(param) {
        var mongoose = param.mongoose, schema = param.schema, _param_virtuals = param.virtuals, virtuals = _param_virtuals === void 0 ? [] : _param_virtuals, _param_standalone = param.standalone, standalone = _param_standalone === void 0 ? false : _param_standalone;
        var createdSchema = new mongoose.Schema(schema, {
            strict: true
        });
        virtuals.forEach(function(param) {
            var name = param.name, options = param.options, get = param.get;
            var virtualInstance = createdSchema.virtual(name, options);
            if (get) virtualInstance.get(get);
        });
        if (!standalone) {
            createdSchema.add(mongo.createGenericSchema(mongoose));
        }
        return createdSchema;
    },
    createModel: function createModel(param) {
        var currentMongooseInstance = param.mongoose, name = param.name, schema = param.schema, _param_pagination = param.pagination, pagination = _param_pagination === void 0 ? false : _param_pagination, _param_aggregate = param.aggregate, aggregate = _param_aggregate === void 0 ? false : _param_aggregate, _param_virtuals = param.virtuals, virtuals = _param_virtuals === void 0 ? [] : _param_virtuals, _param_middlewares = param.middlewares, middlewares = _param_middlewares === void 0 ? [] : _param_middlewares;
        if (!name) {
            throw new Error("Model name is required.");
        }
        if (currentMongooseInstance.models[name]) {
            return currentMongooseInstance.models[name];
        }
        var createdSchema = mongo.createSchema({
            mongoose: currentMongooseInstance,
            schema: schema,
            virtuals: virtuals
        });
        mongo.applyPlugins(createdSchema, [
            pagination && import_mongoose_paginate_v2.default,
            aggregate && import_mongoose_aggregate_paginate_v2.default
        ]);
        mongo.applyMiddlewares(createdSchema, middlewares);
        return currentMongooseInstance.model(name, createdSchema);
    },
    createSlugQuery: function createSlugQuery(slug) {
        var filters = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, id = arguments.length > 2 ? arguments[2] : void 0;
        return _object_spread_props(_object_spread({}, filters, id && {
            id: {
                $ne: id
            }
        }), {
            $or: [
                {
                    slug: slug
                },
                {
                    slugHistory: slug
                }
            ]
        });
    },
    validator: {
        isEmpty: function isEmpty() {
            return /*#__PURE__*/ function() {
                var _ref = _async_to_generator(function(value) {
                    return _ts_generator(this, function(_state) {
                        return [
                            2,
                            !validate.isEmpty(value)
                        ];
                    });
                });
                return function(value) {
                    return _ref.apply(this, arguments);
                };
            }();
        },
        isUnique: function isUnique(fields) {
            return /*#__PURE__*/ function() {
                var _ref = _async_to_generator(function(value) {
                    var query, existingDocument;
                    return _ts_generator(this, function(_state) {
                        switch(_state.label){
                            case 0:
                                if (!Array.isArray(fields) || fields.length === 0) {
                                    throw new Error("Fields must be a non-empty array of strings.");
                                }
                                query = {
                                    $or: fields.map(function(field) {
                                        return _define_property({}, field, value);
                                    })
                                };
                                return [
                                    4,
                                    this.constructor.findOne(query)
                                ];
                            case 1:
                                existingDocument = _state.sent();
                                return [
                                    2,
                                    !existingDocument
                                ];
                        }
                    });
                });
                return function(value) {
                    return _ref.apply(this, arguments);
                };
            }();
        },
        matchesRegex: function matchesRegex(regexArray) {
            return /*#__PURE__*/ function() {
                var _ref = _async_to_generator(function(value) {
                    return _ts_generator(this, function(_state) {
                        if (!Array.isArray(regexArray) || regexArray.some(function(r) {
                            return !_instanceof(r, RegExp);
                        })) {
                            throw new Error("regexArray must be an array of valid RegExp objects.");
                        }
                        return [
                            2,
                            regexArray.every(function(regex) {
                                return regex.test(value);
                            })
                        ];
                    });
                });
                return function(value) {
                    return _ref.apply(this, arguments);
                };
            }();
        }
    }
};
var MongoController = /*#__PURE__*/ function() {
    function MongoController(db, collectionName) {
        _class_call_check(this, MongoController);
        this.collection = db.collection(collectionName);
    }
    _create_class(MongoController, [
        {
            key: "createOne",
            value: function createOne(document2) {
                var _this = this;
                return _async_to_generator(function() {
                    var finalDocument, result, error;
                    return _ts_generator(this, function(_state) {
                        switch(_state.label){
                            case 0:
                                _state.trys.push([
                                    0,
                                    2,
                                    ,
                                    3
                                ]);
                                finalDocument = _object_spread({}, mongo.createGenericFields(), document2);
                                return [
                                    4,
                                    _this.collection.insertOne(finalDocument)
                                ];
                            case 1:
                                result = _state.sent();
                                return [
                                    2,
                                    {
                                        success: true,
                                        message: "Document created successfully",
                                        result: result
                                    }
                                ];
                            case 2:
                                error = _state.sent();
                                return [
                                    2,
                                    {
                                        success: false,
                                        message: error.message
                                    }
                                ];
                            case 3:
                                return [
                                    2
                                ];
                        }
                    });
                })();
            }
        },
        {
            key: "createMany",
            value: function createMany(documents) {
                var _this = this;
                return _async_to_generator(function() {
                    var finalDocuments, result, error;
                    return _ts_generator(this, function(_state) {
                        switch(_state.label){
                            case 0:
                                _state.trys.push([
                                    0,
                                    2,
                                    ,
                                    3
                                ]);
                                finalDocuments = documents.map(function(document2) {
                                    return _object_spread({}, mongo.createGenericFields(), document2);
                                });
                                return [
                                    4,
                                    _this.collection.insertMany(finalDocuments)
                                ];
                            case 1:
                                result = _state.sent();
                                if (result.insertedCount === 0) {
                                    return [
                                        2,
                                        {
                                            success: false,
                                            message: "No documents were inserted"
                                        }
                                    ];
                                }
                                return [
                                    2,
                                    {
                                        success: true,
                                        message: "".concat(result.insertedCount, " documents created successfully"),
                                        result: result
                                    }
                                ];
                            case 2:
                                error = _state.sent();
                                return [
                                    2,
                                    {
                                        success: false,
                                        message: error.message
                                    }
                                ];
                            case 3:
                                return [
                                    2
                                ];
                        }
                    });
                })();
            }
        },
        {
            key: "findOne",
            value: function findOne(filter) {
                var _this = this;
                return _async_to_generator(function() {
                    var result, error;
                    return _ts_generator(this, function(_state) {
                        switch(_state.label){
                            case 0:
                                _state.trys.push([
                                    0,
                                    2,
                                    ,
                                    3
                                ]);
                                return [
                                    4,
                                    _this.collection.findOne(filter)
                                ];
                            case 1:
                                result = _state.sent();
                                if (!result) {
                                    return [
                                        2,
                                        {
                                            success: false,
                                            message: "Document not found"
                                        }
                                    ];
                                }
                                return [
                                    2,
                                    {
                                        success: true,
                                        message: "Document found",
                                        result: result
                                    }
                                ];
                            case 2:
                                error = _state.sent();
                                return [
                                    2,
                                    {
                                        success: false,
                                        message: error.message
                                    }
                                ];
                            case 3:
                                return [
                                    2
                                ];
                        }
                    });
                })();
            }
        },
        {
            key: "findAll",
            value: function findAll() {
                var filter = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
                var _this = this;
                return _async_to_generator(function() {
                    var result, error;
                    return _ts_generator(this, function(_state) {
                        switch(_state.label){
                            case 0:
                                _state.trys.push([
                                    0,
                                    2,
                                    ,
                                    3
                                ]);
                                return [
                                    4,
                                    _this.collection.find(filter).toArray()
                                ];
                            case 1:
                                result = _state.sent();
                                return [
                                    2,
                                    {
                                        success: true,
                                        message: "Documents retrieved successfully",
                                        result: result
                                    }
                                ];
                            case 2:
                                error = _state.sent();
                                return [
                                    2,
                                    {
                                        success: false,
                                        message: error.message
                                    }
                                ];
                            case 3:
                                return [
                                    2
                                ];
                        }
                    });
                })();
            }
        },
        {
            key: "count",
            value: function count() {
                var filter = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
                var _this = this;
                return _async_to_generator(function() {
                    var result, error;
                    return _ts_generator(this, function(_state) {
                        switch(_state.label){
                            case 0:
                                _state.trys.push([
                                    0,
                                    2,
                                    ,
                                    3
                                ]);
                                return [
                                    4,
                                    _this.collection.countDocuments(filter)
                                ];
                            case 1:
                                result = _state.sent();
                                return [
                                    2,
                                    {
                                        success: true,
                                        message: "Count retrieved successfully",
                                        result: result
                                    }
                                ];
                            case 2:
                                error = _state.sent();
                                return [
                                    2,
                                    {
                                        success: false,
                                        message: error.message
                                    }
                                ];
                            case 3:
                                return [
                                    2
                                ];
                        }
                    });
                })();
            }
        },
        {
            key: "updateOne",
            value: function updateOne(filter, update) {
                var _this = this;
                return _async_to_generator(function() {
                    var result, error;
                    return _ts_generator(this, function(_state) {
                        switch(_state.label){
                            case 0:
                                _state.trys.push([
                                    0,
                                    2,
                                    ,
                                    3
                                ]);
                                return [
                                    4,
                                    _this.collection.updateOne(filter, {
                                        $set: update
                                    })
                                ];
                            case 1:
                                result = _state.sent();
                                if (result.matchedCount === 0) {
                                    return [
                                        2,
                                        {
                                            success: false,
                                            message: "No documents matched the filter"
                                        }
                                    ];
                                }
                                return [
                                    2,
                                    {
                                        success: true,
                                        message: "Document updated successfully",
                                        result: result
                                    }
                                ];
                            case 2:
                                error = _state.sent();
                                return [
                                    2,
                                    {
                                        success: false,
                                        message: error.message
                                    }
                                ];
                            case 3:
                                return [
                                    2
                                ];
                        }
                    });
                })();
            }
        },
        {
            key: "updateMany",
            value: function updateMany(filter, update) {
                var _this = this;
                return _async_to_generator(function() {
                    var result, error;
                    return _ts_generator(this, function(_state) {
                        switch(_state.label){
                            case 0:
                                _state.trys.push([
                                    0,
                                    2,
                                    ,
                                    3
                                ]);
                                return [
                                    4,
                                    _this.collection.updateMany(filter, {
                                        $set: update
                                    })
                                ];
                            case 1:
                                result = _state.sent();
                                if (result.matchedCount === 0) {
                                    return [
                                        2,
                                        {
                                            success: false,
                                            message: "No documents matched the filter"
                                        }
                                    ];
                                }
                                return [
                                    2,
                                    {
                                        success: true,
                                        message: "Documents updated successfully",
                                        result: result
                                    }
                                ];
                            case 2:
                                error = _state.sent();
                                return [
                                    2,
                                    {
                                        success: false,
                                        message: error.message
                                    }
                                ];
                            case 3:
                                return [
                                    2
                                ];
                        }
                    });
                })();
            }
        },
        {
            key: "deleteOne",
            value: function deleteOne(filter) {
                var _this = this;
                return _async_to_generator(function() {
                    var result, error;
                    return _ts_generator(this, function(_state) {
                        switch(_state.label){
                            case 0:
                                _state.trys.push([
                                    0,
                                    2,
                                    ,
                                    3
                                ]);
                                return [
                                    4,
                                    _this.collection.deleteOne(filter)
                                ];
                            case 1:
                                result = _state.sent();
                                if (result.deletedCount === 0) {
                                    return [
                                        2,
                                        {
                                            success: false,
                                            message: "No documents matched the filter"
                                        }
                                    ];
                                }
                                return [
                                    2,
                                    {
                                        success: true,
                                        message: "Document deleted successfully",
                                        result: result
                                    }
                                ];
                            case 2:
                                error = _state.sent();
                                return [
                                    2,
                                    {
                                        success: false,
                                        message: error.message
                                    }
                                ];
                            case 3:
                                return [
                                    2
                                ];
                        }
                    });
                })();
            }
        },
        {
            key: "deleteMany",
            value: function deleteMany(filter) {
                var _this = this;
                return _async_to_generator(function() {
                    var result, error;
                    return _ts_generator(this, function(_state) {
                        switch(_state.label){
                            case 0:
                                _state.trys.push([
                                    0,
                                    2,
                                    ,
                                    3
                                ]);
                                return [
                                    4,
                                    _this.collection.deleteMany(filter)
                                ];
                            case 1:
                                result = _state.sent();
                                if (result.deletedCount === 0) {
                                    return [
                                        2,
                                        {
                                            success: false,
                                            message: "No documents matched the filter"
                                        }
                                    ];
                                }
                                return [
                                    2,
                                    {
                                        success: true,
                                        message: "Documents deleted successfully",
                                        result: result
                                    }
                                ];
                            case 2:
                                error = _state.sent();
                                return [
                                    2,
                                    {
                                        success: false,
                                        message: error.message
                                    }
                                ];
                            case 3:
                                return [
                                    2
                                ];
                        }
                    });
                })();
            }
        }
    ]);
    return MongoController;
}();
var MongooseController = /*#__PURE__*/ function() {
    function MongooseController(model) {
        _class_call_check(this, MongooseController);
        this.model = model;
    }
    _create_class(MongooseController, [
        {
            key: "getModelName",
            value: function getModelName() {
                return this.model.modelName;
            }
        },
        {
            key: "findOne",
            value: function findOne() {
                var filter = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, projection = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, options = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, populate = arguments.length > 3 ? arguments[3] : void 0;
                var _this = this;
                return _async_to_generator(function() {
                    var query, result, error;
                    return _ts_generator(this, function(_state) {
                        switch(_state.label){
                            case 0:
                                _state.trys.push([
                                    0,
                                    2,
                                    ,
                                    3
                                ]);
                                query = _this.model.findOne(filter, projection, options);
                                if (populate) {
                                    query.populate(populate);
                                }
                                return [
                                    4,
                                    query.exec()
                                ];
                            case 1:
                                result = _state.sent();
                                if (!result) {
                                    return [
                                        2,
                                        {
                                            success: false,
                                            message: "No ".concat(_this.getModelName(), " found."),
                                            code: RESPONSE_STATUS.NOT_FOUND.CODE
                                        }
                                    ];
                                }
                                return [
                                    2,
                                    {
                                        success: true,
                                        result: result
                                    }
                                ];
                            case 2:
                                error = _state.sent();
                                return [
                                    2,
                                    {
                                        success: false,
                                        message: error.message,
                                        code: RESPONSE_STATUS.INTERNAL_SERVER_ERROR.CODE
                                    }
                                ];
                            case 3:
                                return [
                                    2
                                ];
                        }
                    });
                })();
            }
        },
        {
            key: "findAll",
            value: function findAll() {
                var filter = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, projection = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, options = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, populate = arguments.length > 3 ? arguments[3] : void 0;
                var _this = this;
                return _async_to_generator(function() {
                    var query, result, error;
                    return _ts_generator(this, function(_state) {
                        switch(_state.label){
                            case 0:
                                _state.trys.push([
                                    0,
                                    2,
                                    ,
                                    3
                                ]);
                                query = _this.model.find(filter, projection, options);
                                if (populate) {
                                    query.populate(populate);
                                }
                                return [
                                    4,
                                    query.exec()
                                ];
                            case 1:
                                result = _state.sent();
                                return [
                                    2,
                                    {
                                        success: true,
                                        result: result
                                    }
                                ];
                            case 2:
                                error = _state.sent();
                                return [
                                    2,
                                    {
                                        success: false,
                                        message: error.message,
                                        code: RESPONSE_STATUS.INTERNAL_SERVER_ERROR.CODE
                                    }
                                ];
                            case 3:
                                return [
                                    2
                                ];
                        }
                    });
                })();
            }
        },
        {
            key: "findPaging",
            value: function findPaging() {
                var filter = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
                var _this = this;
                return _async_to_generator(function() {
                    var result, error;
                    return _ts_generator(this, function(_state) {
                        switch(_state.label){
                            case 0:
                                _state.trys.push([
                                    0,
                                    2,
                                    ,
                                    3
                                ]);
                                return [
                                    4,
                                    _this.model.paginate(filter, options)
                                ];
                            case 1:
                                result = _state.sent();
                                return [
                                    2,
                                    {
                                        success: true,
                                        result: result
                                    }
                                ];
                            case 2:
                                error = _state.sent();
                                return [
                                    2,
                                    {
                                        success: false,
                                        message: error.message,
                                        code: RESPONSE_STATUS.INTERNAL_SERVER_ERROR.CODE
                                    }
                                ];
                            case 3:
                                return [
                                    2
                                ];
                        }
                    });
                })();
            }
        },
        {
            key: "findPagingAggregate",
            value: function findPagingAggregate(pipeline) {
                var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
                var _this = this;
                return _async_to_generator(function() {
                    var result, error;
                    return _ts_generator(this, function(_state) {
                        switch(_state.label){
                            case 0:
                                _state.trys.push([
                                    0,
                                    2,
                                    ,
                                    3
                                ]);
                                return [
                                    4,
                                    _this.model.aggregatePaginate(_this.model.aggregate(pipeline), options)
                                ];
                            case 1:
                                result = _state.sent();
                                return [
                                    2,
                                    {
                                        success: true,
                                        result: result
                                    }
                                ];
                            case 2:
                                error = _state.sent();
                                return [
                                    2,
                                    {
                                        success: false,
                                        message: error.message,
                                        code: RESPONSE_STATUS.INTERNAL_SERVER_ERROR.CODE
                                    }
                                ];
                            case 3:
                                return [
                                    2
                                ];
                        }
                    });
                })();
            }
        },
        {
            key: "count",
            value: function count() {
                var filter = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
                var _this = this;
                return _async_to_generator(function() {
                    var result, error;
                    return _ts_generator(this, function(_state) {
                        switch(_state.label){
                            case 0:
                                _state.trys.push([
                                    0,
                                    2,
                                    ,
                                    3
                                ]);
                                return [
                                    4,
                                    _this.model.countDocuments(filter)
                                ];
                            case 1:
                                result = _state.sent();
                                return [
                                    2,
                                    {
                                        success: true,
                                        result: result
                                    }
                                ];
                            case 2:
                                error = _state.sent();
                                return [
                                    2,
                                    {
                                        success: false,
                                        message: error.message,
                                        code: RESPONSE_STATUS.INTERNAL_SERVER_ERROR.CODE
                                    }
                                ];
                            case 3:
                                return [
                                    2
                                ];
                        }
                    });
                })();
            }
        },
        {
            key: "createOne",
            value: function createOne(doc) {
                var _this = this;
                return _async_to_generator(function() {
                    var result, error;
                    return _ts_generator(this, function(_state) {
                        switch(_state.label){
                            case 0:
                                _state.trys.push([
                                    0,
                                    2,
                                    ,
                                    3
                                ]);
                                return [
                                    4,
                                    _this.model.create(doc)
                                ];
                            case 1:
                                result = _state.sent();
                                return [
                                    2,
                                    {
                                        success: true,
                                        result: result
                                    }
                                ];
                            case 2:
                                error = _state.sent();
                                return [
                                    2,
                                    {
                                        success: false,
                                        message: error.message,
                                        code: RESPONSE_STATUS.INTERNAL_SERVER_ERROR.CODE
                                    }
                                ];
                            case 3:
                                return [
                                    2
                                ];
                        }
                    });
                })();
            }
        },
        {
            key: "createMany",
            value: function createMany(docs) {
                var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
                var _this = this;
                return _async_to_generator(function() {
                    var createdDocuments, result, error;
                    return _ts_generator(this, function(_state) {
                        switch(_state.label){
                            case 0:
                                _state.trys.push([
                                    0,
                                    2,
                                    ,
                                    3
                                ]);
                                return [
                                    4,
                                    _this.model.insertMany(docs, options)
                                ];
                            case 1:
                                createdDocuments = _state.sent();
                                result = createdDocuments.map(function(doc) {
                                    if (_instanceof(doc, import_mongoose.Document)) {
                                        return doc.toObject();
                                    }
                                    return null;
                                }).filter(function(doc) {
                                    return doc !== null;
                                });
                                return [
                                    2,
                                    {
                                        success: true,
                                        result: result
                                    }
                                ];
                            case 2:
                                error = _state.sent();
                                return [
                                    2,
                                    {
                                        success: false,
                                        message: error.message,
                                        code: RESPONSE_STATUS.INTERNAL_SERVER_ERROR.CODE
                                    }
                                ];
                            case 3:
                                return [
                                    2
                                ];
                        }
                    });
                })();
            }
        },
        {
            key: "updateOne",
            value: function updateOne() {
                var filter = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, update = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, options = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
                var _this = this;
                return _async_to_generator(function() {
                    var result, error;
                    return _ts_generator(this, function(_state) {
                        switch(_state.label){
                            case 0:
                                _state.trys.push([
                                    0,
                                    2,
                                    ,
                                    3
                                ]);
                                return [
                                    4,
                                    _this.model.findOneAndUpdate(filter, update, _object_spread({
                                        new: true
                                    }, options)).exec()
                                ];
                            case 1:
                                result = _state.sent();
                                if (!result) {
                                    return [
                                        2,
                                        {
                                            success: false,
                                            message: "Failed to update ".concat(_this.getModelName(), "."),
                                            code: RESPONSE_STATUS.NOT_FOUND.CODE
                                        }
                                    ];
                                }
                                return [
                                    2,
                                    {
                                        success: true,
                                        result: result
                                    }
                                ];
                            case 2:
                                error = _state.sent();
                                return [
                                    2,
                                    {
                                        success: false,
                                        message: error.message,
                                        code: RESPONSE_STATUS.INTERNAL_SERVER_ERROR.CODE
                                    }
                                ];
                            case 3:
                                return [
                                    2
                                ];
                        }
                    });
                })();
            }
        },
        {
            key: "updateMany",
            value: function updateMany() {
                var filter = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, update = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, options = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
                var _this = this;
                return _async_to_generator(function() {
                    var result, error;
                    return _ts_generator(this, function(_state) {
                        switch(_state.label){
                            case 0:
                                _state.trys.push([
                                    0,
                                    2,
                                    ,
                                    3
                                ]);
                                return [
                                    4,
                                    _this.model.updateMany(filter, update, options).exec()
                                ];
                            case 1:
                                result = _state.sent();
                                return [
                                    2,
                                    {
                                        success: true,
                                        result: result
                                    }
                                ];
                            case 2:
                                error = _state.sent();
                                return [
                                    2,
                                    {
                                        success: false,
                                        message: error.message,
                                        code: RESPONSE_STATUS.INTERNAL_SERVER_ERROR.CODE
                                    }
                                ];
                            case 3:
                                return [
                                    2
                                ];
                        }
                    });
                })();
            }
        },
        {
            key: "deleteOne",
            value: function deleteOne() {
                var filter = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
                var _this = this;
                return _async_to_generator(function() {
                    var result, error;
                    return _ts_generator(this, function(_state) {
                        switch(_state.label){
                            case 0:
                                _state.trys.push([
                                    0,
                                    2,
                                    ,
                                    3
                                ]);
                                return [
                                    4,
                                    _this.model.findOneAndDelete(filter, options).exec()
                                ];
                            case 1:
                                result = _state.sent();
                                if (!result) {
                                    return [
                                        2,
                                        {
                                            success: false,
                                            message: "No ".concat(_this.getModelName(), " found to delete."),
                                            code: RESPONSE_STATUS.NOT_FOUND.CODE
                                        }
                                    ];
                                }
                                return [
                                    2,
                                    {
                                        success: true,
                                        result: result
                                    }
                                ];
                            case 2:
                                error = _state.sent();
                                return [
                                    2,
                                    {
                                        success: false,
                                        message: error.message,
                                        code: RESPONSE_STATUS.INTERNAL_SERVER_ERROR.CODE
                                    }
                                ];
                            case 3:
                                return [
                                    2
                                ];
                        }
                    });
                })();
            }
        },
        {
            key: "deleteMany",
            value: function deleteMany() {
                var filter = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
                var _this = this;
                return _async_to_generator(function() {
                    var result, error;
                    return _ts_generator(this, function(_state) {
                        switch(_state.label){
                            case 0:
                                _state.trys.push([
                                    0,
                                    2,
                                    ,
                                    3
                                ]);
                                return [
                                    4,
                                    _this.model.deleteMany(filter, options).exec()
                                ];
                            case 1:
                                result = _state.sent();
                                if (result.deletedCount === 0) {
                                    return [
                                        2,
                                        {
                                            success: false,
                                            message: "No documents found to delete.",
                                            code: RESPONSE_STATUS.NOT_FOUND.CODE
                                        }
                                    ];
                                }
                                return [
                                    2,
                                    {
                                        success: true,
                                        result: result
                                    }
                                ];
                            case 2:
                                error = _state.sent();
                                return [
                                    2,
                                    {
                                        success: false,
                                        message: error.message,
                                        code: RESPONSE_STATUS.INTERNAL_SERVER_ERROR.CODE
                                    }
                                ];
                            case 3:
                                return [
                                    2
                                ];
                        }
                    });
                })();
            }
        },
        {
            key: "createShortId",
            value: function createShortId(id) {
                var length = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 4;
                var _this = this;
                return _async_to_generator(function() {
                    var maxRetries, existingShortIds, retries, shortId, shortIdExists;
                    return _ts_generator(this, function(_state) {
                        switch(_state.label){
                            case 0:
                                maxRetries = 10;
                                existingShortIds = /* @__PURE__ */ new Set();
                                retries = 0;
                                _state.label = 1;
                            case 1:
                                if (!(retries < maxRetries)) return [
                                    3,
                                    4
                                ];
                                shortId = generateShortId(id, retries + length);
                                if (!!existingShortIds.has(shortId)) return [
                                    3,
                                    3
                                ];
                                existingShortIds.add(shortId);
                                return [
                                    4,
                                    _this.model.exists({
                                        shortId: shortId
                                    })
                                ];
                            case 2:
                                shortIdExists = _state.sent();
                                if (!shortIdExists) {
                                    return [
                                        2,
                                        {
                                            success: true,
                                            result: shortId
                                        }
                                    ];
                                }
                                _state.label = 3;
                            case 3:
                                retries++;
                                return [
                                    3,
                                    1
                                ];
                            case 4:
                                return [
                                    2,
                                    {
                                        success: false,
                                        message: "Failed to create a unique shortId",
                                        code: RESPONSE_STATUS.INTERNAL_SERVER_ERROR.CODE
                                    }
                                ];
                        }
                    });
                })();
            }
        },
        {
            key: "createSlug",
            value: function createSlug(fieldName, fields) {
                var filters = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
                var _this = this;
                return _async_to_generator(function() {
                    var fieldValue, createUniqueSlug, slugResults, _tmp, _tmp1, _i, lang, slug, slug1, uniqueSlug, error;
                    return _ts_generator(this, function(_state) {
                        switch(_state.label){
                            case 0:
                                _state.trys.push([
                                    0,
                                    8,
                                    ,
                                    9
                                ]);
                                fieldValue = fields[fieldName];
                                createUniqueSlug = /*#__PURE__*/ function() {
                                    var _ref = _async_to_generator(function(slug) {
                                        var existingDoc, suffix, uniqueSlug;
                                        return _ts_generator(this, function(_state) {
                                            switch(_state.label){
                                                case 0:
                                                    return [
                                                        4,
                                                        _this.model.findOne(mongo.createSlugQuery(slug, filters, fields.id))
                                                    ];
                                                case 1:
                                                    existingDoc = _state.sent();
                                                    if (!existingDoc) return [
                                                        2,
                                                        slug
                                                    ];
                                                    suffix = 1;
                                                    _state.label = 2;
                                                case 2:
                                                    uniqueSlug = "".concat(slug, "-").concat(suffix);
                                                    return [
                                                        4,
                                                        _this.model.findOne(mongo.createSlugQuery(uniqueSlug, filters, fields.id))
                                                    ];
                                                case 3:
                                                    existingDoc = _state.sent();
                                                    suffix++;
                                                    _state.label = 4;
                                                case 4:
                                                    if (existingDoc) return [
                                                        3,
                                                        2
                                                    ];
                                                    _state.label = 5;
                                                case 5:
                                                    return [
                                                        2,
                                                        uniqueSlug
                                                    ];
                                            }
                                        });
                                    });
                                    return function createUniqueSlug(slug) {
                                        return _ref.apply(this, arguments);
                                    };
                                }();
                                if (!((typeof fieldValue === "undefined" ? "undefined" : _type_of(fieldValue)) === "object")) return [
                                    3,
                                    5
                                ];
                                slugResults = {};
                                _tmp = [];
                                for(_tmp1 in fieldValue)_tmp.push(_tmp1);
                                _i = 0;
                                _state.label = 1;
                            case 1:
                                if (!(_i < _tmp.length)) return [
                                    3,
                                    4
                                ];
                                lang = _tmp[_i];
                                slug = generateSlug(fieldValue[lang]);
                                return [
                                    4,
                                    createUniqueSlug(slug)
                                ];
                            case 2:
                                slugResults[lang] = _state.sent();
                                _state.label = 3;
                            case 3:
                                _i++;
                                return [
                                    3,
                                    1
                                ];
                            case 4:
                                return [
                                    2,
                                    {
                                        success: true,
                                        result: slugResults
                                    }
                                ];
                            case 5:
                                slug1 = generateSlug(fieldValue);
                                return [
                                    4,
                                    createUniqueSlug(slug1)
                                ];
                            case 6:
                                uniqueSlug = _state.sent();
                                return [
                                    2,
                                    {
                                        success: true,
                                        result: uniqueSlug
                                    }
                                ];
                            case 7:
                                return [
                                    3,
                                    9
                                ];
                            case 8:
                                error = _state.sent();
                                return [
                                    2,
                                    {
                                        success: false,
                                        message: "Failed to create a unique slug: ".concat(error.message),
                                        code: RESPONSE_STATUS.INTERNAL_SERVER_ERROR.CODE
                                    }
                                ];
                            case 9:
                                return [
                                    2
                                ];
                        }
                    });
                })();
            }
        },
        {
            key: "aggregate",
            value: function aggregate(pipeline) {
                var _this = this;
                return _async_to_generator(function() {
                    var result, error;
                    return _ts_generator(this, function(_state) {
                        switch(_state.label){
                            case 0:
                                _state.trys.push([
                                    0,
                                    2,
                                    ,
                                    3
                                ]);
                                return [
                                    4,
                                    _this.model.aggregate(pipeline)
                                ];
                            case 1:
                                result = _state.sent();
                                return [
                                    2,
                                    {
                                        success: true,
                                        result: result
                                    }
                                ];
                            case 2:
                                error = _state.sent();
                                return [
                                    2,
                                    {
                                        success: false,
                                        message: error.message,
                                        code: RESPONSE_STATUS.INTERNAL_SERVER_ERROR.CODE
                                    }
                                ];
                            case 3:
                                return [
                                    2
                                ];
                        }
                    });
                })();
            }
        }
    ]);
    return MongooseController;
}();
// src/react/apollo-client.tsx
var import_client = require("@apollo/client");
var import_error = require("@apollo/client/link/error");
var import_subscriptions = require("@apollo/client/link/subscriptions");
var import_utilities = require("@apollo/client/utilities");
var import_graphql_ws = require("graphql-ws");
var import_jsx_runtime = require("react/jsx-runtime");
function createLinks(options) {
    var errorLink = (0, import_error.onError)(function(param) {
        var graphQLErrors = param.graphQLErrors, networkError = param.networkError;
        graphQLErrors === null || graphQLErrors === void 0 ? void 0 : graphQLErrors.forEach(function(param) {
            var message = param.message, locations = param.locations, path3 = param.path;
            return console.error("[GraphQL error]: Message: ".concat(message, ", Location: ").concat(locations, ", Path: ").concat(path3));
        });
        if (networkError) {
            console.error("[Network error]: ".concat(networkError));
        }
    });
    var httpLink = new import_client.HttpLink({
        uri: options === null || options === void 0 ? void 0 : options.uri,
        credentials: "include"
    });
    var wsLink = (options === null || options === void 0 ? void 0 : options.wsUrl) ? new import_subscriptions.GraphQLWsLink((0, import_graphql_ws.createClient)({
        url: options.wsUrl
    })) : null;
    var splitLink = wsLink ? (0, import_client.split)(function(param) {
        var query = param.query;
        var mainDefinition = (0, import_utilities.getMainDefinition)(query);
        if (mainDefinition.kind === "OperationDefinition") {
            var operation = mainDefinition.operation;
            return operation === "subscription";
        }
        return false;
    }, wsLink, httpLink) : httpLink;
    var cleanTypeName = new import_client.ApolloLink(function(operation, forward) {
        if (operation.variables) {
            operation.variables = JSON.parse(JSON.stringify(operation.variables), function(key, value) {
                return key === "__typename" ? void 0 : value;
            });
        }
        return forward(operation);
    });
    return {
        errorLink: errorLink,
        httpLink: httpLink,
        wsLink: wsLink,
        splitLink: splitLink,
        cleanTypeName: cleanTypeName
    };
}
function ApolloProvider(param) {
    var isNextJS = param.isNextJS, options = param.options, children = param.children, CustomClient = param.client, CustomProvider = param.provider, CustomCache = param.cache;
    var Client = CustomClient !== null && CustomClient !== void 0 ? CustomClient : import_client.ApolloClient;
    if (typeof Client !== "function") {
        throw new TypeError("Invalid ApolloClient provided. Ensure CustomClient is a class.");
    }
    var Provider = CustomProvider || import_client.ApolloProvider;
    var Cache = CustomCache || import_client.InMemoryCache;
    var _createLinks = createLinks(options), cleanTypeName = _createLinks.cleanTypeName, errorLink = _createLinks.errorLink, splitLink = _createLinks.splitLink;
    var client = new Client(_object_spread({
        cache: _instanceof(Cache, import_client.InMemoryCache) ? Cache : new import_client.InMemoryCache(),
        link: import_client.ApolloLink.from([
            cleanTypeName,
            errorLink,
            splitLink
        ].filter(Boolean))
    }, options));
    if (isNextJS) {
        return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Provider, {
            makeClient: function() {
                return client;
            },
            children: children
        });
    }
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Provider, {
        client: client,
        children: children
    });
}
// src/react/loading.tsx
var import_classnames = __toESM(require("classnames"), 1);
var import_react = require("react");
var import_loading_module = __toESM(require("./react/loading.module.scss"), 1);
var import_jsx_runtime2 = require("react/jsx-runtime");
var LoadingContext = (0, import_react.createContext)(void 0);
function useLoading() {
    var context = (0, import_react.use)(LoadingContext);
    if (!context) {
        throw new Error("useLoading must be used within a LoadingProvider");
    }
    return context;
}
function Loading(_param) {
    var _param_full = _param.full, full = _param_full === void 0 ? false : _param_full, _param_block = _param.block, block = _param_block === void 0 ? false : _param_block, _param_className = _param.className, className = _param_className === void 0 ? "" : _param_className, _param_message = _param.message, message = _param_message === void 0 ? "Loading" : _param_message, rest = _object_without_properties(_param, [
        "full",
        "block",
        "className",
        "message"
    ]);
    function _renderLoading() {
        return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", _object_spread_props(_object_spread({
            className: import_loading_module.default.container
        }, rest), {
            children: [
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", {
                    className: import_loading_module.default.ring
                }),
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", {
                    className: import_loading_module.default.ring
                }),
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", {
                    className: import_loading_module.default.ring
                }),
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", {
                    className: import_loading_module.default.ring
                }),
                message && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", {
                    className: import_loading_module.default.message,
                    children: message
                })
            ]
        }));
    }
    if (full) {
        return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", {
            className: (0, import_classnames.default)(import_loading_module.default.fullscreen, className),
            children: _renderLoading()
        });
    } else if (block) {
        return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", {
            className: (0, import_classnames.default)(import_loading_module.default.block, className),
            children: _renderLoading()
        });
    }
    return _renderLoading();
}
function LoadingProvider(param) {
    var children = param.children;
    var _ref = _sliced_to_array((0, import_react.useState)(false), 2), isLoading = _ref[0], setIsLoading = _ref[1];
    var _ref1 = _sliced_to_array((0, import_react.useState)(false), 2), isGlobalLoading = _ref1[0], setIsGlobalLoading = _ref1[1];
    var showLoading = (0, import_react.useCallback)(function() {
        var global = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : false;
        setIsLoading(true);
        setIsGlobalLoading(global);
    }, []);
    var hideLoading = (0, import_react.useCallback)(function() {
        setIsLoading(false);
        setIsGlobalLoading(false);
    }, []);
    var contextValue = (0, import_react.useMemo)(function() {
        return {
            isLoading: isLoading,
            isGlobalLoading: isGlobalLoading,
            showLoading: showLoading,
            hideLoading: hideLoading
        };
    }, [
        isLoading,
        isGlobalLoading,
        showLoading,
        hideLoading
    ]);
    return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(LoadingContext, {
        value: contextValue,
        children: isLoading ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Loading, {
            full: isGlobalLoading
        }) : children
    });
}
// src/react/next-intl.tsx
var import_next_intl = require("next-intl");
var import_react3 = require("react");
// src/react/storage.tsx
var import_react2 = require("react");
// src/utils/serializer.ts
var serializer = {
    serialize: function(value) {
        return JSON.stringify(value, function(_, v) {
            if (_instanceof(v, Date)) {
                return {
                    __type: "Date",
                    value: v.toISOString()
                };
            }
            return v;
        });
    },
    deserialize: function(value) {
        return JSON.parse(value, function(_, v) {
            if ((v === null || v === void 0 ? void 0 : v.__type) === "Date") {
                return new Date(v.value);
            }
            return v;
        });
    }
};
// src/utils/storage-client.ts
var import_localforage = __toESM(require("localforage"), 1);
var storageClient = {
    get: function get(key) {
        return _async_to_generator(function() {
            var error;
            return _ts_generator(this, function(_state) {
                switch(_state.label){
                    case 0:
                        _state.trys.push([
                            0,
                            2,
                            ,
                            3
                        ]);
                        return [
                            4,
                            import_localforage.default.getItem(key)
                        ];
                    case 1:
                        return [
                            2,
                            _state.sent()
                        ];
                    case 2:
                        error = _state.sent();
                        console.error('❌ [Storage:get] Error getting key "'.concat(key, '":'), error);
                        return [
                            2,
                            null
                        ];
                    case 3:
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
                            2,
                            ,
                            3
                        ]);
                        return [
                            4,
                            import_localforage.default.setItem(key, value)
                        ];
                    case 1:
                        _state.sent();
                        return [
                            3,
                            3
                        ];
                    case 2:
                        error = _state.sent();
                        console.error('❌ [Storage:set] Error setting key "'.concat(key, '":'), error);
                        return [
                            3,
                            3
                        ];
                    case 3:
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
                            2,
                            ,
                            3
                        ]);
                        return [
                            4,
                            import_localforage.default.removeItem(key)
                        ];
                    case 1:
                        _state.sent();
                        return [
                            3,
                            3
                        ];
                    case 2:
                        error = _state.sent();
                        console.error('❌ [Storage:remove] Error removing key "'.concat(key, '":'), error);
                        return [
                            3,
                            3
                        ];
                    case 3:
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
                            2,
                            ,
                            3
                        ]);
                        return [
                            4,
                            import_localforage.default.keys()
                        ];
                    case 1:
                        keys = _state.sent();
                        return [
                            2,
                            keys !== null && keys !== void 0 ? keys : []
                        ];
                    case 2:
                        error = _state.sent();
                        console.error("❌ [Storage:keys] Error getting keys:", error);
                        return [
                            2,
                            []
                        ];
                    case 3:
                        return [
                            2
                        ];
                }
            });
        })();
    }
};
// src/react/storage.tsx
function useStorage(key, initialValue) {
    var serializer2 = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : serializer;
    var _ref = _sliced_to_array((0, import_react2.useState)(initialValue), 2), value = _ref[0], setValue = _ref[1];
    var _ref1 = _sliced_to_array((0, import_react2.useState)(false), 2), isLoaded = _ref1[0], setIsLoaded = _ref1[1];
    (0, import_react2.useEffect)(function() {
        var isMounted = true;
        var loadValue = /*#__PURE__*/ function() {
            var _ref = _async_to_generator(function() {
                var valueFound, parsedValue, serialized, error;
                return _ts_generator(this, function(_state) {
                    switch(_state.label){
                        case 0:
                            _state.trys.push([
                                0,
                                6,
                                7,
                                8
                            ]);
                            return [
                                4,
                                storageClient.get(key)
                            ];
                        case 1:
                            valueFound = _state.sent();
                            if (!isMounted) return [
                                3,
                                5
                            ];
                            if (!(valueFound !== null)) return [
                                3,
                                2
                            ];
                            parsedValue = serializer2.deserialize(valueFound);
                            setValue(parsedValue);
                            return [
                                3,
                                5
                            ];
                        case 2:
                            if (!(initialValue !== void 0)) return [
                                3,
                                4
                            ];
                            serialized = serializer2.serialize(initialValue);
                            return [
                                4,
                                storageClient.set(key, serialized)
                            ];
                        case 3:
                            _state.sent();
                            setValue(initialValue);
                            return [
                                3,
                                5
                            ];
                        case 4:
                            setValue(void 0);
                            _state.label = 5;
                        case 5:
                            return [
                                3,
                                8
                            ];
                        case 6:
                            error = _state.sent();
                            console.error('Error loading value for key "'.concat(key, '":'), error);
                            if (isMounted) {
                                setValue(initialValue);
                            }
                            return [
                                3,
                                8
                            ];
                        case 7:
                            if (isMounted) setIsLoaded(true);
                            return [
                                7
                            ];
                        case 8:
                            return [
                                2
                            ];
                    }
                });
            });
            return function loadValue() {
                return _ref.apply(this, arguments);
            };
        }();
        loadValue();
        return function() {
            isMounted = false;
            setIsLoaded(false);
        };
    }, [
        key,
        initialValue,
        serializer2
    ]);
    (0, import_react2.useEffect)(function() {
        if (!isLoaded) return;
        var saveValue = /*#__PURE__*/ function() {
            var _ref = _async_to_generator(function() {
                var serialized, error;
                return _ts_generator(this, function(_state) {
                    switch(_state.label){
                        case 0:
                            _state.trys.push([
                                0,
                                3,
                                ,
                                4
                            ]);
                            if (!(value !== void 0)) return [
                                3,
                                2
                            ];
                            serialized = serializer2.serialize(value);
                            return [
                                4,
                                storageClient.set(key, serialized)
                            ];
                        case 1:
                            _state.sent();
                            _state.label = 2;
                        case 2:
                            return [
                                3,
                                4
                            ];
                        case 3:
                            error = _state.sent();
                            console.error('Error saving value for key "'.concat(key, '":'), error);
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
            return function saveValue() {
                return _ref.apply(this, arguments);
            };
        }();
        saveValue();
    }, [
        value,
        key,
        serializer2,
        isLoaded
    ]);
    var set = (0, import_react2.useCallback)(function(newValue) {
        setValue(function(prev) {
            return typeof newValue === "function" ? newValue(prev) : newValue;
        });
    }, []);
    var remove = (0, import_react2.useCallback)(/*#__PURE__*/ _async_to_generator(function() {
        var error;
        return _ts_generator(this, function(_state) {
            switch(_state.label){
                case 0:
                    _state.trys.push([
                        0,
                        2,
                        ,
                        3
                    ]);
                    return [
                        4,
                        storageClient.remove(key)
                    ];
                case 1:
                    _state.sent();
                    setValue(void 0);
                    return [
                        3,
                        3
                    ];
                case 2:
                    error = _state.sent();
                    console.error('Error removing key "'.concat(key, '":'), error);
                    return [
                        3,
                        3
                    ];
                case 3:
                    return [
                        2
                    ];
            }
        });
    }), [
        key
    ]);
    return {
        value: value,
        set: set,
        remove: remove
    };
}
// src/react/next-intl.tsx
var import_jsx_runtime3 = require("react/jsx-runtime");
var NextIntlContext = (0, import_react3.createContext)(void 0);
function useNextIntl() {
    var context = (0, import_react3.use)(NextIntlContext);
    if (!context) {
        throw new Error("useNextIntl must be used within a NextIntlProvider");
    }
    return context;
}
var useTranslateNextIntl = import_next_intl.useTranslations;
function withNextIntl(Component) {
    var PageWithI18n = function(props) {
        var _languages_find;
        var currentLanguage = useNextIntl().currentLanguage;
        var messages = props.messages, languages = props.languages;
        var defaultLang = "en";
        var defaultMessages = messages[(currentLanguage === null || currentLanguage === void 0 ? void 0 : currentLanguage.value) || defaultLang];
        var timeZone = (_languages_find = languages.find(function(lang) {
            return lang.value === (currentLanguage === null || currentLanguage === void 0 ? void 0 : currentLanguage.value);
        })) === null || _languages_find === void 0 ? void 0 : _languages_find.timezone;
        if (!messages) {
            console.warn("Missing messages for language: ".concat((currentLanguage === null || currentLanguage === void 0 ? void 0 : currentLanguage.value) || defaultLang));
            return null;
        }
        return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_next_intl.NextIntlClientProvider, {
            locale: (currentLanguage === null || currentLanguage === void 0 ? void 0 : currentLanguage.value) || defaultLang,
            messages: defaultMessages,
            timeZone: timeZone,
            children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Component, _object_spread({}, props))
        });
    };
    PageWithI18n.displayName = "withNextIntl(".concat(Component.displayName || Component.name || "Component", ")");
    return PageWithI18n;
}
function LanguageWrapperBase(param) {
    var children = param.children;
    return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_jsx_runtime3.Fragment, {
        children: children
    });
}
var LanguageWrapper = withNextIntl(LanguageWrapperBase);
function NextIntlProvider(param) {
    var children = param.children, languages = param.languages, messages = param.messages;
    var _languages_;
    var _useStorage = useStorage("lang", (_languages_ = languages === null || languages === void 0 ? void 0 : languages[0]) !== null && _languages_ !== void 0 ? _languages_ : {}), value = _useStorage.value, set = _useStorage.set;
    var contextValue = (0, import_react3.useMemo)(function() {
        return {
            languages: languages,
            currentLanguage: value,
            setCurrentLanguage: set
        };
    }, [
        languages,
        set,
        value
    ]);
    return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(NextIntlContext, {
        value: contextValue,
        children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(LanguageWrapper, {
            languages: languages,
            messages: messages,
            children: children
        })
    });
}
// src/typescript/mongo.ts
var import_mongodb = require("mongodb");
var import_mongoose2 = require("mongoose");
var C_Db = /*#__PURE__*/ function(_import_mongodb_Db) {
    _inherits(C_Db, _import_mongodb_Db);
    function C_Db() {
        _class_call_check(this, C_Db);
        return _call_super(this, C_Db, arguments);
    }
    return C_Db;
}(import_mongodb.Db);
var C_Document = /*#__PURE__*/ function(_import_mongoose2_Document) {
    _inherits(C_Document, _import_mongoose2_Document);
    function C_Document() {
        _class_call_check(this, C_Document);
        return _call_super(this, C_Document, arguments);
    }
    return C_Document;
}(import_mongoose2.Document);
var C_Model = /*#__PURE__*/ function(_import_mongoose2_Model) {
    _inherits(C_Model, _import_mongoose2_Model);
    function C_Model() {
        _class_call_check(this, C_Model);
        return _call_super(this, C_Model, arguments);
    }
    return C_Model;
}(import_mongoose2.Model);
var C_Collection = /*#__PURE__*/ function(_import_mongodb_Collection) {
    _inherits(C_Collection, _import_mongodb_Collection);
    function C_Collection() {
        _class_call_check(this, C_Collection);
        return _call_super(this, C_Collection, arguments);
    }
    return C_Collection;
}(import_mongodb.Collection);
// src/utils/log.ts
var import_graphql = require("graphql");
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
// src/utils/common.ts
var import_unorm = __toESM(require("unorm"), 1);
function isJson(str) {
    try {
        JSON.parse(str);
        return true;
    } catch (e) {
        return false;
    }
}
var charMap = {
    a: [
        "\xE0",
        "\xE1",
        "\u1EA1",
        "\u1EA3",
        "\xE3",
        "\xE2",
        "\u1EA7",
        "\u1EA5",
        "\u1EAD",
        "\u1EA9",
        "\u1EAB",
        "\u0103",
        "\u1EB1",
        "\u1EAF",
        "\u1EB7",
        "\u1EB3",
        "\u1EB5"
    ],
    e: [
        "\xE8",
        "\xE9",
        "\u1EB9",
        "\u1EBB",
        "\u1EBD",
        "\xEA",
        "\u1EC1",
        "\u1EBF",
        "\u1EC7",
        "\u1EC3",
        "\u1EC5"
    ],
    i: [
        "\xEC",
        "\xED",
        "\u1ECB",
        "\u1EC9",
        "\u0129"
    ],
    o: [
        "\xF2",
        "\xF3",
        "\u1ECD",
        "\u1ECF",
        "\xF5",
        "\xF4",
        "\u1ED3",
        "\u1ED1",
        "\u1ED9",
        "\u1ED5",
        "\u1ED7",
        "\u01A1",
        "\u1EDD",
        "\u1EDB",
        "\u1EE3",
        "\u1EDF",
        "\u1EE1"
    ],
    u: [
        "\xF9",
        "\xFA",
        "\u1EE5",
        "\u1EE7",
        "\u0169",
        "\u01B0",
        "\u1EEB",
        "\u1EE9",
        "\u1EF1",
        "\u1EED",
        "\u1EEF"
    ],
    y: [
        "\u1EF3",
        "\xFD",
        "\u1EF5",
        "\u1EF7",
        "\u1EF9"
    ],
    d: [
        "\u0111"
    ]
};
var upperCharMap = Object.entries(charMap).reduce(function(map, param) {
    var _param = _sliced_to_array(param, 2), key = _param[0], value = _param[1];
    map[key.toUpperCase()] = value.map(function(char) {
        return char.toUpperCase();
    });
    return map;
}, {});
function regexSearchMapper(str) {
    str = import_unorm.default.nfkc(str);
    var combinedMap = _object_spread({}, charMap, upperCharMap);
    var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
    try {
        for(var _iterator = Object.entries(combinedMap)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
            var _step_value = _sliced_to_array(_step.value, 2), baseChar = _step_value[0], variations = _step_value[1];
            var pattern = "[".concat(baseChar).concat(variations.join(""), "]");
            var replacement = "(".concat([
                baseChar
            ].concat(_to_consumable_array(variations)).join("|"), ")");
            str = str.replace(new RegExp(pattern, "g"), replacement);
        }
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
    return str;
}
function removeAccent(str) {
    return str.normalize("NFD").replace(RegExp("\\p{Diacritic}", "gu"), "");
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
    ApolloProvider: ApolloProvider,
    BUILD_DIRECTORY: BUILD_DIRECTORY,
    COMMAND: COMMAND,
    COMMIT_LINT_CLI: COMMIT_LINT_CLI,
    CYBERSKILL_CLI: CYBERSKILL_CLI,
    CYBERSKILL_DIRECTORY: CYBERSKILL_DIRECTORY,
    CYBERSKILL_PACKAGE_NAME: CYBERSKILL_PACKAGE_NAME,
    CYBERSKILL_STORAGE: CYBERSKILL_STORAGE,
    C_Collection: C_Collection,
    C_Db: C_Db,
    C_Document: C_Document,
    C_Model: C_Model,
    ESLINT_CLI: ESLINT_CLI,
    ESLINT_INSPECT_CLI: ESLINT_INSPECT_CLI,
    E_ErrorType: E_ErrorType,
    GIT_CLI: GIT_CLI,
    GIT_COMMIT_EDITMSG: GIT_COMMIT_EDITMSG,
    GIT_HOOK: GIT_HOOK,
    GIT_IGNORE: GIT_IGNORE,
    HOOK: HOOK,
    LINT_STAGED_CLI: LINT_STAGED_CLI,
    Loading: Loading,
    LoadingContext: LoadingContext,
    LoadingProvider: LoadingProvider,
    MongoController: MongoController,
    MongooseController: MongooseController,
    NODE_MODULES: NODE_MODULES,
    NODE_MODULES_INSPECT_CLI: NODE_MODULES_INSPECT_CLI,
    NextIntlContext: NextIntlContext,
    NextIntlProvider: NextIntlProvider,
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
    WORKING_DIRECTORY: WORKING_DIRECTORY,
    aggregatePaginate: aggregatePaginate,
    appendFileSync: appendFileSync,
    checkPackage: checkPackage,
    clearAllErrorLists: clearAllErrorLists,
    commandFormatter: commandFormatter,
    commandLog: commandLog,
    deepMerge: deepMerge,
    dirname: dirname,
    executeCommand: executeCommand,
    existsSync: existsSync,
    generateShortId: generateShortId,
    generateSlug: generateSlug,
    getLatestPackageVersion: getLatestPackageVersion,
    getPackageJson: getPackageJson,
    getStorageDir: getStorageDir,
    getStoredErrorLists: getStoredErrorLists,
    initNodePersist: initNodePersist,
    isJson: isJson,
    join: join,
    mongo: mongo,
    mongoosePaginate: mongoosePaginate,
    readFileSync: readFileSync,
    regexSearchMapper: regexSearchMapper,
    removeAccent: removeAccent,
    require: require,
    resolve: resolve,
    resolveCommands: resolveCommands,
    resolveCyberSkillPath: resolveCyberSkillPath,
    resolveWorkingPath: resolveWorkingPath,
    saveErrorListToStorage: saveErrorListToStorage,
    serializer: serializer,
    storageClient: storageClient,
    storageServer: storageServer,
    throwResponse: throwResponse,
    useLoading: useLoading,
    useNextIntl: useNextIntl,
    useStorage: useStorage,
    useTranslateNextIntl: useTranslateNextIntl,
    validate: validate,
    withNextIntl: withNextIntl,
    writeFileSync: writeFileSync
});
