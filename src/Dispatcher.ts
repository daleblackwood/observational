/*
  https://github.com/daleblackwood/ladts
  LAD.Dispatcher dispatches objects, messages or values to registered
  listeners. Unlike event dispatchers, LAD.Dispatcher has no type and
  will dispatch to all methods registered to it.
*/
export type Handler<
  T = any,
  LISTENER extends IListener<T, any> = IListener<T>
> = (message: T, listener?: LISTENER) => void;

export interface IListener<T = any, OWNER extends Dispatcher = Dispatcher> {
  scope: any;
  handler: Handler<T>;
  boundHandler: Handler<T, IListener<T, OWNER>>;
  once: boolean;
  owner: OWNER;
}

export interface DispatchListenerOptions {
  once?: boolean
}

export class Dispatcher<T = any> {
  listeners = Array<IListener<T, this>>();
  dispatchTimer: any;

  listen(scope: object, handler: Handler<T>, options: DispatchListenerOptions): IListener<T, this> {
    // adds a listener function to the list
    const existingIndex = this.getListenerIndex(scope, handler);
    if (existingIndex >= 0) {
      return this.listeners[existingIndex];
    }
    const boundHandler = handler.bind(scope);
    const listener = ({
      scope,
      handler,
      boundHandler,
      owner: this,
      once: options.once === true
    } as unknown) as IListener<T, this>;
    this.listeners.push(listener);
    return listener;
  }

  hook(handler: Handler<T>) {
    this.listen(handler, handler, { once: true });
  }

  unlisten(scope: object, handler: Handler<T>) {
    // takes a listener function out of the list
    const index = this.getListenerIndex(scope, handler);
    if (index < 0) {
      return;
    }
    this.listeners.splice(index, 1);
  }

  unlistenAll(scope: object) {
    let i = this.listeners.length;
    while (i-- > 0) {
      const listener = this.listeners[i];
      if (scope === null || listener.scope === scope) {
        this.listeners.splice(i, 1);
      }
    }
  }

  hasListener(scope: object, handler: Handler<T>) {
    // returns true if the listener is in the list
    return this.getListenerIndex(scope, handler) >= 0;
  }

  getListenerIndex(scope: object, handler: Handler<T>) {
    let i = this.listeners.length;
    while (i-- > 0) {
      const listener = this.listeners[i];
      if (listener.scope === scope && listener.handler === handler) {
        return i;
      }
    }
    return -1;
  }

  dispatch(message: T) {
    clearTimeout(this.dispatchTimer);
    for (const listener of this.listeners) {
      listener.boundHandler(message, listener);
    }
    this.removeOnces();
  }

  removeOnces() {
    for (let i = this.listeners.length - 1; i >= 0; i--) {
      if (this.listeners[i].once) {
        this.listeners.splice(i, 1);
      }
    }
  }

  dispatchDelayed(message: T, delay = 0) {
    clearTimeout(this.dispatchTimer);
    this.dispatchTimer = setTimeout(
      () => this.dispatch(message),
      Math.max(0, delay || 0)
    );
  }
}
