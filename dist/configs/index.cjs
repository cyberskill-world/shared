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
var _this = void 0;
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
// src/configs/index.ts
var configs_exports = {};
__export(configs_exports, {
    default: function() {
        return configs_default;
    }
});
module.exports = __toCommonJS(configs_exports);
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
    return configs.flatMap(function(config2) {
        return Array.isArray(config2) ? config2 : [
            config2
        ];
    }).reduce(function(acc, config2) {
        return merge(acc, config2);
    }, {});
}
// src/configs/index.ts
var config = {
    merge: function() {
        var type = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "eslint";
        for(var _len = arguments.length, configs = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++){
            configs[_key - 1] = arguments[_key];
        }
        var mergeConfigs = function() {
            return deepMerge.apply(void 0, _to_consumable_array(configs));
        };
        if (type === "eslint") {
            var _mergeConfigs = mergeConfigs(), ignores = _mergeConfigs.ignores, rest = _object_without_properties(_mergeConfigs, [
                "ignores"
            ]);
            var normalizedIgnores = Array.isArray(ignores) && ignores.every(function(item) {
                return typeof item === "string";
            }) ? {
                ignores: ignores
            } : void 0;
            var configArray = [
                rest
            ].concat(_to_consumable_array(normalizedIgnores ? [
                normalizedIgnores
            ] : []));
            return (0, import_eslint_config.default).apply(_this, [
                {
                    stylistic: {
                        semi: true,
                        indent: 4,
                        quotes: "single"
                    },
                    yaml: false,
                    react: true,
                    formatters: {
                        css: true,
                        html: true,
                        markdown: "prettier"
                    }
                }
            ].concat(_to_consumable_array(configArray)));
        }
        if (type === "commitlint" || type === "lint-staged" || type === "vitest") {
            return mergeConfigs();
        }
        throw new Error("Unknown type: ".concat(type));
    }
};
var configs_default = config;
