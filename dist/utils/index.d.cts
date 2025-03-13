import { I_Config } from '../typescript/config.cjs';
export { clearAllErrorLists, getStoredErrorLists, saveErrorListToStorage } from './command-error.cjs';
export { log } from './command-log.cjs';
export { executeCommand } from './command.cjs';
export { throwResponse } from './log.cjs';
export { generateModel, generateSchema, generateShortId, generateSlug, generateSlugQuery } from './mongoose.cjs';
export { getLatestPackageVersion, isCurrentProject, isPackageOutdated, updatePackage } from './npm-package.cjs';
export { serializer } from './serializer.cjs';
export { storage } from './storage.cjs';
export { validate } from './validate.cjs';
export { default as aggregatePaginate } from 'mongoose-aggregate-paginate-v2';
export { default as mongoosePaginate } from 'mongoose-paginate-v2';
import '../typescript/command.cjs';
import 'chalk';
import '../typescript/log.cjs';
import '../typescript/mongoose.cjs';
import 'mongodb';
import 'mongoose';
import '../typescript/serializer.cjs';

declare function deepMerge(...configs: (I_Config | I_Config[])[]): I_Config;
declare function isJson(str: string): boolean;
declare function regexSearchMapper(str: string): string;
declare const removeAccent: (str: string) => string;

export { deepMerge, isJson, regexSearchMapper, removeAccent };
