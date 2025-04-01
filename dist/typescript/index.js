// src/typescript/command.ts
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
function _construct(Parent, args, Class) {
    if (_is_native_reflect_construct()) {
        _construct = Reflect.construct;
    } else {
        _construct = function construct(Parent, args, Class) {
            var a = [
                null
            ];
            a.push.apply(a, args);
            var Constructor = Function.bind.apply(Parent, a);
            var instance = new Constructor();
            if (Class) _set_prototype_of(instance, Class.prototype);
            return instance;
        };
    }
    return _construct.apply(null, arguments);
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
function _is_native_function(fn) {
    return Function.toString.call(fn).indexOf("[native code]") !== -1;
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
function _wrap_native_super(Class) {
    var _cache = typeof Map === "function" ? new Map() : undefined;
    _wrap_native_super = function wrapNativeSuper(Class) {
        if (Class === null || !_is_native_function(Class)) return Class;
        if (typeof Class !== "function") {
            throw new TypeError("Super expression must either be null or a function");
        }
        if (typeof _cache !== "undefined") {
            if (_cache.has(Class)) return _cache.get(Class);
            _cache.set(Class, Wrapper);
        }
        function Wrapper() {
            return _construct(Class, arguments, _get_prototype_of(this).constructor);
        }
        Wrapper.prototype = Object.create(Class.prototype, {
            constructor: {
                value: Wrapper,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        return _set_prototype_of(Wrapper, Class);
    };
    return _wrap_native_super(Class);
}
function _is_native_reflect_construct() {
    try {
        var result = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}));
    } catch (_) {}
    return (_is_native_reflect_construct = function() {
        return !!result;
    })();
}
var E_ErrorType = /* @__PURE__ */ function(E_ErrorType2) {
    E_ErrorType2["Error"] = "error";
    E_ErrorType2["Warning"] = "warning";
    return E_ErrorType2;
}(E_ErrorType || {});
// src/typescript/mongo.ts
import { Collection, Db } from "mongodb";
import { Document, Model } from "mongoose";
var C_Db = /*#__PURE__*/ function(Db) {
    "use strict";
    _inherits(C_Db, Db);
    function C_Db() {
        _class_call_check(this, C_Db);
        return _call_super(this, C_Db, arguments);
    }
    return C_Db;
}(Db);
var C_Document = /*#__PURE__*/ function(Document) {
    "use strict";
    _inherits(C_Document, Document);
    function C_Document() {
        _class_call_check(this, C_Document);
        return _call_super(this, C_Document, arguments);
    }
    return C_Document;
}(_wrap_native_super(Document));
var C_Model = /*#__PURE__*/ function(Model) {
    "use strict";
    _inherits(C_Model, Model);
    function C_Model() {
        _class_call_check(this, C_Model);
        return _call_super(this, C_Model, arguments);
    }
    return C_Model;
}(Model);
var C_Collection = /*#__PURE__*/ function(Collection) {
    "use strict";
    _inherits(C_Collection, Collection);
    function C_Collection() {
        _class_call_check(this, C_Collection);
        return _call_super(this, C_Collection, arguments);
    }
    return C_Collection;
}(Collection);
export { C_Collection, C_Db, C_Document, C_Model, E_ErrorType };
