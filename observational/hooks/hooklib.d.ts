export type UseStateFunction<T = any> = (value: T) => [T, (value: T) => unknown];
export type UseEffectFunction = (func: () => void, array?: any[]) => unknown;
export type HookLib = {
    useState: UseStateFunction;
    useEffect: UseEffectFunction;
};
export declare function initHooks(hooksLibrary: HookLib): void;
export declare function requireLib(): HookLib | undefined;
