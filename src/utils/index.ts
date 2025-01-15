import cryptoJS from 'crypto-js';
import slugifyRaw from 'slugify';

import {
    I_SlugifyOptions,
    T_Config,
    T_FilterQuery,
    T_GenerateSlugQueryResponse,
} from '../typescript/index.js';

export * from './localStorage.js';
export * from './log.js';
export * from './mongoose.js';
export * from './validate.js';

// Utility to deeply merge configurations
export function deepMerge(...configs: (T_Config | T_Config[])[]): T_Config {
    const merge = (target: T_Config, source: T_Config): T_Config => {
        Object.keys(source).forEach((key) => {
            const sourceValue = source[key];
            const targetValue = target[key];

            if (Array.isArray(sourceValue)) {
                // Merge arrays and remove duplicates
                target[key] = [
                    ...new Set([...(Array.isArray(targetValue) ? targetValue : []), ...sourceValue]),
                ];
            }
            else if (
                typeof sourceValue === 'object'
                && sourceValue !== null
                && !Array.isArray(sourceValue)
            ) {
                // Recursively merge objects
                target[key] = merge(
                    typeof targetValue === 'object' && !Array.isArray(targetValue)
                        ? targetValue
                        : {},
                    sourceValue,
                );
            }
            else {
                // Overwrite with primitive values
                target[key] = sourceValue;
            }
        });
        return target;
    };

    // Flatten configs and merge them
    return configs
        .flatMap(config => (Array.isArray(config) ? config : [config]))
        .reduce((acc, config) => merge(acc, config), {});
}

// Check if a string is valid JSON
export function isJson(str: string): boolean {
    try {
        JSON.parse(str);
        return true;
    }
    catch {
        return false;
    }
}

// Initialize slugify with fallback handling
const slugify = slugifyRaw.default || slugifyRaw;

// Generate a slug from a string with optional settings
export function generateSlug(str = '', options?: I_SlugifyOptions): string {
    const { lower = true, locale = 'vi', ...rest } = options || {};
    return slugify(str, { lower, locale, ...rest });
}

// Generate a short ID from a UUID using SHA256
export function generateShortId(uuid: string, length = 4): string {
    return cryptoJS.SHA256(uuid).toString(cryptoJS.enc.Hex).slice(0, length);
}

// Generate a query object for slug uniqueness validation
export function generateSlugQuery<D>(
    slug: string,
    filters: T_FilterQuery<D> = {},
    id?: string,
): T_GenerateSlugQueryResponse<D> {
    return {
        ...filters,
        ...(id && { id: { $ne: id } }), // Exclude the current document by ID
        $or: [
            { slug },
            { slugHistory: slug },
        ],
    };
}
