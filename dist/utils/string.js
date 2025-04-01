// src/utils/string.ts
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
import cryptoJS from "crypto-js";
import slugifyRaw from "slugify";
var slugify = slugifyRaw.default || slugifyRaw;
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
    return cryptoJS.SHA256(uuid).toString(cryptoJS.enc.Hex).slice(0, length);
}
export { generateShortId, generateSlug };
