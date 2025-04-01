"use strict";
function _assert_this_initialized(self) {
    if (self === void 0) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return self;
}
function _call_super(_this, derived, args) {
    derived = _get_prototype_of(derived);
    return _possible_constructor_return(_this, _is_native_reflect_construct() ? Reflect.construct(derived, args || [], _get_prototype_of(_this).constructor) : derived.apply(_this, args));
}
function _class_call_check(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}
function _get_prototype_of(o) {
    _get_prototype_of = Object.setPrototypeOf ? Object.getPrototypeOf : function getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _get_prototype_of(o);
}
function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function");
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
            value: subClass,
            writable: true,
            configurable: true
        }
    });
    if (superClass) _set_prototype_of(subClass, superClass);
}
function _possible_constructor_return(self, call) {
    if (call && (_type_of(call) === "object" || typeof call === "function")) {
        return call;
    }
    return _assert_this_initialized(self);
}
function _set_prototype_of(o, p) {
    _set_prototype_of = Object.setPrototypeOf || function setPrototypeOf(o, p) {
        o.__proto__ = p;
        return o;
    };
    return _set_prototype_of(o, p);
}
function _type_of(obj) {
    "@swc/helpers - typeof";
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
}
function _is_native_reflect_construct() {
    try {
        var result = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}));
    } catch (_) {}
    return (_is_native_reflect_construct = function() {
        return !!result;
    })();
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
// src/typescript/mongo.ts
var mongo_exports = {};
__export(mongo_exports, {
    C_Collection: function() {
        return C_Collection;
    },
    C_Db: function() {
        return C_Db;
    },
    C_Document: function() {
        return C_Document;
    },
    C_Model: function() {
        return C_Model;
    }
});
module.exports = __toCommonJS(mongo_exports);
var import_mongodb = require("mongodb");
var import_mongoose = require("mongoose");
var C_Db = /*#__PURE__*/ function(_import_mongodb_Db) {
    _inherits(C_Db, _import_mongodb_Db);
    function C_Db() {
        _class_call_check(this, C_Db);
        return _call_super(this, C_Db, arguments);
    }
    return C_Db;
}(import_mongodb.Db);
var C_Document = /*#__PURE__*/ function(_import_mongoose_Document) {
    _inherits(C_Document, _import_mongoose_Document);
    function C_Document() {
        _class_call_check(this, C_Document);
        return _call_super(this, C_Document, arguments);
    }
    return C_Document;
}(import_mongoose.Document);
var C_Model = /*#__PURE__*/ function(_import_mongoose_Model) {
    _inherits(C_Model, _import_mongoose_Model);
    function C_Model() {
        _class_call_check(this, C_Model);
        return _call_super(this, C_Model, arguments);
    }
    return C_Model;
}(import_mongoose.Model);
var C_Collection = /*#__PURE__*/ function(_import_mongodb_Collection) {
    _inherits(C_Collection, _import_mongodb_Collection);
    function C_Collection() {
        _class_call_check(this, C_Collection);
        return _call_super(this, C_Collection, arguments);
    }
    return C_Collection;
}(import_mongodb.Collection);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
    C_Collection: C_Collection,
    C_Db: C_Db,
    C_Document: C_Document,
    C_Model: C_Model
});
