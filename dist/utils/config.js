// src/utils/config.ts
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
export { deepMerge };
