"use strict";
function _array_like_to_array(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function _array_with_holes(arr) {
    if (Array.isArray(arr)) return arr;
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
function _instanceof(left, right) {
    if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {
        return !!right[Symbol.hasInstance](left);
    } else {
        return left instanceof right;
    }
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
function _sliced_to_array(arr, i) {
    return _array_with_holes(arr) || _iterable_to_array_limit(arr, i) || _unsupported_iterable_to_array(arr, i) || _non_iterable_rest();
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
// src/react/storage.tsx
var storage_exports = {};
__export(storage_exports, {
    useStorage: function() {
        return useStorage;
    }
});
module.exports = __toCommonJS(storage_exports);
var import_react = require("react");
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
    var _ref = _sliced_to_array((0, import_react.useState)(initialValue), 2), value = _ref[0], setValue = _ref[1];
    var _ref1 = _sliced_to_array((0, import_react.useState)(false), 2), isLoaded = _ref1[0], setIsLoaded = _ref1[1];
    (0, import_react.useEffect)(function() {
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
    (0, import_react.useEffect)(function() {
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
    var set = (0, import_react.useCallback)(function(newValue) {
        setValue(function(prev) {
            return typeof newValue === "function" ? newValue(prev) : newValue;
        });
    }, []);
    var remove = (0, import_react.useCallback)(/*#__PURE__*/ _async_to_generator(function() {
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
    useStorage: useStorage
});
