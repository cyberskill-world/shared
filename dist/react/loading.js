// src/react/loading.tsx
function _array_like_to_array(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function _array_with_holes(arr) {
    if (Array.isArray(arr)) return arr;
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
function _sliced_to_array(arr, i) {
    return _array_with_holes(arr) || _iterable_to_array_limit(arr, i) || _unsupported_iterable_to_array(arr, i) || _non_iterable_rest();
}
function _unsupported_iterable_to_array(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _array_like_to_array(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _array_like_to_array(o, minLen);
}
import cn from "classnames";
import { createContext, use, useCallback, useMemo, useState } from "react";
import styles from "./loading.module.scss";
import { jsx, jsxs } from "react/jsx-runtime";
var LoadingContext = createContext(void 0);
function useLoading() {
    var context = use(LoadingContext);
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
        return /* @__PURE__ */ jsxs("div", _object_spread_props(_object_spread({
            className: styles.container
        }, rest), {
            children: [
                /* @__PURE__ */ jsx("div", {
                    className: styles.ring
                }),
                /* @__PURE__ */ jsx("div", {
                    className: styles.ring
                }),
                /* @__PURE__ */ jsx("div", {
                    className: styles.ring
                }),
                /* @__PURE__ */ jsx("div", {
                    className: styles.ring
                }),
                message && /* @__PURE__ */ jsx("div", {
                    className: styles.message,
                    children: message
                })
            ]
        }));
    }
    if (full) {
        return /* @__PURE__ */ jsx("div", {
            className: cn(styles.fullscreen, className),
            children: _renderLoading()
        });
    } else if (block) {
        return /* @__PURE__ */ jsx("div", {
            className: cn(styles.block, className),
            children: _renderLoading()
        });
    }
    return _renderLoading();
}
function LoadingProvider(param) {
    var children = param.children;
    var _useState = _sliced_to_array(useState(false), 2), isLoading = _useState[0], setIsLoading = _useState[1];
    var _useState1 = _sliced_to_array(useState(false), 2), isGlobalLoading = _useState1[0], setIsGlobalLoading = _useState1[1];
    var showLoading = useCallback(function() {
        var global = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : false;
        setIsLoading(true);
        setIsGlobalLoading(global);
    }, []);
    var hideLoading = useCallback(function() {
        setIsLoading(false);
        setIsGlobalLoading(false);
    }, []);
    var contextValue = useMemo(function() {
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
    return /* @__PURE__ */ jsx(LoadingContext, {
        value: contextValue,
        children: isLoading ? /* @__PURE__ */ jsx(Loading, {
            full: isGlobalLoading
        }) : children
    });
}
export { Loading, LoadingContext, LoadingProvider, useLoading };
