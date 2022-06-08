import { Subject } from "./Subject";
export declare class RequestSubject<T> extends Subject<T | null> {
    initialValue: T;
    requester: () => Promise<T>;
    isLoading: boolean;
    revertValue: boolean;
    error: Error;
    constructor(initialValue: T, requester: () => Promise<T>, immediate?: boolean);
    request(): Promise<unknown>;
    setValue(newValue: T, forceUpdate?: boolean): void;
    setError(error?: Error): void;
}
