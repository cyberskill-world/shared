// src/utils/serializer.ts
function _instanceof(left, right) {
    if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {
        return !!right[Symbol.hasInstance](left);
    } else {
        return left instanceof right;
    }
}
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
export { serializer };
