/*
  https://github.com/daleblackwood/ladts
  LAD.Subject is a dispatcher with a value - an Observable
*/
import { Dispatcher, DispatchListenerOptions, Handler } from "./Dispatcher";
import { isMatching } from "./utils";

interface SubjectListenerOptions extends DispatchListenerOptions {
  immediate?: boolean; 
  once?: boolean;
}

export class Subject<T> extends Dispatcher<T> {

  debounceTime = 0;

  constructor(public value: T) {
    super();
  }

  listen(scope: object, handler: Handler<T>, options: SubjectListenerOptions = {}) {
    const listener = super.listen(scope, handler, { once: options.once });
    if (options.immediate !== false) {
      listener.boundHandler(this.value);
    }
    return listener;
  }

  setValue(newValue: T, forceUpdate = false) {
    if (!forceUpdate && isMatching(newValue, this.value))
      return;
    this.value = newValue;
    if (this.debounceTime > 0) {
      this.dispatchDelayed(newValue, this.debounceTime);
    } else {
      this.dispatch(this.value);
    }
  }
}
