#!/usr/bin/env node
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
// src/cli.ts
import process4 from "node:process";
import { hideBin } from "yargs/helpers";
import yargs from "yargs/yargs";
// src/constants/path.ts
import process3 from "node:process";
import { fileURLToPath } from "node:url";
// src/utils/command.ts
import boxen from "boxen";
import chalk from "chalk";
import { exec } from "node:child_process";
import process2 from "node:process";
import * as util from "node:util";
// src/utils/package.ts
import fetch from "node-fetch";
// src/utils/fs.ts
import * as fs from "node:fs";
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
// src/utils/path.ts
import * as path from "node:path";
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
function join2() {
    for(var _len = arguments.length, urls = new Array(_len), _key = 0; _key < _len; _key++){
        urls[_key] = arguments[_key];
    }
    var _path;
    return (_path = path).join.apply(_path, _to_consumable_array(urls));
}
// src/utils/storage-server.ts
import nodePersist from "node-persist";
import os from "node:os";
import path2 from "node:path";
import process from "node:process";
function getStorageDir() {
    return process.env.CYBERSKILL_STORAGE_DIR || path2.join(os.homedir(), CYBERSKILL_STORAGE);
}
function initNodePersist() {
    return _initNodePersist.apply(this, arguments);
}
function _initNodePersist() {
    _initNodePersist = _async_to_generator(function() {
        return _ts_generator(this, function(_state) {
            switch(_state.label){
                case 0:
                    if (!!nodePersist.defaultInstance) return [
                        3,
                        2
                    ];
                    return [
                        4,
                        nodePersist.init({
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
                            nodePersist.getItem(key)
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
                            nodePersist.setItem(key, value)
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
                            nodePersist.removeItem(key)
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
                            nodePersist.keys()
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
                        fetch("https://registry.npmjs.org/".concat(packageName, "/latest"), {
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
var DEBUG = process2.env.DEBUG === "true";
var execPromise = util.promisify(exec);
var gray = chalk.gray, blue = chalk.blue;
var getTimeStamp = function() {
    return gray("[".concat(/* @__PURE__ */ new Date().toLocaleTimeString(), "]"));
};
function chalkKeyword(color) {
    var chalkColor = chalk[color];
    return typeof chalkColor === "function" ? chalkColor : chalk.green;
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
        console.log(boxen(chalkTitleColor(chalkColor("".concat(title, "\n").concat(content))), {
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
        console.log(boxen(chalkTitleColor(chalkColor("".concat(title, ": ").concat(content.length))), {
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
                    process2.on("SIGINT", function() {
                        commandLog.warning("Process interrupted. Terminating...");
                        controller.abort();
                        process2.exit();
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
var __filename2 = fileURLToPath(import.meta.url);
var __dirname2 = dirname2(__filename2);
var CYBERSKILL_DIRECTORY = resolve2(__dirname2, "../../");
var WORKING_DIRECTORY = process3.env.INIT_CWD || process3.cwd();
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
function runCommand(description, command) {
    return _runCommand.apply(this, arguments);
}
function _runCommand() {
    _runCommand = // src/cli.ts
    _async_to_generator(function(description, command) {
        return _ts_generator(this, function(_state) {
            switch(_state.label){
                case 0:
                    commandLog.info("".concat(description, "..."));
                    console.log("run", commandFormatter.format(command));
                    return [
                        4,
                        executeCommand(commandFormatter.format(command))
                    ];
                case 1:
                    _state.sent();
                    commandLog.success("".concat(description, " completed successfully."));
                    return [
                        2
                    ];
            }
        });
    });
    return _runCommand.apply(this, arguments);
}
function checkTypescript() {
    return _checkTypescript.apply(this, arguments);
}
function _checkTypescript() {
    _checkTypescript = _async_to_generator(function() {
        return _ts_generator(this, function(_state) {
            switch(_state.label){
                case 0:
                    if (!existsSync2(PATH.TS_CONFIG)) return [
                        3,
                        2
                    ];
                    return [
                        4,
                        runCommand("Performing TypeScript validation", COMMAND.TYPESCRIPT_CHECK)
                    ];
                case 1:
                    _state.sent();
                    return [
                        3,
                        3
                    ];
                case 2:
                    commandLog.warning("No TypeScript configuration found. Skipping type check.");
                    _state.label = 3;
                case 3:
                    return [
                        2
                    ];
            }
        });
    });
    return _checkTypescript.apply(this, arguments);
}
function checkEslint() {
    return _checkEslint.apply(this, arguments);
}
function _checkEslint() {
    _checkEslint = _async_to_generator(function() {
        var fix;
        var _arguments = arguments;
        return _ts_generator(this, function(_state) {
            switch(_state.label){
                case 0:
                    fix = _arguments.length > 0 && _arguments[0] !== void 0 ? _arguments[0] : false;
                    if (!fix) return [
                        3,
                        2
                    ];
                    return [
                        4,
                        runCommand("Running ESLint with auto-fix", COMMAND.ESLINT_FIX)
                    ];
                case 1:
                    _state.sent();
                    return [
                        3,
                        4
                    ];
                case 2:
                    return [
                        4,
                        runCommand("Running ESLint check", COMMAND.ESLINT_CHECK)
                    ];
                case 3:
                    _state.sent();
                    _state.label = 4;
                case 4:
                    return [
                        2
                    ];
            }
        });
    });
    return _checkEslint.apply(this, arguments);
}
function showCheckResult() {
    return _showCheckResult.apply(this, arguments);
}
function _showCheckResult() {
    _showCheckResult = _async_to_generator(function() {
        var allResults, errors, warnings;
        return _ts_generator(this, function(_state) {
            switch(_state.label){
                case 0:
                    return [
                        4,
                        getStoredErrorLists()
                    ];
                case 1:
                    allResults = _state.sent();
                    errors = allResults.filter(function(e) {
                        return e.type === "error" /* Error */ ;
                    });
                    warnings = allResults.filter(function(e) {
                        return e.type === "warning" /* Warning */ ;
                    });
                    if (!errors.length && !warnings.length) {
                        commandLog.printBoxedLog("\u2714 NO ISSUES FOUND", "", {
                            color: "green"
                        });
                    } else {
                        commandLog.printBoxedLog("\u26A0 Warnings", warnings, {
                            color: "yellow"
                        });
                        commandLog.printBoxedLog("\u2716 Errors", errors, {
                            color: "red"
                        });
                    }
                    return [
                        2
                    ];
            }
        });
    });
    return _showCheckResult.apply(this, arguments);
}
function lintStaged() {
    return _lintStaged.apply(this, arguments);
}
function _lintStaged() {
    _lintStaged = _async_to_generator(function() {
        var isCurrentProject, error;
        return _ts_generator(this, function(_state) {
            switch(_state.label){
                case 0:
                    return [
                        4,
                        checkPackage(CYBERSKILL_PACKAGE_NAME)
                    ];
                case 1:
                    isCurrentProject = _state.sent().isCurrentProject;
                    if (!isCurrentProject) return [
                        3,
                        6
                    ];
                    _state.label = 2;
                case 2:
                    _state.trys.push([
                        2,
                        5,
                        ,
                        6
                    ]);
                    return [
                        4,
                        runCommand("Building package: ".concat(CYBERSKILL_PACKAGE_NAME), COMMAND.BUILD)
                    ];
                case 3:
                    _state.sent();
                    return [
                        4,
                        runCommand("Staging build artifacts", COMMAND.STAGE_BUILD_DIRECTORY)
                    ];
                case 4:
                    _state.sent();
                    return [
                        3,
                        6
                    ];
                case 5:
                    error = _state.sent();
                    commandLog.error("Error building and staging ".concat(CYBERSKILL_PACKAGE_NAME, ": ").concat(error.message));
                    throw error;
                case 6:
                    return [
                        4,
                        runCommand("Executing lint-staged", COMMAND.CYBERSKILL.LINT_STAGED)
                    ];
                case 7:
                    _state.sent();
                    showCheckResult();
                    return [
                        2
                    ];
            }
        });
    });
    return _lintStaged.apply(this, arguments);
}
function inspectLint() {
    return _inspectLint.apply(this, arguments);
}
function _inspectLint() {
    _inspectLint = _async_to_generator(function() {
        return _ts_generator(this, function(_state) {
            switch(_state.label){
                case 0:
                    return [
                        4,
                        runCommand("Inspecting ESLint configuration", COMMAND.ESLINT_INSPECT)
                    ];
                case 1:
                    _state.sent();
                    return [
                        2
                    ];
            }
        });
    });
    return _inspectLint.apply(this, arguments);
}
function lintCheck() {
    return _lintCheck.apply(this, arguments);
}
function _lintCheck() {
    _lintCheck = _async_to_generator(function() {
        return _ts_generator(this, function(_state) {
            switch(_state.label){
                case 0:
                    return [
                        4,
                        clearAllErrorLists()
                    ];
                case 1:
                    _state.sent();
                    return [
                        4,
                        Promise.all([
                            checkTypescript(),
                            checkEslint()
                        ])
                    ];
                case 2:
                    _state.sent();
                    showCheckResult();
                    return [
                        2
                    ];
            }
        });
    });
    return _lintCheck.apply(this, arguments);
}
function lintFix() {
    return _lintFix.apply(this, arguments);
}
function _lintFix() {
    _lintFix = _async_to_generator(function() {
        return _ts_generator(this, function(_state) {
            switch(_state.label){
                case 0:
                    return [
                        4,
                        clearAllErrorLists()
                    ];
                case 1:
                    _state.sent();
                    return [
                        4,
                        Promise.all([
                            checkTypescript(),
                            checkEslint(true)
                        ])
                    ];
                case 2:
                    _state.sent();
                    showCheckResult();
                    return [
                        2
                    ];
            }
        });
    });
    return _lintFix.apply(this, arguments);
}
function commitLint() {
    return _commitLint.apply(this, arguments);
}
function _commitLint() {
    _commitLint = _async_to_generator(function() {
        return _ts_generator(this, function(_state) {
            switch(_state.label){
                case 0:
                    return [
                        4,
                        runCommand("Validating commit message", COMMAND.CYBERSKILL.COMMIT_LINT)
                    ];
                case 1:
                    _state.sent();
                    showCheckResult();
                    return [
                        2
                    ];
            }
        });
    });
    return _commitLint.apply(this, arguments);
}
function setupGitHook() {
    return _setupGitHook.apply(this, arguments);
}
function _setupGitHook() {
    _setupGitHook = _async_to_generator(function() {
        var hooks, gitIgnoreEntry, gitignore;
        return _ts_generator(this, function(_state) {
            switch(_state.label){
                case 0:
                    return [
                        4,
                        runCommand("Configuring Git hooks", COMMAND.CONFIGURE_GIT_HOOK)
                    ];
                case 1:
                    _state.sent();
                    return [
                        4,
                        resolveCommands(HOOK)
                    ];
                case 2:
                    hooks = _state.sent();
                    writeFileSync2(PATH.SIMPLE_GIT_HOOKS, hooks, {
                        isJson: true
                    });
                    gitIgnoreEntry = "\n".concat(SIMPLE_GIT_HOOK_JSON, "\n");
                    if (existsSync2(PATH.GIT_IGNORE)) {
                        gitignore = readFileSync2(PATH.GIT_IGNORE).split("\n");
                        if (!gitignore.includes(SIMPLE_GIT_HOOK_JSON)) {
                            appendFileSync2(PATH.GIT_IGNORE, gitIgnoreEntry);
                        }
                    } else {
                        writeFileSync2(PATH.GIT_IGNORE, gitIgnoreEntry);
                    }
                    return [
                        4,
                        runCommand("Installing simple-git-hooks", COMMAND.SIMPLE_GIT_HOOKS)
                    ];
                case 3:
                    _state.sent();
                    return [
                        2
                    ];
            }
        });
    });
    return _setupGitHook.apply(this, arguments);
}
function installDependencies() {
    return _installDependencies.apply(this, arguments);
}
function _installDependencies() {
    _installDependencies = _async_to_generator(function() {
        var strategies, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, _step_value, command, message, error, err;
        return _ts_generator(this, function(_state) {
            switch(_state.label){
                case 0:
                    strategies = [
                        {
                            command: COMMAND.PNPM_INSTALL_STANDARD,
                            message: "Installing dependencies (standard)"
                        },
                        {
                            command: COMMAND.PNPM_INSTALL_LEGACY,
                            message: "Retrying with legacy peer dependencies"
                        },
                        {
                            command: COMMAND.PNPM_INSTALL_FORCE,
                            message: "Retrying with force install"
                        }
                    ];
                    _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
                    _state.label = 1;
                case 1:
                    _state.trys.push([
                        1,
                        8,
                        9,
                        10
                    ]);
                    _iterator = strategies[Symbol.iterator]();
                    _state.label = 2;
                case 2:
                    if (!!(_iteratorNormalCompletion = (_step = _iterator.next()).done)) return [
                        3,
                        7
                    ];
                    _step_value = _step.value, command = _step_value.command, message = _step_value.message;
                    _state.label = 3;
                case 3:
                    _state.trys.push([
                        3,
                        5,
                        ,
                        6
                    ]);
                    return [
                        4,
                        runCommand("".concat(message, " using: ").concat(command.cmd), command)
                    ];
                case 4:
                    _state.sent();
                    return [
                        2
                    ];
                case 5:
                    error = _state.sent();
                    commandLog.warning("Installation attempt failed: ".concat(command.cmd));
                    commandLog.error("Details: ".concat(error.message));
                    return [
                        3,
                        6
                    ];
                case 6:
                    _iteratorNormalCompletion = true;
                    return [
                        3,
                        2
                    ];
                case 7:
                    return [
                        3,
                        10
                    ];
                case 8:
                    err = _state.sent();
                    _didIteratorError = true;
                    _iteratorError = err;
                    return [
                        3,
                        10
                    ];
                case 9:
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return != null) {
                            _iterator.return();
                        }
                    } finally{
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                    return [
                        7
                    ];
                case 10:
                    throw new Error("All dependency installation strategies failed.");
            }
        });
    });
    return _installDependencies.apply(this, arguments);
}
function updatePackage(packageName) {
    return _updatePackage.apply(this, arguments);
}
function _updatePackage() {
    _updatePackage = _async_to_generator(function(packageName) {
        var _ref, installedPath, latestVersion, file, error;
        return _ts_generator(this, function(_state) {
            switch(_state.label){
                case 0:
                    _state.trys.push([
                        0,
                        4,
                        ,
                        5
                    ]);
                    return [
                        4,
                        checkPackage(packageName)
                    ];
                case 1:
                    _ref = _state.sent(), installedPath = _ref.installedPath, latestVersion = _ref.latestVersion, file = _ref.file;
                    file.dependencies = _object_spread_props(_object_spread({}, file.dependencies), _define_property({}, file.name, latestVersion));
                    writeFileSync2(installedPath, file, {
                        isJson: true
                    });
                    return [
                        4,
                        installDependencies()
                    ];
                case 2:
                    _state.sent();
                    return [
                        4,
                        lintFix()
                    ];
                case 3:
                    _state.sent();
                    return [
                        3,
                        5
                    ];
                case 4:
                    error = _state.sent();
                    commandLog.error('Failed to update "'.concat(packageName, '": ').concat(error.message));
                    throw error;
                case 5:
                    return [
                        2
                    ];
            }
        });
    });
    return _updatePackage.apply(this, arguments);
}
function setup() {
    return _setup.apply(this, arguments);
}
function _setup() {
    _setup = _async_to_generator(function() {
        var _ref, isInstalled, installedVersion, latestVersion, isCurrentProject, isUpToDate, error;
        return _ts_generator(this, function(_state) {
            switch(_state.label){
                case 0:
                    if (!existsSync2(PATH.PACKAGE_JSON)) {
                        commandLog.error("package.json not found. Aborting setup.");
                        return [
                            2
                        ];
                    }
                    _state.label = 1;
                case 1:
                    _state.trys.push([
                        1,
                        7,
                        ,
                        8
                    ]);
                    return [
                        4,
                        checkPackage(CYBERSKILL_PACKAGE_NAME)
                    ];
                case 2:
                    _ref = _state.sent(), isInstalled = _ref.isInstalled, installedVersion = _ref.installedVersion, latestVersion = _ref.latestVersion, isCurrentProject = _ref.isCurrentProject;
                    isUpToDate = isCurrentProject || isInstalled && installedVersion === latestVersion;
                    if (!isUpToDate) return [
                        3,
                        3
                    ];
                    commandLog.success("Cyberskill package is already up to date.");
                    return [
                        3,
                        5
                    ];
                case 3:
                    return [
                        4,
                        updatePackage(CYBERSKILL_PACKAGE_NAME)
                    ];
                case 4:
                    _state.sent();
                    _state.label = 5;
                case 5:
                    return [
                        4,
                        setupGitHook()
                    ];
                case 6:
                    _state.sent();
                    return [
                        3,
                        8
                    ];
                case 7:
                    error = _state.sent();
                    commandLog.error("Project setup failed: ".concat(error.message));
                    throw error;
                case 8:
                    return [
                        2
                    ];
            }
        });
    });
    return _setup.apply(this, arguments);
}
function reset() {
    return _reset.apply(this, arguments);
}
function _reset() {
    _reset = _async_to_generator(function() {
        return _ts_generator(this, function(_state) {
            switch(_state.label){
                case 0:
                    return [
                        4,
                        runCommand("Resetting project files", COMMAND.RESET)
                    ];
                case 1:
                    _state.sent();
                    return [
                        4,
                        installDependencies()
                    ];
                case 2:
                    _state.sent();
                    return [
                        4,
                        setupGitHook()
                    ];
                case 3:
                    _state.sent();
                    return [
                        2
                    ];
            }
        });
    });
    return _reset.apply(this, arguments);
}
function inspect() {
    return _inspect.apply(this, arguments);
}
function _inspect() {
    _inspect = _async_to_generator(function() {
        return _ts_generator(this, function(_state) {
            switch(_state.label){
                case 0:
                    return [
                        4,
                        runCommand("Inspecting project dependencies", COMMAND.NODE_MODULES_INSPECT)
                    ];
                case 1:
                    _state.sent();
                    return [
                        2
                    ];
            }
        });
    });
    return _inspect.apply(this, arguments);
}
function testUnit() {
    return _testUnit.apply(this, arguments);
}
function _testUnit() {
    _testUnit = _async_to_generator(function() {
        return _ts_generator(this, function(_state) {
            switch(_state.label){
                case 0:
                    return [
                        4,
                        runCommand("Running unit tests", COMMAND.CYBERSKILL.TEST_UNIT)
                    ];
                case 1:
                    _state.sent();
                    return [
                        2
                    ];
            }
        });
    });
    return _testUnit.apply(this, arguments);
}
function testE2E() {
    return _testE2E.apply(this, arguments);
}
function _testE2E() {
    _testE2E = _async_to_generator(function() {
        return _ts_generator(this, function(_state) {
            switch(_state.label){
                case 0:
                    return [
                        4,
                        runCommand("Running end-to-end tests", COMMAND.CYBERSKILL.TEST_E2E)
                    ];
                case 1:
                    _state.sent();
                    return [
                        2
                    ];
            }
        });
    });
    return _testE2E.apply(this, arguments);
}
yargs(hideBin(process4.argv)).scriptName(CYBERSKILL_CLI).usage("$0 <command> [options]").command("lint", "Check code for linting issues", lintCheck).command("lint:fix", "Fix linting issues automatically", lintFix).command("lint:inspect", "View active ESLint configuration", inspectLint).command("lint-staged", "Run lint checks on staged files", lintStaged).command("commitlint", "Validate commit message format", commitLint).command("setup", "Initialize project setup and dependencies", setup).command("reset", "Reset the project and reinstall dependencies", reset).command("inspect", "Analyze installed project dependencies", inspect).command("test:unit", "Run unit test suite", testUnit).command("test:e2e", "Run end-to-end test suite", testE2E).demandCommand(1, "Please specify a valid command.").strict().help().alias("h", "help").alias("v", "version").epilog('\u{1F4A1} Tip: Use "--help" with any command to see options\n').parse();
export { installDependencies, updatePackage };
