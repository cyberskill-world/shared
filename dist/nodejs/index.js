// src/nodejs/mongo.ts
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
function _class_call_check(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}
function _defineProperties(target, props) {
    for(var i = 0; i < props.length; i++){
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}
function _create_class(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
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
function _type_of(obj) {
    "@swc/helpers - typeof";
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
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
import { format } from "date-fns";
import { Document } from "mongoose";
import aggregatePaginate from "mongoose-aggregate-paginate-v2";
import mongoosePaginate from "mongoose-paginate-v2";
import { v4 as uuidv4 } from "uuid";
// src/constants/response-status.ts
var RESPONSE_STATUS = {
    GRAPHQL_PARSE_FAILED: {
        CODE: "GRAPHQL_PARSE_FAILED",
        MESSAGE: "The GraphQL operation string contains a syntax error."
    },
    GRAPHQL_VALIDATION_FAILED: {
        CODE: "GRAPHQL_VALIDATION_FAILED",
        MESSAGE: "The GraphQL operation is not valid against the server's schema."
    },
    BAD_USER_INPUT: {
        CODE: "BAD_USER_INPUT",
        MESSAGE: "The GraphQL operation includes an invalid value for a field argument."
    },
    PERSISTED_QUERY_NOT_FOUND: {
        CODE: "PERSISTED_QUERY_NOT_FOUND",
        MESSAGE: "A client sent the hash of a query string to execute via automatic persisted queries, but the query was not in the APQ cache."
    },
    PERSISTED_QUERY_NOT_SUPPORTED: {
        CODE: "PERSISTED_QUERY_NOT_SUPPORTED",
        MESSAGE: "A client sent the hash of a query string to execute via automatic persisted queries, but the server has disabled APQ."
    },
    OPERATION_RESOLUTION_FAILURE: {
        CODE: "OPERATION_RESOLUTION_FAILURE",
        MESSAGE: "The request was parsed successfully and is valid against the server's schema, but the server couldn't resolve which operation to run. This occurs when a request containing multiple named operations doesn't specify which operation to run (i.e.,operationName), or if the named operation isn't included in the request."
    },
    CONTINUE: {
        CODE: 100,
        MESSAGE: "Continue"
    },
    SWITCHING_PROTOCOLS: {
        CODE: 101,
        MESSAGE: "Switching Protocols"
    },
    PROCESSING: {
        CODE: 102,
        MESSAGE: "Processing"
    },
    OK: {
        CODE: 200,
        MESSAGE: "OK"
    },
    CREATED: {
        CODE: 201,
        MESSAGE: "Created"
    },
    ACCEPTED: {
        CODE: 202,
        MESSAGE: "Accepted"
    },
    NON_AUTHORITATIVE_INFORMATION: {
        CODE: 203,
        MESSAGE: "Non Authoritative Information"
    },
    NO_CONTENT: {
        CODE: 204,
        MESSAGE: "No Content"
    },
    RESET_CONTENT: {
        CODE: 205,
        MESSAGE: "Reset Content"
    },
    PARTIAL_CONTENT: {
        CODE: 206,
        MESSAGE: "Partial Content"
    },
    MULTI_STATUS: {
        CODE: 207,
        MESSAGE: "Multi-Status"
    },
    MULTIPLE_CHOICES: {
        CODE: 300,
        MESSAGE: "Multiple Choices"
    },
    MOVED_PERMANENTLY: {
        CODE: 301,
        MESSAGE: "Moved Permanently"
    },
    MOVED_TEMPORARILY: {
        CODE: 302,
        MESSAGE: "Moved Temporarily"
    },
    SEE_OTHER: {
        CODE: 303,
        MESSAGE: "See Other"
    },
    NOT_MODIFIED: {
        CODE: 304,
        MESSAGE: "Not Modified"
    },
    USE_PROXY: {
        CODE: 305,
        MESSAGE: "Use Proxy"
    },
    TEMPORARY_REDIRECT: {
        CODE: 307,
        MESSAGE: "Temporary Redirect"
    },
    PERMANENT_REDIRECT: {
        CODE: 308,
        MESSAGE: "Permanent Redirect"
    },
    BAD_REQUEST: {
        CODE: 400,
        MESSAGE: "Bad Request"
    },
    UNAUTHORIZED: {
        CODE: 401,
        MESSAGE: "Unauthorized"
    },
    PAYMENT_REQUIRED: {
        CODE: 402,
        MESSAGE: "Payment Required"
    },
    FORBIDDEN: {
        CODE: 403,
        MESSAGE: "Forbidden"
    },
    NOT_FOUND: {
        CODE: 404,
        MESSAGE: "Not Found"
    },
    METHOD_NOT_ALLOWED: {
        CODE: 405,
        MESSAGE: "Method Not Allowed"
    },
    NOT_ACCEPTABLE: {
        CODE: 406,
        MESSAGE: "Not Acceptable"
    },
    PROXY_AUTHENTICATION_REQUIRED: {
        CODE: 407,
        MESSAGE: "Proxy Authentication Required"
    },
    REQUEST_TIMEOUT: {
        CODE: 408,
        MESSAGE: "Request Timeout"
    },
    CONFLICT: {
        CODE: 409,
        MESSAGE: "Conflict"
    },
    GONE: {
        CODE: 410,
        MESSAGE: "Gone"
    },
    LENGTH_REQUIRED: {
        CODE: 411,
        MESSAGE: "Length Required"
    },
    PRECONDITION_FAILED: {
        CODE: 412,
        MESSAGE: "Precondition Failed"
    },
    REQUEST_TOO_LONG: {
        CODE: 413,
        MESSAGE: "Request Entity Too Large"
    },
    REQUEST_URI_TOO_LONG: {
        CODE: 414,
        MESSAGE: "Request-URI Too Long"
    },
    UNSUPPORTED_MEDIA_TYPE: {
        CODE: 415,
        MESSAGE: "Unsupported Media Type"
    },
    REQUESTED_RANGE_NOT_SATISFIABLE: {
        CODE: 416,
        MESSAGE: "Requested Range Not Satisfiable"
    },
    EXPECTATION_FAILED: {
        CODE: 417,
        MESSAGE: "Expectation Failed"
    },
    IM_A_TEAPOT: {
        CODE: 418,
        MESSAGE: "I'm a teapot"
    },
    INSUFFICIENT_SPACE_ON_RESOURCE: {
        CODE: 419,
        MESSAGE: "Insufficient Space on Resource"
    },
    METHOD_FAILURE: {
        CODE: 420,
        MESSAGE: "Method Failure"
    },
    MISDIRECTED_REQUEST: {
        CODE: 421,
        MESSAGE: "Misdirected Request"
    },
    UNPROCESSABLE_ENTITY: {
        CODE: 422,
        MESSAGE: "Unprocessable Entity"
    },
    LOCKED: {
        CODE: 423,
        MESSAGE: "Locked"
    },
    FAILED_DEPENDENCY: {
        CODE: 424,
        MESSAGE: "Failed Dependency"
    },
    PRECONDITION_REQUIRED: {
        CODE: 428,
        MESSAGE: "Precondition Required"
    },
    TOO_MANY_REQUESTS: {
        CODE: 429,
        MESSAGE: "Too Many Requests"
    },
    REQUEST_HEADER_FIELDS_TOO_LARGE: {
        CODE: 431,
        MESSAGE: "Request Header Fields Too Large"
    },
    UNAVAILABLE_FOR_LEGAL_REASONS: {
        CODE: 451,
        MESSAGE: "Unavailable For Legal Reasons"
    },
    INTERNAL_SERVER_ERROR: {
        CODE: 500,
        MESSAGE: "Internal Server Error"
    },
    NOT_IMPLEMENTED: {
        CODE: 501,
        MESSAGE: "Not Implemented"
    },
    BAD_GATEWAY: {
        CODE: 502,
        MESSAGE: "Bad Gateway"
    },
    SERVICE_UNAVAILABLE: {
        CODE: 503,
        MESSAGE: "Service Unavailable"
    },
    GATEWAY_TIMEOUT: {
        CODE: 504,
        MESSAGE: "Gateway Timeout"
    },
    HTTP_VERSION_NOT_SUPPORTED: {
        CODE: 505,
        MESSAGE: "HTTP Version Not Supported"
    },
    INSUFFICIENT_STORAGE: {
        CODE: 507,
        MESSAGE: "Insufficient Storage"
    },
    NETWORK_AUTHENTICATION_REQUIRED: {
        CODE: 511,
        MESSAGE: "Network Authentication Required"
    }
};
// src/utils/string.ts
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
// src/utils/validate.ts
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
// src/nodejs/mongo.ts
var mongo = {
    getDateTime: function getDateTime() {
        var now = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : /* @__PURE__ */ new Date();
        return format(now, "yyyy-MM-dd HH:mm:ss.SSS");
    },
    createGenericFields: function createGenericFields() {
        var _ref = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, _ref_returnDateAs = _ref.returnDateAs, returnDateAs = _ref_returnDateAs === void 0 ? "string" : _ref_returnDateAs;
        var now = returnDateAs === "string" ? mongo.getDateTime() : /* @__PURE__ */ new Date();
        return {
            id: uuidv4(),
            isDel: false,
            createdAt: now,
            updatedAt: now
        };
    },
    applyPlugins: function applyPlugins(schema, plugins) {
        plugins.filter(function(plugin) {
            return typeof plugin === "function";
        }).forEach(function(plugin) {
            return schema.plugin(plugin);
        });
    },
    applyMiddlewares: function applyMiddlewares(schema, middlewares) {
        middlewares.forEach(function(param) {
            var method = param.method, pre = param.pre, post = param.post;
            if (method && pre) {
                schema.pre(method, pre);
            }
            if (method && post) {
                schema.post(method, post);
            }
        });
    },
    createGenericSchema: function createGenericSchema(mongoose) {
        return new mongoose.Schema({
            id: {
                type: String,
                default: uuidv4,
                required: true,
                unique: true
            },
            isDel: {
                type: Boolean,
                default: false,
                required: true
            }
        }, {
            timestamps: true
        });
    },
    createSchema: function createSchema(param) {
        var mongoose = param.mongoose, schema = param.schema, _param_virtuals = param.virtuals, virtuals = _param_virtuals === void 0 ? [] : _param_virtuals, _param_standalone = param.standalone, standalone = _param_standalone === void 0 ? false : _param_standalone;
        var createdSchema = new mongoose.Schema(schema, {
            strict: true
        });
        virtuals.forEach(function(param) {
            var name = param.name, options = param.options, get = param.get;
            var virtualInstance = createdSchema.virtual(name, options);
            if (get) virtualInstance.get(get);
        });
        if (!standalone) {
            createdSchema.add(mongo.createGenericSchema(mongoose));
        }
        return createdSchema;
    },
    createModel: function createModel(param) {
        var currentMongooseInstance = param.mongoose, name = param.name, schema = param.schema, _param_pagination = param.pagination, pagination = _param_pagination === void 0 ? false : _param_pagination, _param_aggregate = param.aggregate, aggregate = _param_aggregate === void 0 ? false : _param_aggregate, _param_virtuals = param.virtuals, virtuals = _param_virtuals === void 0 ? [] : _param_virtuals, _param_middlewares = param.middlewares, middlewares = _param_middlewares === void 0 ? [] : _param_middlewares;
        if (!name) {
            throw new Error("Model name is required.");
        }
        if (currentMongooseInstance.models[name]) {
            return currentMongooseInstance.models[name];
        }
        var createdSchema = mongo.createSchema({
            mongoose: currentMongooseInstance,
            schema: schema,
            virtuals: virtuals
        });
        mongo.applyPlugins(createdSchema, [
            pagination && mongoosePaginate,
            aggregate && aggregatePaginate
        ]);
        mongo.applyMiddlewares(createdSchema, middlewares);
        return currentMongooseInstance.model(name, createdSchema);
    },
    createSlugQuery: function createSlugQuery(slug) {
        var filters = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, id = arguments.length > 2 ? arguments[2] : void 0;
        return _object_spread_props(_object_spread({}, filters, id && {
            id: {
                $ne: id
            }
        }), {
            $or: [
                {
                    slug: slug
                },
                {
                    slugHistory: slug
                }
            ]
        });
    },
    validator: {
        isEmpty: function isEmpty() {
            return /*#__PURE__*/ function() {
                var _ref = _async_to_generator(function(value) {
                    return _ts_generator(this, function(_state) {
                        return [
                            2,
                            !validate.isEmpty(value)
                        ];
                    });
                });
                return function(value) {
                    return _ref.apply(this, arguments);
                };
            }();
        },
        isUnique: function isUnique(fields) {
            return /*#__PURE__*/ function() {
                var _ref = _async_to_generator(function(value) {
                    var query, existingDocument;
                    return _ts_generator(this, function(_state) {
                        switch(_state.label){
                            case 0:
                                if (!Array.isArray(fields) || fields.length === 0) {
                                    throw new Error("Fields must be a non-empty array of strings.");
                                }
                                query = {
                                    $or: fields.map(function(field) {
                                        return _define_property({}, field, value);
                                    })
                                };
                                return [
                                    4,
                                    this.constructor.findOne(query)
                                ];
                            case 1:
                                existingDocument = _state.sent();
                                return [
                                    2,
                                    !existingDocument
                                ];
                        }
                    });
                });
                return function(value) {
                    return _ref.apply(this, arguments);
                };
            }();
        },
        matchesRegex: function matchesRegex(regexArray) {
            return /*#__PURE__*/ function() {
                var _ref = _async_to_generator(function(value) {
                    return _ts_generator(this, function(_state) {
                        if (!Array.isArray(regexArray) || regexArray.some(function(r) {
                            return !_instanceof(r, RegExp);
                        })) {
                            throw new Error("regexArray must be an array of valid RegExp objects.");
                        }
                        return [
                            2,
                            regexArray.every(function(regex) {
                                return regex.test(value);
                            })
                        ];
                    });
                });
                return function(value) {
                    return _ref.apply(this, arguments);
                };
            }();
        }
    }
};
var MongoController = /*#__PURE__*/ function() {
    "use strict";
    function MongoController(db, collectionName) {
        _class_call_check(this, MongoController);
        this.collection = db.collection(collectionName);
    }
    _create_class(MongoController, [
        {
            key: "createOne",
            value: function createOne(document) {
                var _this = this;
                return _async_to_generator(function() {
                    var finalDocument, result, error;
                    return _ts_generator(this, function(_state) {
                        switch(_state.label){
                            case 0:
                                _state.trys.push([
                                    0,
                                    2,
                                    ,
                                    3
                                ]);
                                finalDocument = _object_spread({}, mongo.createGenericFields(), document);
                                return [
                                    4,
                                    _this.collection.insertOne(finalDocument)
                                ];
                            case 1:
                                result = _state.sent();
                                return [
                                    2,
                                    {
                                        success: true,
                                        message: "Document created successfully",
                                        result: result
                                    }
                                ];
                            case 2:
                                error = _state.sent();
                                return [
                                    2,
                                    {
                                        success: false,
                                        message: error.message
                                    }
                                ];
                            case 3:
                                return [
                                    2
                                ];
                        }
                    });
                })();
            }
        },
        {
            key: "createMany",
            value: function createMany(documents) {
                var _this = this;
                return _async_to_generator(function() {
                    var finalDocuments, result, error;
                    return _ts_generator(this, function(_state) {
                        switch(_state.label){
                            case 0:
                                _state.trys.push([
                                    0,
                                    2,
                                    ,
                                    3
                                ]);
                                finalDocuments = documents.map(function(document) {
                                    return _object_spread({}, mongo.createGenericFields(), document);
                                });
                                return [
                                    4,
                                    _this.collection.insertMany(finalDocuments)
                                ];
                            case 1:
                                result = _state.sent();
                                if (result.insertedCount === 0) {
                                    return [
                                        2,
                                        {
                                            success: false,
                                            message: "No documents were inserted"
                                        }
                                    ];
                                }
                                return [
                                    2,
                                    {
                                        success: true,
                                        message: "".concat(result.insertedCount, " documents created successfully"),
                                        result: result
                                    }
                                ];
                            case 2:
                                error = _state.sent();
                                return [
                                    2,
                                    {
                                        success: false,
                                        message: error.message
                                    }
                                ];
                            case 3:
                                return [
                                    2
                                ];
                        }
                    });
                })();
            }
        },
        {
            key: "findOne",
            value: function findOne(filter) {
                var _this = this;
                return _async_to_generator(function() {
                    var result, error;
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
                                    _this.collection.findOne(filter)
                                ];
                            case 1:
                                result = _state.sent();
                                if (!result) {
                                    return [
                                        2,
                                        {
                                            success: false,
                                            message: "Document not found"
                                        }
                                    ];
                                }
                                return [
                                    2,
                                    {
                                        success: true,
                                        message: "Document found",
                                        result: result
                                    }
                                ];
                            case 2:
                                error = _state.sent();
                                return [
                                    2,
                                    {
                                        success: false,
                                        message: error.message
                                    }
                                ];
                            case 3:
                                return [
                                    2
                                ];
                        }
                    });
                })();
            }
        },
        {
            key: "findAll",
            value: function findAll() {
                var filter = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
                var _this = this;
                return _async_to_generator(function() {
                    var result, error;
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
                                    _this.collection.find(filter).toArray()
                                ];
                            case 1:
                                result = _state.sent();
                                return [
                                    2,
                                    {
                                        success: true,
                                        message: "Documents retrieved successfully",
                                        result: result
                                    }
                                ];
                            case 2:
                                error = _state.sent();
                                return [
                                    2,
                                    {
                                        success: false,
                                        message: error.message
                                    }
                                ];
                            case 3:
                                return [
                                    2
                                ];
                        }
                    });
                })();
            }
        },
        {
            key: "count",
            value: function count() {
                var filter = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
                var _this = this;
                return _async_to_generator(function() {
                    var result, error;
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
                                    _this.collection.countDocuments(filter)
                                ];
                            case 1:
                                result = _state.sent();
                                return [
                                    2,
                                    {
                                        success: true,
                                        message: "Count retrieved successfully",
                                        result: result
                                    }
                                ];
                            case 2:
                                error = _state.sent();
                                return [
                                    2,
                                    {
                                        success: false,
                                        message: error.message
                                    }
                                ];
                            case 3:
                                return [
                                    2
                                ];
                        }
                    });
                })();
            }
        },
        {
            key: "updateOne",
            value: function updateOne(filter, update) {
                var _this = this;
                return _async_to_generator(function() {
                    var result, error;
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
                                    _this.collection.updateOne(filter, {
                                        $set: update
                                    })
                                ];
                            case 1:
                                result = _state.sent();
                                if (result.matchedCount === 0) {
                                    return [
                                        2,
                                        {
                                            success: false,
                                            message: "No documents matched the filter"
                                        }
                                    ];
                                }
                                return [
                                    2,
                                    {
                                        success: true,
                                        message: "Document updated successfully",
                                        result: result
                                    }
                                ];
                            case 2:
                                error = _state.sent();
                                return [
                                    2,
                                    {
                                        success: false,
                                        message: error.message
                                    }
                                ];
                            case 3:
                                return [
                                    2
                                ];
                        }
                    });
                })();
            }
        },
        {
            key: "updateMany",
            value: function updateMany(filter, update) {
                var _this = this;
                return _async_to_generator(function() {
                    var result, error;
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
                                    _this.collection.updateMany(filter, {
                                        $set: update
                                    })
                                ];
                            case 1:
                                result = _state.sent();
                                if (result.matchedCount === 0) {
                                    return [
                                        2,
                                        {
                                            success: false,
                                            message: "No documents matched the filter"
                                        }
                                    ];
                                }
                                return [
                                    2,
                                    {
                                        success: true,
                                        message: "Documents updated successfully",
                                        result: result
                                    }
                                ];
                            case 2:
                                error = _state.sent();
                                return [
                                    2,
                                    {
                                        success: false,
                                        message: error.message
                                    }
                                ];
                            case 3:
                                return [
                                    2
                                ];
                        }
                    });
                })();
            }
        },
        {
            key: "deleteOne",
            value: function deleteOne(filter) {
                var _this = this;
                return _async_to_generator(function() {
                    var result, error;
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
                                    _this.collection.deleteOne(filter)
                                ];
                            case 1:
                                result = _state.sent();
                                if (result.deletedCount === 0) {
                                    return [
                                        2,
                                        {
                                            success: false,
                                            message: "No documents matched the filter"
                                        }
                                    ];
                                }
                                return [
                                    2,
                                    {
                                        success: true,
                                        message: "Document deleted successfully",
                                        result: result
                                    }
                                ];
                            case 2:
                                error = _state.sent();
                                return [
                                    2,
                                    {
                                        success: false,
                                        message: error.message
                                    }
                                ];
                            case 3:
                                return [
                                    2
                                ];
                        }
                    });
                })();
            }
        },
        {
            key: "deleteMany",
            value: function deleteMany(filter) {
                var _this = this;
                return _async_to_generator(function() {
                    var result, error;
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
                                    _this.collection.deleteMany(filter)
                                ];
                            case 1:
                                result = _state.sent();
                                if (result.deletedCount === 0) {
                                    return [
                                        2,
                                        {
                                            success: false,
                                            message: "No documents matched the filter"
                                        }
                                    ];
                                }
                                return [
                                    2,
                                    {
                                        success: true,
                                        message: "Documents deleted successfully",
                                        result: result
                                    }
                                ];
                            case 2:
                                error = _state.sent();
                                return [
                                    2,
                                    {
                                        success: false,
                                        message: error.message
                                    }
                                ];
                            case 3:
                                return [
                                    2
                                ];
                        }
                    });
                })();
            }
        }
    ]);
    return MongoController;
}();
var MongooseController = /*#__PURE__*/ function() {
    "use strict";
    function MongooseController(model) {
        _class_call_check(this, MongooseController);
        this.model = model;
    }
    _create_class(MongooseController, [
        {
            key: "getModelName",
            value: function getModelName() {
                return this.model.modelName;
            }
        },
        {
            key: "findOne",
            value: function findOne() {
                var filter = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, projection = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, options = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, populate = arguments.length > 3 ? arguments[3] : void 0;
                var _this = this;
                return _async_to_generator(function() {
                    var query, result, error;
                    return _ts_generator(this, function(_state) {
                        switch(_state.label){
                            case 0:
                                _state.trys.push([
                                    0,
                                    2,
                                    ,
                                    3
                                ]);
                                query = _this.model.findOne(filter, projection, options);
                                if (populate) {
                                    query.populate(populate);
                                }
                                return [
                                    4,
                                    query.exec()
                                ];
                            case 1:
                                result = _state.sent();
                                if (!result) {
                                    return [
                                        2,
                                        {
                                            success: false,
                                            message: "No ".concat(_this.getModelName(), " found."),
                                            code: RESPONSE_STATUS.NOT_FOUND.CODE
                                        }
                                    ];
                                }
                                return [
                                    2,
                                    {
                                        success: true,
                                        result: result
                                    }
                                ];
                            case 2:
                                error = _state.sent();
                                return [
                                    2,
                                    {
                                        success: false,
                                        message: error.message,
                                        code: RESPONSE_STATUS.INTERNAL_SERVER_ERROR.CODE
                                    }
                                ];
                            case 3:
                                return [
                                    2
                                ];
                        }
                    });
                })();
            }
        },
        {
            key: "findAll",
            value: function findAll() {
                var filter = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, projection = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, options = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, populate = arguments.length > 3 ? arguments[3] : void 0;
                var _this = this;
                return _async_to_generator(function() {
                    var query, result, error;
                    return _ts_generator(this, function(_state) {
                        switch(_state.label){
                            case 0:
                                _state.trys.push([
                                    0,
                                    2,
                                    ,
                                    3
                                ]);
                                query = _this.model.find(filter, projection, options);
                                if (populate) {
                                    query.populate(populate);
                                }
                                return [
                                    4,
                                    query.exec()
                                ];
                            case 1:
                                result = _state.sent();
                                return [
                                    2,
                                    {
                                        success: true,
                                        result: result
                                    }
                                ];
                            case 2:
                                error = _state.sent();
                                return [
                                    2,
                                    {
                                        success: false,
                                        message: error.message,
                                        code: RESPONSE_STATUS.INTERNAL_SERVER_ERROR.CODE
                                    }
                                ];
                            case 3:
                                return [
                                    2
                                ];
                        }
                    });
                })();
            }
        },
        {
            key: "findPaging",
            value: function findPaging() {
                var filter = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
                var _this = this;
                return _async_to_generator(function() {
                    var result, error;
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
                                    _this.model.paginate(filter, options)
                                ];
                            case 1:
                                result = _state.sent();
                                return [
                                    2,
                                    {
                                        success: true,
                                        result: result
                                    }
                                ];
                            case 2:
                                error = _state.sent();
                                return [
                                    2,
                                    {
                                        success: false,
                                        message: error.message,
                                        code: RESPONSE_STATUS.INTERNAL_SERVER_ERROR.CODE
                                    }
                                ];
                            case 3:
                                return [
                                    2
                                ];
                        }
                    });
                })();
            }
        },
        {
            key: "findPagingAggregate",
            value: function findPagingAggregate(pipeline) {
                var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
                var _this = this;
                return _async_to_generator(function() {
                    var result, error;
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
                                    _this.model.aggregatePaginate(_this.model.aggregate(pipeline), options)
                                ];
                            case 1:
                                result = _state.sent();
                                return [
                                    2,
                                    {
                                        success: true,
                                        result: result
                                    }
                                ];
                            case 2:
                                error = _state.sent();
                                return [
                                    2,
                                    {
                                        success: false,
                                        message: error.message,
                                        code: RESPONSE_STATUS.INTERNAL_SERVER_ERROR.CODE
                                    }
                                ];
                            case 3:
                                return [
                                    2
                                ];
                        }
                    });
                })();
            }
        },
        {
            key: "count",
            value: function count() {
                var filter = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
                var _this = this;
                return _async_to_generator(function() {
                    var result, error;
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
                                    _this.model.countDocuments(filter)
                                ];
                            case 1:
                                result = _state.sent();
                                return [
                                    2,
                                    {
                                        success: true,
                                        result: result
                                    }
                                ];
                            case 2:
                                error = _state.sent();
                                return [
                                    2,
                                    {
                                        success: false,
                                        message: error.message,
                                        code: RESPONSE_STATUS.INTERNAL_SERVER_ERROR.CODE
                                    }
                                ];
                            case 3:
                                return [
                                    2
                                ];
                        }
                    });
                })();
            }
        },
        {
            key: "createOne",
            value: function createOne(doc) {
                var _this = this;
                return _async_to_generator(function() {
                    var result, error;
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
                                    _this.model.create(doc)
                                ];
                            case 1:
                                result = _state.sent();
                                return [
                                    2,
                                    {
                                        success: true,
                                        result: result
                                    }
                                ];
                            case 2:
                                error = _state.sent();
                                return [
                                    2,
                                    {
                                        success: false,
                                        message: error.message,
                                        code: RESPONSE_STATUS.INTERNAL_SERVER_ERROR.CODE
                                    }
                                ];
                            case 3:
                                return [
                                    2
                                ];
                        }
                    });
                })();
            }
        },
        {
            key: "createMany",
            value: function createMany(docs) {
                var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
                var _this = this;
                return _async_to_generator(function() {
                    var createdDocuments, result, error;
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
                                    _this.model.insertMany(docs, options)
                                ];
                            case 1:
                                createdDocuments = _state.sent();
                                result = createdDocuments.map(function(doc) {
                                    if (_instanceof(doc, Document)) {
                                        return doc.toObject();
                                    }
                                    return null;
                                }).filter(function(doc) {
                                    return doc !== null;
                                });
                                return [
                                    2,
                                    {
                                        success: true,
                                        result: result
                                    }
                                ];
                            case 2:
                                error = _state.sent();
                                return [
                                    2,
                                    {
                                        success: false,
                                        message: error.message,
                                        code: RESPONSE_STATUS.INTERNAL_SERVER_ERROR.CODE
                                    }
                                ];
                            case 3:
                                return [
                                    2
                                ];
                        }
                    });
                })();
            }
        },
        {
            key: "updateOne",
            value: function updateOne() {
                var filter = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, update = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, options = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
                var _this = this;
                return _async_to_generator(function() {
                    var result, error;
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
                                    _this.model.findOneAndUpdate(filter, update, _object_spread({
                                        new: true
                                    }, options)).exec()
                                ];
                            case 1:
                                result = _state.sent();
                                if (!result) {
                                    return [
                                        2,
                                        {
                                            success: false,
                                            message: "Failed to update ".concat(_this.getModelName(), "."),
                                            code: RESPONSE_STATUS.NOT_FOUND.CODE
                                        }
                                    ];
                                }
                                return [
                                    2,
                                    {
                                        success: true,
                                        result: result
                                    }
                                ];
                            case 2:
                                error = _state.sent();
                                return [
                                    2,
                                    {
                                        success: false,
                                        message: error.message,
                                        code: RESPONSE_STATUS.INTERNAL_SERVER_ERROR.CODE
                                    }
                                ];
                            case 3:
                                return [
                                    2
                                ];
                        }
                    });
                })();
            }
        },
        {
            key: "updateMany",
            value: function updateMany() {
                var filter = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, update = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, options = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
                var _this = this;
                return _async_to_generator(function() {
                    var result, error;
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
                                    _this.model.updateMany(filter, update, options).exec()
                                ];
                            case 1:
                                result = _state.sent();
                                return [
                                    2,
                                    {
                                        success: true,
                                        result: result
                                    }
                                ];
                            case 2:
                                error = _state.sent();
                                return [
                                    2,
                                    {
                                        success: false,
                                        message: error.message,
                                        code: RESPONSE_STATUS.INTERNAL_SERVER_ERROR.CODE
                                    }
                                ];
                            case 3:
                                return [
                                    2
                                ];
                        }
                    });
                })();
            }
        },
        {
            key: "deleteOne",
            value: function deleteOne() {
                var filter = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
                var _this = this;
                return _async_to_generator(function() {
                    var result, error;
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
                                    _this.model.findOneAndDelete(filter, options).exec()
                                ];
                            case 1:
                                result = _state.sent();
                                if (!result) {
                                    return [
                                        2,
                                        {
                                            success: false,
                                            message: "No ".concat(_this.getModelName(), " found to delete."),
                                            code: RESPONSE_STATUS.NOT_FOUND.CODE
                                        }
                                    ];
                                }
                                return [
                                    2,
                                    {
                                        success: true,
                                        result: result
                                    }
                                ];
                            case 2:
                                error = _state.sent();
                                return [
                                    2,
                                    {
                                        success: false,
                                        message: error.message,
                                        code: RESPONSE_STATUS.INTERNAL_SERVER_ERROR.CODE
                                    }
                                ];
                            case 3:
                                return [
                                    2
                                ];
                        }
                    });
                })();
            }
        },
        {
            key: "deleteMany",
            value: function deleteMany() {
                var filter = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
                var _this = this;
                return _async_to_generator(function() {
                    var result, error;
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
                                    _this.model.deleteMany(filter, options).exec()
                                ];
                            case 1:
                                result = _state.sent();
                                if (result.deletedCount === 0) {
                                    return [
                                        2,
                                        {
                                            success: false,
                                            message: "No documents found to delete.",
                                            code: RESPONSE_STATUS.NOT_FOUND.CODE
                                        }
                                    ];
                                }
                                return [
                                    2,
                                    {
                                        success: true,
                                        result: result
                                    }
                                ];
                            case 2:
                                error = _state.sent();
                                return [
                                    2,
                                    {
                                        success: false,
                                        message: error.message,
                                        code: RESPONSE_STATUS.INTERNAL_SERVER_ERROR.CODE
                                    }
                                ];
                            case 3:
                                return [
                                    2
                                ];
                        }
                    });
                })();
            }
        },
        {
            key: "createShortId",
            value: function createShortId(id) {
                var length = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 4;
                var _this = this;
                return _async_to_generator(function() {
                    var maxRetries, existingShortIds, retries, shortId, shortIdExists;
                    return _ts_generator(this, function(_state) {
                        switch(_state.label){
                            case 0:
                                maxRetries = 10;
                                existingShortIds = /* @__PURE__ */ new Set();
                                retries = 0;
                                _state.label = 1;
                            case 1:
                                if (!(retries < maxRetries)) return [
                                    3,
                                    4
                                ];
                                shortId = generateShortId(id, retries + length);
                                if (!!existingShortIds.has(shortId)) return [
                                    3,
                                    3
                                ];
                                existingShortIds.add(shortId);
                                return [
                                    4,
                                    _this.model.exists({
                                        shortId: shortId
                                    })
                                ];
                            case 2:
                                shortIdExists = _state.sent();
                                if (!shortIdExists) {
                                    return [
                                        2,
                                        {
                                            success: true,
                                            result: shortId
                                        }
                                    ];
                                }
                                _state.label = 3;
                            case 3:
                                retries++;
                                return [
                                    3,
                                    1
                                ];
                            case 4:
                                return [
                                    2,
                                    {
                                        success: false,
                                        message: "Failed to create a unique shortId",
                                        code: RESPONSE_STATUS.INTERNAL_SERVER_ERROR.CODE
                                    }
                                ];
                        }
                    });
                })();
            }
        },
        {
            key: "createSlug",
            value: function createSlug(fieldName, fields) {
                var filters = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
                var _this = this;
                return _async_to_generator(function() {
                    var fieldValue, createUniqueSlug, slugResults, _tmp, _tmp1, _i, lang, slug, slug1, uniqueSlug, error;
                    return _ts_generator(this, function(_state) {
                        switch(_state.label){
                            case 0:
                                _state.trys.push([
                                    0,
                                    8,
                                    ,
                                    9
                                ]);
                                fieldValue = fields[fieldName];
                                createUniqueSlug = /*#__PURE__*/ function() {
                                    var _ref = _async_to_generator(function(slug) {
                                        var existingDoc, suffix, uniqueSlug;
                                        return _ts_generator(this, function(_state) {
                                            switch(_state.label){
                                                case 0:
                                                    return [
                                                        4,
                                                        _this.model.findOne(mongo.createSlugQuery(slug, filters, fields.id))
                                                    ];
                                                case 1:
                                                    existingDoc = _state.sent();
                                                    if (!existingDoc) return [
                                                        2,
                                                        slug
                                                    ];
                                                    suffix = 1;
                                                    _state.label = 2;
                                                case 2:
                                                    uniqueSlug = "".concat(slug, "-").concat(suffix);
                                                    return [
                                                        4,
                                                        _this.model.findOne(mongo.createSlugQuery(uniqueSlug, filters, fields.id))
                                                    ];
                                                case 3:
                                                    existingDoc = _state.sent();
                                                    suffix++;
                                                    _state.label = 4;
                                                case 4:
                                                    if (existingDoc) return [
                                                        3,
                                                        2
                                                    ];
                                                    _state.label = 5;
                                                case 5:
                                                    return [
                                                        2,
                                                        uniqueSlug
                                                    ];
                                            }
                                        });
                                    });
                                    return function createUniqueSlug(slug) {
                                        return _ref.apply(this, arguments);
                                    };
                                }();
                                if (!((typeof fieldValue === "undefined" ? "undefined" : _type_of(fieldValue)) === "object")) return [
                                    3,
                                    5
                                ];
                                slugResults = {};
                                _tmp = [];
                                for(_tmp1 in fieldValue)_tmp.push(_tmp1);
                                _i = 0;
                                _state.label = 1;
                            case 1:
                                if (!(_i < _tmp.length)) return [
                                    3,
                                    4
                                ];
                                lang = _tmp[_i];
                                slug = generateSlug(fieldValue[lang]);
                                return [
                                    4,
                                    createUniqueSlug(slug)
                                ];
                            case 2:
                                slugResults[lang] = _state.sent();
                                _state.label = 3;
                            case 3:
                                _i++;
                                return [
                                    3,
                                    1
                                ];
                            case 4:
                                return [
                                    2,
                                    {
                                        success: true,
                                        result: slugResults
                                    }
                                ];
                            case 5:
                                slug1 = generateSlug(fieldValue);
                                return [
                                    4,
                                    createUniqueSlug(slug1)
                                ];
                            case 6:
                                uniqueSlug = _state.sent();
                                return [
                                    2,
                                    {
                                        success: true,
                                        result: uniqueSlug
                                    }
                                ];
                            case 7:
                                return [
                                    3,
                                    9
                                ];
                            case 8:
                                error = _state.sent();
                                return [
                                    2,
                                    {
                                        success: false,
                                        message: "Failed to create a unique slug: ".concat(error.message),
                                        code: RESPONSE_STATUS.INTERNAL_SERVER_ERROR.CODE
                                    }
                                ];
                            case 9:
                                return [
                                    2
                                ];
                        }
                    });
                })();
            }
        },
        {
            key: "aggregate",
            value: function aggregate(pipeline) {
                var _this = this;
                return _async_to_generator(function() {
                    var result, error;
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
                                    _this.model.aggregate(pipeline)
                                ];
                            case 1:
                                result = _state.sent();
                                return [
                                    2,
                                    {
                                        success: true,
                                        result: result
                                    }
                                ];
                            case 2:
                                error = _state.sent();
                                return [
                                    2,
                                    {
                                        success: false,
                                        message: error.message,
                                        code: RESPONSE_STATUS.INTERNAL_SERVER_ERROR.CODE
                                    }
                                ];
                            case 3:
                                return [
                                    2
                                ];
                        }
                    });
                })();
            }
        }
    ]);
    return MongooseController;
}();
export { MongoController, MongooseController, aggregatePaginate, mongo, mongoosePaginate };
