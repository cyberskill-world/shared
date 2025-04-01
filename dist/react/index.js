// src/react/apollo-client.tsx
function _array_like_to_array(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function _array_with_holes(arr) {
    if (Array.isArray(arr)) return arr;
}
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
        var info = gen[key](arg);
        var value = info.value;
    } catch (error) {
        reject(error);
        return;
    }
    if (info.done) {
        resolve(value);
    } else {
        Promise.resolve(value).then(_next, _throw);
    }
}
function _async_to_generator(fn) {
    return function() {
        var self = this, args = arguments;
        return new Promise(function(resolve, reject) {
            var gen = fn.apply(self, args);
            function _next(value) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
            }
            function _throw(err) {
                asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
            }
            _next(undefined);
        });
    };
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
function _instanceof(left, right) {
    if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {
        return !!right[Symbol.hasInstance](left);
    } else {
        return left instanceof right;
    }
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
function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        if (enumerableOnly) {
            symbols = symbols.filter(function(sym) {
                return Object.getOwnPropertyDescriptor(object, sym).enumerable;
            });
        }
        keys.push.apply(keys, symbols);
    }
    return keys;
}
function _object_spread_props(target, source) {
    source = source != null ? source : {};
    if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
        ownKeys(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
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
function _sliced_to_array(arr, i) {
    return _array_with_holes(arr) || _iterable_to_array_limit(arr, i) || _unsupported_iterable_to_array(arr, i) || _non_iterable_rest();
}
function _unsupported_iterable_to_array(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _array_like_to_array(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _array_like_to_array(o, minLen);
}
function _ts_generator(thisArg, body) {
    var f, y, t, g, _ = {
        label: 0,
        sent: function() {
            if (t[0] & 1) throw t[1];
            return t[1];
        },
        trys: [],
        ops: []
    };
    return g = {
        next: verb(0),
        "throw": verb(1),
        "return": verb(2)
    }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
        return this;
    }), g;
    function verb(n) {
        return function(v) {
            return step([
                n,
                v
            ]);
        };
    }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while(_)try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [
                op[0] & 2,
                t.value
            ];
            switch(op[0]){
                case 0:
                case 1:
                    t = op;
                    break;
                case 4:
                    _.label++;
                    return {
                        value: op[1],
                        done: false
                    };
                case 5:
                    _.label++;
                    y = op[1];
                    op = [
                        0
                    ];
                    continue;
                case 7:
                    op = _.ops.pop();
                    _.trys.pop();
                    continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                        _ = 0;
                        continue;
                    }
                    if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                        _.label = op[1];
                        break;
                    }
                    if (op[0] === 6 && _.label < t[1]) {
                        _.label = t[1];
                        t = op;
                        break;
                    }
                    if (t && _.label < t[2]) {
                        _.label = t[2];
                        _.ops.push(op);
                        break;
                    }
                    if (t[2]) _.ops.pop();
                    _.trys.pop();
                    continue;
            }
            op = body.call(thisArg, _);
        } catch (e) {
            op = [
                6,
                e
            ];
            y = 0;
        } finally{
            f = t = 0;
        }
        if (op[0] & 5) throw op[1];
        return {
            value: op[0] ? op[1] : void 0,
            done: true
        };
    }
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
// src/react/loading.tsx
import cn from "classnames";
import { createContext, use, useCallback, useMemo, useState } from "react";
import styles from "./loading.module.scss";
import { jsx as jsx2, jsxs } from "react/jsx-runtime";
var LoadingContext = createContext(void 0);
function useLoading() {
    var context = use(LoadingContext);
    if (!context) {
        throw new Error("useLoading must be used within a LoadingProvider");
    }
    return context;
}
function Loading(_param) {
    var _param_full = _param.full, full = _param_full === void 0 ? false : _param_full, _param_block = _param.block, block = _param_block === void 0 ? false : _param_block, _param_className = _param.className, className = _param_className === void 0 ? "" : _param_className, _param_message = _param.message, message = _param_message === void 0 ? "Loading" : _param_message, rest = _object_without_properties(_param, [
        "full",
        "block",
        "className",
        "message"
    ]);
    function _renderLoading() {
        return /* @__PURE__ */ jsxs("div", _object_spread_props(_object_spread({
            className: styles.container
        }, rest), {
            children: [
                /* @__PURE__ */ jsx2("div", {
                    className: styles.ring
                }),
                /* @__PURE__ */ jsx2("div", {
                    className: styles.ring
                }),
                /* @__PURE__ */ jsx2("div", {
                    className: styles.ring
                }),
                /* @__PURE__ */ jsx2("div", {
                    className: styles.ring
                }),
                message && /* @__PURE__ */ jsx2("div", {
                    className: styles.message,
                    children: message
                })
            ]
        }));
    }
    if (full) {
        return /* @__PURE__ */ jsx2("div", {
            className: cn(styles.fullscreen, className),
            children: _renderLoading()
        });
    } else if (block) {
        return /* @__PURE__ */ jsx2("div", {
            className: cn(styles.block, className),
            children: _renderLoading()
        });
    }
    return _renderLoading();
}
function LoadingProvider(param) {
    var children = param.children;
    var _useState = _sliced_to_array(useState(false), 2), isLoading = _useState[0], setIsLoading = _useState[1];
    var _useState1 = _sliced_to_array(useState(false), 2), isGlobalLoading = _useState1[0], setIsGlobalLoading = _useState1[1];
    var showLoading = useCallback(function() {
        var global = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : false;
        setIsLoading(true);
        setIsGlobalLoading(global);
    }, []);
    var hideLoading = useCallback(function() {
        setIsLoading(false);
        setIsGlobalLoading(false);
    }, []);
    var contextValue = useMemo(function() {
        return {
            isLoading: isLoading,
            isGlobalLoading: isGlobalLoading,
            showLoading: showLoading,
            hideLoading: hideLoading
        };
    }, [
        isLoading,
        isGlobalLoading,
        showLoading,
        hideLoading
    ]);
    return /* @__PURE__ */ jsx2(LoadingContext, {
        value: contextValue,
        children: isLoading ? /* @__PURE__ */ jsx2(Loading, {
            full: isGlobalLoading
        }) : children
    });
}
// src/react/next-intl.tsx
import { NextIntlClientProvider, useTranslations } from "next-intl";
import { createContext as createContext2, use as use2, useMemo as useMemo2 } from "react";
// src/react/storage.tsx
import { useCallback as useCallback2, useEffect, useState as useState2 } from "react";
// src/utils/serializer.ts
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
// src/utils/storage-client.ts
import localForage from "localforage";
var storageClient = {
    get: function get(key) {
        return _async_to_generator(function() {
            var error;
            return _ts_generator(this, function(_state) {
                switch(_state.label){
                    case 0:
                        _state.trys.push([
                            0,
                            2,
                            ,
                            3
                        ]);
                        return [
                            4,
                            localForage.getItem(key)
                        ];
                    case 1:
                        return [
                            2,
                            _state.sent()
                        ];
                    case 2:
                        error = _state.sent();
                        console.error('❌ [Storage:get] Error getting key "'.concat(key, '":'), error);
                        return [
                            2,
                            null
                        ];
                    case 3:
                        return [
                            2
                        ];
                }
            });
        })();
    },
    set: function set(key, value) {
        return _async_to_generator(function() {
            var error;
            return _ts_generator(this, function(_state) {
                switch(_state.label){
                    case 0:
                        _state.trys.push([
                            0,
                            2,
                            ,
                            3
                        ]);
                        return [
                            4,
                            localForage.setItem(key, value)
                        ];
                    case 1:
                        _state.sent();
                        return [
                            3,
                            3
                        ];
                    case 2:
                        error = _state.sent();
                        console.error('❌ [Storage:set] Error setting key "'.concat(key, '":'), error);
                        return [
                            3,
                            3
                        ];
                    case 3:
                        return [
                            2
                        ];
                }
            });
        })();
    },
    remove: function remove(key) {
        return _async_to_generator(function() {
            var error;
            return _ts_generator(this, function(_state) {
                switch(_state.label){
                    case 0:
                        _state.trys.push([
                            0,
                            2,
                            ,
                            3
                        ]);
                        return [
                            4,
                            localForage.removeItem(key)
                        ];
                    case 1:
                        _state.sent();
                        return [
                            3,
                            3
                        ];
                    case 2:
                        error = _state.sent();
                        console.error('❌ [Storage:remove] Error removing key "'.concat(key, '":'), error);
                        return [
                            3,
                            3
                        ];
                    case 3:
                        return [
                            2
                        ];
                }
            });
        })();
    },
    keys: function keys() {
        return _async_to_generator(function() {
            var keys, error;
            return _ts_generator(this, function(_state) {
                switch(_state.label){
                    case 0:
                        _state.trys.push([
                            0,
                            2,
                            ,
                            3
                        ]);
                        return [
                            4,
                            localForage.keys()
                        ];
                    case 1:
                        keys = _state.sent();
                        return [
                            2,
                            keys !== null && keys !== void 0 ? keys : []
                        ];
                    case 2:
                        error = _state.sent();
                        console.error("❌ [Storage:keys] Error getting keys:", error);
                        return [
                            2,
                            []
                        ];
                    case 3:
                        return [
                            2
                        ];
                }
            });
        })();
    }
};
// src/react/storage.tsx
function useStorage(key, initialValue) {
    var serializer2 = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : serializer;
    var _useState2 = _sliced_to_array(useState2(initialValue), 2), value = _useState2[0], setValue = _useState2[1];
    var _useState21 = _sliced_to_array(useState2(false), 2), isLoaded = _useState21[0], setIsLoaded = _useState21[1];
    useEffect(function() {
        var isMounted = true;
        var loadValue = /*#__PURE__*/ function() {
            var _ref = _async_to_generator(function() {
                var valueFound, parsedValue, serialized, error;
                return _ts_generator(this, function(_state) {
                    switch(_state.label){
                        case 0:
                            _state.trys.push([
                                0,
                                6,
                                7,
                                8
                            ]);
                            return [
                                4,
                                storageClient.get(key)
                            ];
                        case 1:
                            valueFound = _state.sent();
                            if (!isMounted) return [
                                3,
                                5
                            ];
                            if (!(valueFound !== null)) return [
                                3,
                                2
                            ];
                            parsedValue = serializer2.deserialize(valueFound);
                            setValue(parsedValue);
                            return [
                                3,
                                5
                            ];
                        case 2:
                            if (!(initialValue !== void 0)) return [
                                3,
                                4
                            ];
                            serialized = serializer2.serialize(initialValue);
                            return [
                                4,
                                storageClient.set(key, serialized)
                            ];
                        case 3:
                            _state.sent();
                            setValue(initialValue);
                            return [
                                3,
                                5
                            ];
                        case 4:
                            setValue(void 0);
                            _state.label = 5;
                        case 5:
                            return [
                                3,
                                8
                            ];
                        case 6:
                            error = _state.sent();
                            console.error('Error loading value for key "'.concat(key, '":'), error);
                            if (isMounted) {
                                setValue(initialValue);
                            }
                            return [
                                3,
                                8
                            ];
                        case 7:
                            if (isMounted) setIsLoaded(true);
                            return [
                                7
                            ];
                        case 8:
                            return [
                                2
                            ];
                    }
                });
            });
            return function loadValue() {
                return _ref.apply(this, arguments);
            };
        }();
        loadValue();
        return function() {
            isMounted = false;
            setIsLoaded(false);
        };
    }, [
        key,
        initialValue,
        serializer2
    ]);
    useEffect(function() {
        if (!isLoaded) return;
        var saveValue = /*#__PURE__*/ function() {
            var _ref = _async_to_generator(function() {
                var serialized, error;
                return _ts_generator(this, function(_state) {
                    switch(_state.label){
                        case 0:
                            _state.trys.push([
                                0,
                                3,
                                ,
                                4
                            ]);
                            if (!(value !== void 0)) return [
                                3,
                                2
                            ];
                            serialized = serializer2.serialize(value);
                            return [
                                4,
                                storageClient.set(key, serialized)
                            ];
                        case 1:
                            _state.sent();
                            _state.label = 2;
                        case 2:
                            return [
                                3,
                                4
                            ];
                        case 3:
                            error = _state.sent();
                            console.error('Error saving value for key "'.concat(key, '":'), error);
                            return [
                                3,
                                4
                            ];
                        case 4:
                            return [
                                2
                            ];
                    }
                });
            });
            return function saveValue() {
                return _ref.apply(this, arguments);
            };
        }();
        saveValue();
    }, [
        value,
        key,
        serializer2,
        isLoaded
    ]);
    var set = useCallback2(function(newValue) {
        setValue(function(prev) {
            return typeof newValue === "function" ? newValue(prev) : newValue;
        });
    }, []);
    var remove = useCallback2(/*#__PURE__*/ _async_to_generator(function() {
        var error;
        return _ts_generator(this, function(_state) {
            switch(_state.label){
                case 0:
                    _state.trys.push([
                        0,
                        2,
                        ,
                        3
                    ]);
                    return [
                        4,
                        storageClient.remove(key)
                    ];
                case 1:
                    _state.sent();
                    setValue(void 0);
                    return [
                        3,
                        3
                    ];
                case 2:
                    error = _state.sent();
                    console.error('Error removing key "'.concat(key, '":'), error);
                    return [
                        3,
                        3
                    ];
                case 3:
                    return [
                        2
                    ];
            }
        });
    }), [
        key
    ]);
    return {
        value: value,
        set: set,
        remove: remove
    };
}
// src/react/next-intl.tsx
import { Fragment, jsx as jsx3 } from "react/jsx-runtime";
var NextIntlContext = createContext2(void 0);
function useNextIntl() {
    var context = use2(NextIntlContext);
    if (!context) {
        throw new Error("useNextIntl must be used within a NextIntlProvider");
    }
    return context;
}
var useTranslateNextIntl = useTranslations;
function withNextIntl(Component) {
    var PageWithI18n = function(props) {
        var _languages_find;
        var currentLanguage = useNextIntl().currentLanguage;
        var messages = props.messages, languages = props.languages;
        var defaultLang = "en";
        var defaultMessages = messages[(currentLanguage === null || currentLanguage === void 0 ? void 0 : currentLanguage.value) || defaultLang];
        var timeZone = (_languages_find = languages.find(function(lang) {
            return lang.value === (currentLanguage === null || currentLanguage === void 0 ? void 0 : currentLanguage.value);
        })) === null || _languages_find === void 0 ? void 0 : _languages_find.timezone;
        if (!messages) {
            console.warn("Missing messages for language: ".concat((currentLanguage === null || currentLanguage === void 0 ? void 0 : currentLanguage.value) || defaultLang));
            return null;
        }
        return /* @__PURE__ */ jsx3(NextIntlClientProvider, {
            locale: (currentLanguage === null || currentLanguage === void 0 ? void 0 : currentLanguage.value) || defaultLang,
            messages: defaultMessages,
            timeZone: timeZone,
            children: /* @__PURE__ */ jsx3(Component, _object_spread({}, props))
        });
    };
    PageWithI18n.displayName = "withNextIntl(".concat(Component.displayName || Component.name || "Component", ")");
    return PageWithI18n;
}
function LanguageWrapperBase(param) {
    var children = param.children;
    return /* @__PURE__ */ jsx3(Fragment, {
        children: children
    });
}
var LanguageWrapper = withNextIntl(LanguageWrapperBase);
function NextIntlProvider(param) {
    var children = param.children, languages = param.languages, messages = param.messages;
    var _languages_;
    var _useStorage = useStorage("lang", (_languages_ = languages === null || languages === void 0 ? void 0 : languages[0]) !== null && _languages_ !== void 0 ? _languages_ : {}), value = _useStorage.value, set = _useStorage.set;
    var contextValue = useMemo2(function() {
        return {
            languages: languages,
            currentLanguage: value,
            setCurrentLanguage: set
        };
    }, [
        languages,
        set,
        value
    ]);
    return /* @__PURE__ */ jsx3(NextIntlContext, {
        value: contextValue,
        children: /* @__PURE__ */ jsx3(LanguageWrapper, {
            languages: languages,
            messages: messages,
            children: children
        })
    });
}
export { ApolloProvider, Loading, LoadingContext, LoadingProvider, NextIntlContext, NextIntlProvider, useLoading, useNextIntl, useStorage, useTranslateNextIntl, withNextIntl };
