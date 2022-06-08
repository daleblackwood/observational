import { Subject } from "../Subject";
export declare function subscribe<SubjectT extends Subject<ValueT>, ValueT>(subject: SubjectT, onMount?: () => void, onUnmount?: () => void): SubjectT;
export default subscribe;
