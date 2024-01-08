import { Dispatcher, DispatchListenerOptions, Handler } from "./Dispatcher";
interface SubjectListenerOptions extends DispatchListenerOptions {
    immediate?: boolean;
    once?: boolean;
}
export declare class Subject<T> extends Dispatcher<T> {
    value: T;
    debounceTime: number;
    constructor(value: T);
    listen(scope: object, handler: Handler<T>, options?: SubjectListenerOptions): import("./Dispatcher").IListener<T>;
    setValue(newValue: T, forceUpdate?: boolean): void;
}
export {};
