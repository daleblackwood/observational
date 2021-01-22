export declare type Handler<T = any, LISTENER extends IListener<T, any> = IListener<T>> = (message: T, listener?: LISTENER) => void;
export interface IListener<T = any, OWNER extends Dispatcher = Dispatcher> {
    scope: any;
    handler: Handler<T>;
    boundHandler: Handler<T, IListener<T, OWNER>>;
    once: boolean;
    owner: OWNER;
}
export interface DispatchListenerOptions {
    once?: boolean;
}
export declare class Dispatcher<T = any> {
    listeners: IListener<T, this>[];
    dispatchTimer: any;
    listen(scope: object, handler: Handler<T>, options: DispatchListenerOptions): IListener<T, this>;
    hook(handler: Handler<T>): void;
    unlisten(scope: object, handler: Handler<T>): void;
    unlistenAll(scope: object): void;
    hasListener(scope: object, handler: Handler<T>): boolean;
    indexOf(scope: object, handler: Handler<T>): number;
    dispatch(message: T): void;
    removeOnces(): void;
    dispatchDelayed(message: T, delay?: number): void;
}
