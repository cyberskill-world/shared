import { I_Config } from '../typescript/config.js';
export { clearExpiredErrorLists, getStoredErrorLists, saveErrorListToStorage } from './command-error.js';
export { displayResults } from './command-log.js';
export { runWithSpinner } from './command-spinner.js';
export { executeCommand, logProcessStep } from './command.js';
export { localStorage } from './local-storage.js';
export { throwResponse } from './log.js';
export { generateModel, generateSchema, generateShortId, generateSlug, generateSlugQuery } from './mongoose.js';
export { getLatestPackageVersion, isPackageOutdated, updatePackage } from './npm-package.js';
export { serializer } from './serializer.js';
export { validate } from './validate.js';
export { default as aggregatePaginate } from 'mongoose-aggregate-paginate-v2';
export { default as mongoosePaginate } from 'mongoose-paginate-v2';
import '../typescript/command.js';
import '../typescript/log.js';
import '../typescript/mongoose.js';
import 'mongodb';
import 'mongoose';

declare function deepMerge(...configs: (I_Config | I_Config[])[]): I_Config;
declare function isJson(str: string): boolean;
declare function regexSearchMapper(str: string): string;
declare const removeAccent: (str: string) => string;

export { deepMerge, isJson, regexSearchMapper, removeAccent };
