import { Subject } from "./Subject";
export declare class FeedSubject<T> extends Subject<T[]> {
    feedUpdater: (lastValue: T | null) => Promise<T[]>;
    interval: number;
    isRunning: boolean;
    isLoading: boolean;
    error: Error;
    continueAfterErrors: boolean;
    get lastValue(): T;
    private scheduleTimeout;
    constructor(feedUpdater: (lastValue: T | null) => Promise<T[]>, interval?: number, isRunning?: boolean);
    resume(): void;
    pause(): void;
    updateFeed(): Promise<unknown>;
    private scheduleNext;
    setValue(newValue: T[], forceUpdate?: boolean): void;
    setError(error?: Error): void;
}
