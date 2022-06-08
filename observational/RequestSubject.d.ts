import { Subject } from "./Subject";
export declare class RequestSubject<T> extends Subject<T> {
    requester: () => Promise<T>;
    isLoading: boolean;
    error: Error;
    constructor(requester: () => Promise<T>, value?: T, immediate?: boolean);
    request(): Promise<unknown>;
    setValue(newValue: T, forceUpdate?: boolean): void;
    setError(error?: Error): void;
}
