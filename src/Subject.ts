/*
  https://github.com/daleblackwood/ladts
  A Subject is a dispatcher with a value - an Observable
*/
import { Dispatcher, DispatchListenerOptions, Handler } from "./Dispatcher";

interface SubjectListenerOptions extends DispatchListenerOptions {
  immediate?: boolean; 
  once?: boolean;
}

export class Subject<T> extends Dispatcher<T> {
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
    if (newValue === this.value && !forceUpdate) {
      return;
    }
    this.value = newValue;
    this.dispatch(this.value);
  }
}
