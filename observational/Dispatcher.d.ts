export type Handler<T> = (value: T, listener?: IListener<T>) => unknown;
export interface IListener<T = any> {
    scope: any;
    handler: Handler<T>;
    boundHandler: Handler<T>;
    once: boolean;
    owner: object;
}
export interface DispatchListenerOptions {
    once?: boolean;
}
export declare class Dispatcher<T = any> {
    listeners: IListener<T>[];
    dispatchTimer: any;
    listen(scope: object, handler: Handler<T>, options: DispatchListenerOptions): IListener<T>;
    hook(handler: Handler<T>): void;
    unlisten(scope: object, handler: Handler<T>): void;
    unlistenAll(scope: object): void;
    hasListener(scope: object, handler: Handler<T>): boolean;
    getListenerIndex(scope: object, handler: Handler<T>): number;
    dispatch(message: T): void;
    removeOnces(): void;
    dispatchDelayed(message: T, delay?: number): void;
}
