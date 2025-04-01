// src/utils/validate.ts
function _instanceof(left, right) {
    if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {
        return !!right[Symbol.hasInstance](left);
    } else {
        return left instanceof right;
    }
}
function _type_of(obj) {
    "@swc/helpers - typeof";
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
}
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
export { validate };
