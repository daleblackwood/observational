import { Subject } from "../Subject";
export declare function useSubject<T>(subject: Subject<T>): [T, (value: T) => void];
