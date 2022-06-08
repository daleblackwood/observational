import { Subject } from "../Subject";
export declare function subscribe<T, SubjectT extends Subject<T>>(subject: SubjectT, onMount?: () => void, onUnmount?: () => void): SubjectT;
export default subscribe;
