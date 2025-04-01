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
// src/utils/index.ts
var utils_exports = {};
__export(utils_exports, {
    deepMerge: function() {
        return deepMerge;
    },
    generateShortId: function() {
        return generateShortId;
    },
    generateSlug: function() {
        return generateSlug;
    },
    isJson: function() {
        return isJson;
    },
    regexSearchMapper: function() {
        return regexSearchMapper;
    },
    removeAccent: function() {
        return removeAccent;
    },
    serializer: function() {
        return serializer;
    },
    storageClient: function() {
        return storageClient;
    },
    validate: function() {
        return validate;
    }
});
module.exports = __toCommonJS(utils_exports);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
    deepMerge: deepMerge,
    generateShortId: generateShortId,
    generateSlug: generateSlug,
    isJson: isJson,
    regexSearchMapper: regexSearchMapper,
    removeAccent: removeAccent,
    serializer: serializer,
    storageClient: storageClient,
    validate: validate
});
