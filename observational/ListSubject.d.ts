import { Subject } from "./Subject";
export declare class ListSubject<T> extends Subject<T[]> {
    constructor(value?: T[]);
    addEntry(value: T): number;
    removeEntry(value: T): void;
    replaceEntry(index: number, value: T): void;
    clear(): void;
    hasEntry(value: T): boolean;
    indexOfEntry(value: T): number;
}
