import { Dispatcher, DispatchListenerOptions, Handler } from "./Dispatcher";
interface SubjectListenerOptions extends DispatchListenerOptions {
    immediate?: boolean;
    once?: boolean;
}
export declare class Subject<T> extends Dispatcher<T> {
    value: T;
    constructor(value: T);
    listen(scope: object, handler: Handler<T>, options?: SubjectListenerOptions): import("./Dispatcher").IListener<T, this>;
    setValue(newValue: T, forceUpdate?: boolean): void;
}
export {};
