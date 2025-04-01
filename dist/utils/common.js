// src/utils/common.ts
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
function _sliced_to_array(arr, i) {
    return _array_with_holes(arr) || _iterable_to_array_limit(arr, i) || _unsupported_iterable_to_array(arr, i) || _non_iterable_rest();
}
function _to_consumable_array(arr) {
    return _array_without_holes(arr) || _iterable_to_array(arr) || _unsupported_iterable_to_array(arr) || _non_iterable_spread();
}
function _unsupported_iterable_to_array(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _array_like_to_array(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _array_like_to_array(o, minLen);
}
import unorm from "unorm";
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
    str = unorm.nfkc(str);
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
export { isJson, regexSearchMapper, removeAccent };
