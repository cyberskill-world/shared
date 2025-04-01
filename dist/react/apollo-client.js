// src/react/apollo-client.tsx
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
import { ApolloClient, ApolloLink, ApolloProvider as ApolloProviderDefault, HttpLink, InMemoryCache, split } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { getMainDefinition } from "@apollo/client/utilities";
import { createClient as createGraphqlWebSocketClient } from "graphql-ws";
import { jsx } from "react/jsx-runtime";
function createLinks(options) {
    var errorLink = onError(function(param) {
        var graphQLErrors = param.graphQLErrors, networkError = param.networkError;
        graphQLErrors === null || graphQLErrors === void 0 ? void 0 : graphQLErrors.forEach(function(param) {
            var message = param.message, locations = param.locations, path = param.path;
            return console.error("[GraphQL error]: Message: ".concat(message, ", Location: ").concat(locations, ", Path: ").concat(path));
        });
        if (networkError) {
            console.error("[Network error]: ".concat(networkError));
        }
    });
    var httpLink = new HttpLink({
        uri: options === null || options === void 0 ? void 0 : options.uri,
        credentials: "include"
    });
    var wsLink = (options === null || options === void 0 ? void 0 : options.wsUrl) ? new GraphQLWsLink(createGraphqlWebSocketClient({
        url: options.wsUrl
    })) : null;
    var splitLink = wsLink ? split(function(param) {
        var query = param.query;
        var mainDefinition = getMainDefinition(query);
        if (mainDefinition.kind === "OperationDefinition") {
            var operation = mainDefinition.operation;
            return operation === "subscription";
        }
        return false;
    }, wsLink, httpLink) : httpLink;
    var cleanTypeName = new ApolloLink(function(operation, forward) {
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
    var Client = CustomClient !== null && CustomClient !== void 0 ? CustomClient : ApolloClient;
    if (typeof Client !== "function") {
        throw new TypeError("Invalid ApolloClient provided. Ensure CustomClient is a class.");
    }
    var Provider = CustomProvider || ApolloProviderDefault;
    var Cache = CustomCache || InMemoryCache;
    var _createLinks = createLinks(options), cleanTypeName = _createLinks.cleanTypeName, errorLink = _createLinks.errorLink, splitLink = _createLinks.splitLink;
    var client = new Client(_object_spread({
        cache: _instanceof(Cache, InMemoryCache) ? Cache : new InMemoryCache(),
        link: ApolloLink.from([
            cleanTypeName,
            errorLink,
            splitLink
        ].filter(Boolean))
    }, options));
    if (isNextJS) {
        return /* @__PURE__ */ jsx(Provider, {
            makeClient: function() {
                return client;
            },
            children: children
        });
    }
    return /* @__PURE__ */ jsx(Provider, {
        client: client,
        children: children
    });
}
export { ApolloProvider };
