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
function _instanceof(left, right) {
    if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {
        return !!right[Symbol.hasInstance](left);
    } else {
        return left instanceof right;
    }
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
// src/react/apollo-client.tsx
var apollo_client_exports = {};
__export(apollo_client_exports, {
    ApolloProvider: function() {
        return ApolloProvider;
    }
});
module.exports = __toCommonJS(apollo_client_exports);
var import_client = require("@apollo/client");
var import_error = require("@apollo/client/link/error");
var import_subscriptions = require("@apollo/client/link/subscriptions");
var import_utilities = require("@apollo/client/utilities");
var import_graphql_ws = require("graphql-ws");
var import_jsx_runtime = require("react/jsx-runtime");
function createLinks(options) {
    var errorLink = (0, import_error.onError)(function(param) {
        var graphQLErrors = param.graphQLErrors, networkError = param.networkError;
        graphQLErrors === null || graphQLErrors === void 0 ? void 0 : graphQLErrors.forEach(function(param) {
            var message = param.message, locations = param.locations, path = param.path;
            return console.error("[GraphQL error]: Message: ".concat(message, ", Location: ").concat(locations, ", Path: ").concat(path));
        });
        if (networkError) {
            console.error("[Network error]: ".concat(networkError));
        }
    });
    var httpLink = new import_client.HttpLink({
        uri: options === null || options === void 0 ? void 0 : options.uri,
        credentials: "include"
    });
    var wsLink = (options === null || options === void 0 ? void 0 : options.wsUrl) ? new import_subscriptions.GraphQLWsLink((0, import_graphql_ws.createClient)({
        url: options.wsUrl
    })) : null;
    var splitLink = wsLink ? (0, import_client.split)(function(param) {
        var query = param.query;
        var mainDefinition = (0, import_utilities.getMainDefinition)(query);
        if (mainDefinition.kind === "OperationDefinition") {
            var operation = mainDefinition.operation;
            return operation === "subscription";
        }
        return false;
    }, wsLink, httpLink) : httpLink;
    var cleanTypeName = new import_client.ApolloLink(function(operation, forward) {
        if (operation.variables) {
            operation.variables = JSON.parse(JSON.stringify(operation.variables), function(key, value) {
                return key === "__typename" ? void 0 : value;
            });
        }
        return forward(operation);
    });
    return {
        errorLink: errorLink,
        httpLink: httpLink,
        wsLink: wsLink,
        splitLink: splitLink,
        cleanTypeName: cleanTypeName
    };
}
function ApolloProvider(param) {
    var isNextJS = param.isNextJS, options = param.options, children = param.children, CustomClient = param.client, CustomProvider = param.provider, CustomCache = param.cache;
    var Client = CustomClient !== null && CustomClient !== void 0 ? CustomClient : import_client.ApolloClient;
    if (typeof Client !== "function") {
        throw new TypeError("Invalid ApolloClient provided. Ensure CustomClient is a class.");
    }
    var Provider = CustomProvider || import_client.ApolloProvider;
    var Cache = CustomCache || import_client.InMemoryCache;
    var _createLinks = createLinks(options), cleanTypeName = _createLinks.cleanTypeName, errorLink = _createLinks.errorLink, splitLink = _createLinks.splitLink;
    var client = new Client(_object_spread({
        cache: _instanceof(Cache, import_client.InMemoryCache) ? Cache : new import_client.InMemoryCache(),
        link: import_client.ApolloLink.from([
            cleanTypeName,
            errorLink,
            splitLink
        ].filter(Boolean))
    }, options));
    if (isNextJS) {
        return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Provider, {
            makeClient: function() {
                return client;
            },
            children: children
        });
    }
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Provider, {
        client: client,
        children: children
    });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
    ApolloProvider: ApolloProvider
});
