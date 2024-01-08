/*
  https://github.com/daleblackwood/ladts
  LAD.Subject is a dispatcher with a value - an Observable
*/
import { Dispatcher } from "./Dispatcher";
import { isMatching } from "./utils";
export class Subject extends Dispatcher {
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
        if (!forceUpdate && isMatching(newValue, this.value))
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
