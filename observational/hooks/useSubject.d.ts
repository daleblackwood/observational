import { Subject } from "../Subject";
export declare function useSubject<T>(subject: Subject<T>, onMount?: () => void, onUnmount?: () => void): [T, (value: T) => void];
export declare function useValue<T>(subject: Subject<T>, onMount?: () => void, onUnmount?: () => void): T;
