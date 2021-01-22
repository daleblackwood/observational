declare module "react" {
    export function useState<T = any>(value: T): [T, (value: T) => void];
}