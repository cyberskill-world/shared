"use strict";
function _type_of(obj) {
    "@swc/helpers - typeof";
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
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
// src/utils/fs.ts
var fs_exports = {};
__export(fs_exports, {
    appendFileSync: function() {
        return appendFileSync2;
    },
    existsSync: function() {
        return existsSync2;
    },
    readFileSync: function() {
        return readFileSync2;
    },
    writeFileSync: function() {
        return writeFileSync2;
    }
});
module.exports = __toCommonJS(fs_exports);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
    appendFileSync: appendFileSync,
    existsSync: existsSync,
    readFileSync: readFileSync,
    writeFileSync: writeFileSync
});
