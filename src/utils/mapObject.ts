export function mapObject<T extends Record<string, any>, K extends keyof T>(
    source: T,
    excludeKeys: K[],
): Omit<T, K> {
    const result = { ...source };
    for (const key of excludeKeys) {
        delete result[key];
    }
    return result;
}
