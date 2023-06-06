export function isTruthy<T>(value: T | null): value is T {
    return Boolean(value)
}
