import type { T_Object } from '#typescript/common.js';

export function isJson(str: string): boolean {
    try {
        JSON.parse(str);
        return true;
    }
    catch {
        return false;
    }
}

export function isPlainObject(val: unknown): val is T_Object {
    return !!val && typeof val === 'object' && !Array.isArray(val);
}

export function deepMerge(...object: T_Object[]): T_Object {
    return object.flat().reduce<T_Object>((acc, source) => {
        for (const [key, sourceValue] of Object.entries(source)) {
            const targetValue = acc[key];

            if (Array.isArray(sourceValue)) {
                acc[key] = Array.from(new Set([
                    ...(Array.isArray(targetValue) ? targetValue : []),
                    ...sourceValue,
                ]));
            }
            else if (isPlainObject(sourceValue)) {
                acc[key] = deepMerge(
                    isPlainObject(targetValue) ? targetValue : {},
                    sourceValue,
                );
            }
            else {
                acc[key] = sourceValue;
            }
        }

        return acc;
    }, {});
}
