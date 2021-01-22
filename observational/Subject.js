"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Subject = void 0;
/*
  https://github.com/daleblackwood/ladts
  LAD.Subject is a dispatcher with a value - an Observable
*/
var Dispatcher_1 = require("./Dispatcher");
var Subject = /** @class */ (function (_super) {
    __extends(Subject, _super);
    function Subject(value) {
        var _this = _super.call(this) || this;
        _this.value = value;
        return _this;
    }
    Subject.prototype.listen = function (scope, handler, options) {
        if (options === void 0) { options = {}; }
        var listener = _super.prototype.listen.call(this, scope, handler, { once: options.once });
        if (options.immediate !== false) {
            listener.boundHandler(this.value);
        }
        return listener;
    };
    Subject.prototype.setValue = function (newValue, forceUpdate) {
        if (forceUpdate === void 0) { forceUpdate = false; }
        if (newValue === this.value && !forceUpdate) {
            return;
        }
        this.value = newValue;
        this.dispatch(this.value);
    };
    return Subject;
}(Dispatcher_1.Dispatcher));
exports.Subject = Subject;
