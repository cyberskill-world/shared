// src/configs/eslint/base.ts
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
import * as globals from "globals";
var base_default = [
    {
        languageOptions: {
            globals: _object_spread({}, globals.node, globals.browser)
        },
        rules: {
            "no-console": "warn",
            "no-debugger": "warn",
            "no-alert": "warn",
            "perfectionist/sort-imports": [
                "error",
                {
                    internalPattern: [
                        "^#.*",
                        "^@/.*"
                    ]
                }
            ]
        }
    }
];
export { base_default as default };
