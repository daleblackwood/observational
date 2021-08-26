declare module "react" {
    export function useState<T = any>(value: T): [T, (value: T) => void];
    export function useEffect(func: () => void, array?: any[]): void;
}