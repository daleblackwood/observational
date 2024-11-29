"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Subject = void 0;
/*
  https://github.com/daleblackwood/ladts
  LAD.Subject is a dispatcher with a value - an Observable
*/
const Dispatcher_1 = require("./Dispatcher");
const utils_1 = require("./utils");
class Subject extends Dispatcher_1.Dispatcher {
    constructor(value) {
        super();
        this.value = value;
        this.debounceTime = 0;
    }
    listen(scope, handler, options = {}) {
        const listener = super.listen(scope, handler, { once: options.once });
        if (options.immediate !== false) {
            listener.boundHandler(this.value, listener);
        }
        return listener;
    }
    setValue(newValue, forceUpdate = false) {
        if (!forceUpdate && (0, utils_1.isMatching)(newValue, this.value))
            return;
        this.value = newValue;
        if (this.debounceTime > 0) {
            this.dispatchDelayed(newValue, this.debounceTime);
        }
        else {
            this.dispatch(this.value);
        }
    }
}
exports.Subject = Subject;
