// src/configs/graphql/graphql-codegen.ts
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
export { createGraphqlCodegenConfig };
