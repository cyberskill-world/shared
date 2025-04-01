"use strict";
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
function _type_of(obj) {
    "@swc/helpers - typeof";
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
}
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = function(mod) {
    return __copyProps(__defProp({}, "__esModule", {
        value: true
    }), mod);
};
// src/configs/graphql/index.ts
var graphql_exports = {};
__export(graphql_exports, {
    createGraphqlCodegenConfig: function() {
        return createGraphqlCodegenConfig;
    }
});
module.exports = __toCommonJS(graphql_exports);
// src/configs/graphql/graphql-codegen.ts
function createGraphqlCodegenConfig(param) {
    var uri = param.uri, from = param.from, to = param.to, withComponent = param.withComponent, withHOC = param.withHOC, withHooks = param.withHooks, withMutationFn = param.withMutationFn, withRefetchFn = param.withRefetchFn;
    var configOptions = _object_spread({}, withComponent && {
        withComponent: withComponent
    }, withHOC && {
        withHOC: withHOC
    }, withHooks && {
        withHooks: withHooks
    }, withMutationFn && {
        withMutationFn: withMutationFn
    }, withRefetchFn && {
        withRefetchFn: withRefetchFn
    });
    return {
        schema: uri,
        documents: [
            from
        ],
        generates: _define_property({}, to, _object_spread({
            plugins: [
                "typescript",
                "typescript-operations",
                "typescript-react-apollo"
            ]
        }, Object.keys(configOptions).length > 0 && {
            config: configOptions
        })),
        hooks: {
            afterAllFileWrite: [
                "pnpm exec cyberskill lint:fix"
            ]
        }
    };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
    createGraphqlCodegenConfig: createGraphqlCodegenConfig
});
