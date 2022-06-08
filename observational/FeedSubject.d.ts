import { Subject } from "./Subject";
export declare class FeedSubject<T> extends Subject<T[]> {
    feedUpdater: (lastValue: T | null) => Promise<T[]>;
    interval: number;
    isLoading: boolean;
    error: Error;
    continueAfterErrors: boolean;
    get lastValue(): T;
    constructor(feedUpdater: (lastValue: T | null) => Promise<T[]>, interval?: number);
    private scheduleNext;
    updateFeed(): Promise<unknown>;
    setValue(newValue: T[], forceUpdate?: boolean): void;
    setError(error?: Error): void;
}
