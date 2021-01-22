"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dispatcher = void 0;
var Dispatcher = /** @class */ (function () {
    function Dispatcher() {
        this.listeners = Array();
    }
    Dispatcher.prototype.listen = function (scope, handler, options) {
        // adds a listener function to the list
        var existingIndex = this.indexOf(scope, handler);
        if (existingIndex >= 0) {
            return this.listeners[existingIndex];
        }
        var boundHandler = handler.bind(scope);
        var listener = {
            scope: scope,
            handler: handler,
            boundHandler: boundHandler,
            owner: this,
            once: options.once === true
        };
        this.listeners.push(listener);
        return listener;
    };
    Dispatcher.prototype.hook = function (handler) {
        this.listen(handler, handler, { once: true });
    };
    Dispatcher.prototype.unlisten = function (scope, handler) {
        // takes a listener function out of the list
        var index = this.indexOf(scope, handler);
        if (index < 0) {
            return;
        }
        this.listeners.splice(index, 1);
    };
    Dispatcher.prototype.unlistenAll = function (scope) {
        var i = this.listeners.length;
        while (i-- > 0) {
            var listener = this.listeners[i];
            if (scope === null || listener.scope === scope) {
                this.listeners.splice(i, 1);
            }
        }
    };
    Dispatcher.prototype.hasListener = function (scope, handler) {
        // returns true if the listener is in the list
        return this.indexOf(scope, handler) >= 0;
    };
    Dispatcher.prototype.indexOf = function (scope, handler) {
        var i = this.listeners.length;
        while (i-- > 0) {
            var listener = this.listeners[i];
            if (listener.scope === scope && listener.handler === handler) {
                return i;
            }
        }
        return -1;
    };
    Dispatcher.prototype.dispatch = function (message) {
        clearTimeout(this.dispatchTimer);
        for (var _i = 0, _a = this.listeners; _i < _a.length; _i++) {
            var listener = _a[_i];
            listener.boundHandler(message, listener);
        }
        this.removeOnces();
    };
    Dispatcher.prototype.removeOnces = function () {
        for (var i = this.listeners.length - 1; i >= 0; i--) {
            if (this.listeners[i].once) {
                this.listeners.splice(i, 1);
            }
        }
    };
    Dispatcher.prototype.dispatchDelayed = function (message, delay) {
        var _this = this;
        if (delay === void 0) { delay = 0; }
        clearTimeout(this.dispatchTimer);
        this.dispatchTimer = setTimeout(function () { return _this.dispatch(message); }, Math.max(0, delay || 0));
    };
    return Dispatcher;
}());
exports.Dispatcher = Dispatcher;
