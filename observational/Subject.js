/*
  https://github.com/daleblackwood/ladts
  LAD.Subject is a dispatcher with a value - an Observable
*/
import { Dispatcher } from "./Dispatcher";
export class Subject extends Dispatcher {
    constructor(value) {
        super();
        this.value = value;
    }
    listen(scope, handler, options = {}) {
        const listener = super.listen(scope, handler, { once: options.once });
        if (options.immediate !== false) {
            listener.boundHandler(this.value);
        }
        return listener;
    }
    setValue(newValue, forceUpdate = false) {
        if (newValue === this.value && !forceUpdate) {
            return;
        }
        this.value = newValue;
        this.dispatch(this.value);
    }
}
