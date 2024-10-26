import cryptoJS from 'crypto-js';
import slugifyRaw from 'slugify';

import {
    I_SlugifyOptions,
    T_Config,
    T_FilterQuery,
} from '../typescript/index.js';

export * from './log.js';
export * from './mongoose.js';
export * from './validate.js';

export const deepMerge = (...configs: (T_Config | T_Config[])[]): T_Config => {
    const merge = (target: T_Config, source: T_Config): T_Config => {
        for (const key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
                if (Array.isArray(source[key])) {
                    // If the value is an array, concatenate arrays and remove duplicates
                    const targetArray = Array.isArray(target[key])
                        ? target[key]
                        : [];
                    target[key] = [
                        ...new Set([...targetArray, ...source[key]]),
                    ];
                } else if (
                    typeof source[key] === 'object' &&
                    source[key] !== null &&
                    !Array.isArray(source[key])
                ) {
                    // If the value is an object (but not null), recursively merge
                    target[key] = merge(
                        typeof target[key] === 'object' &&
                            !Array.isArray(target[key])
                            ? target[key]
                            : {},
                        source[key],
                    );
                } else {
                    // Otherwise, directly assign the value (primitives: string, number, boolean)
                    target[key] = source[key];
                }
            }
        }

        return target;
    };

    // Handle the case where the input is an array of objects or just one object
    const flattenedConfigs = configs.flatMap((config) =>
        Array.isArray(config) ? config : [config],
    );

    return flattenedConfigs.reduce((acc, config) => merge(acc, config), {});
};

export const isJson = (str: string): boolean => {
    try {
        JSON.parse(str);

        return true;
    } catch {
        return false;
    }
};

const slugify = slugifyRaw.default || slugifyRaw;

export const generateSlug = (
    str?: string,
    options?: I_SlugifyOptions,
): string => {
    if (!str) {
        return '';
    }

    const { lower = true, locale = 'vi' } = options || {};

    return slugify(str, {
        lower,
        locale,
        ...options,
    });
};

export const generateShortId = (uuid: string, length = 4) => {
    return cryptoJS.SHA256(uuid).toString(cryptoJS.enc.Hex).substr(0, length);
};

export const generateSlugQuery = <D>(
    slug: string,
    filters: T_FilterQuery<D> = {},
    id?: string,
) => ({
    ...(filters && { ...filters }),
    ...(id && { id: { $ne: id } }),
    $or: [
        {
            slug,
        },
        {
            slugHistory: slug,
        },
    ],
});
