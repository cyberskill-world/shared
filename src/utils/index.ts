import unorm from 'unorm';

import type {
    I_Config,
} from '../typescript/index.js';

export * from './command-error.js';
export * from './command-log.js';
export * from './command.js';
export * from './log.js';
export * from './mongoose.js';
export * from './npm-package.js';
export * from './serializer.js';
export * from './storage.js';
export * from './validate.js';

// Utility to deeply merge configurations
export function deepMerge(...configs: (I_Config | I_Config[])[]): I_Config {
    const merge = (target: I_Config, source: I_Config): I_Config => {
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

export function regexSearchMapper(str: string) {
    str = unorm.nfkc(str);
    str = str.replace(/[aàáạảãâầấậẩẫăằắặẳẵ]/g, '(a|à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ)');
    str = str.replace(/[eèéẹẻẽêềếệểễ]/g, '(e|è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ)');
    str = str.replace(/[iìíịỉĩ]/g, '(i|ì|í|ị|ỉ|ĩ)');
    str = str.replace(/[oòóọỏõôồốộổỗơờớợởỡ]/g, '(o|ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ)');
    str = str.replace(/[uùúụủũưừứựửữ]/g, '(u|ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ)');
    str = str.replace(/[yỳýỵỷỹ]/g, '(y|ỳ|ý|ỵ|ỷ|ỹ)');
    str = str.replace(/d|đ/g, '(d|đ)');
    str = str.replace(/[AÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴ]/g, '(A|À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ)');
    str = str.replace(/[EÈÉẸẺẼÊỀẾỆỂỄ]/g, '(E|È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ)');
    str = str.replace(/[IÌÍỊỈĨ]/g, '(I|Ì|Í|Ị|Ỉ|Ĩ)');
    str = str.replace(/[OÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠ]/g, '(O|Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ)');
    str = str.replace(/[UÙÚỤỦŨƯỪỨỰỬỮ]/g, '(U|Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ)');
    str = str.replace(/[YỲÝỴỶỸ]/g, '(Y|Ỳ|Ý|Ỵ|Ỷ|Ỹ)');
    str = str.replace(/D|Đ/g, '(D|Đ)');

    return str;
}

export const removeAccent = (str: string) => str.normalize('NFD').replace(/\p{Diacritic}/gu, '');
