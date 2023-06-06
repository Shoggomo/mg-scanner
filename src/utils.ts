export function isTruthy<T>(value: T | null): value is T {
    return Boolean(value)
}

export const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));
