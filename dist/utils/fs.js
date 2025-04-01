// src/utils/fs.ts
function _type_of(obj) {
    "@swc/helpers - typeof";
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
}
import * as fs from "node:fs";
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
export { appendFileSync2 as appendFileSync, existsSync2 as existsSync, readFileSync2 as readFileSync, writeFileSync2 as writeFileSync };
