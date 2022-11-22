export class Dispatcher {
    constructor() {
        this.listeners = Array();
    }
    listen(scope, handler, options) {
        // adds a listener function to the list
        const existingIndex = this.indexOf(scope, handler);
        if (existingIndex >= 0) {
            return this.listeners[existingIndex];
        }
        const boundHandler = handler.bind(scope);
        const listener = {
            scope,
            handler,
            boundHandler,
            owner: this,
            once: options.once === true
        };
        this.listeners.push(listener);
        return listener;
    }
    hook(handler) {
        this.listen(handler, handler, { once: true });
    }
    unlisten(scope, handler) {
        // takes a listener function out of the list
        const index = this.indexOf(scope, handler);
        if (index < 0) {
            return;
        }
        this.listeners.splice(index, 1);
    }
    unlistenAll(scope) {
        let i = this.listeners.length;
        while (i-- > 0) {
            const listener = this.listeners[i];
            if (scope === null || listener.scope === scope) {
                this.listeners.splice(i, 1);
            }
        }
    }
    hasListener(scope, handler) {
        // returns true if the listener is in the list
        return this.indexOf(scope, handler) >= 0;
    }
    indexOf(scope, handler) {
        let i = this.listeners.length;
        while (i-- > 0) {
            const listener = this.listeners[i];
            if (listener.scope === scope && listener.handler === handler) {
                return i;
            }
        }
        return -1;
    }
    dispatch(message) {
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
    dispatchDelayed(message, delay = 0) {
        clearTimeout(this.dispatchTimer);
        this.dispatchTimer = setTimeout(() => this.dispatch(message), Math.max(0, delay || 0));
    }
}
