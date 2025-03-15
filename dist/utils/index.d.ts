export { clearAllErrorLists, commandLog, executeCommand, getStoredErrorLists, saveErrorListToStorage } from './command.js';
export { deepMerge } from './config.js';
export { getMongoDateTime } from './datetime.js';
export { fileExists } from './fs.js';
export { throwResponse } from './log.js';
export { generateModel, generateSchema, generateShortId, generateSlug, generateSlugQuery, getMongoGenericFields } from './mongoose.js';
export { getLatestPackageVersion, isCurrentProject, isPackageOutdated, updatePackage } from './npm-package.js';
export { serializer } from './serializer.js';
export { storage, storageDir } from './storage.js';
export { validate } from './validate.js';
export { default as aggregatePaginate } from 'mongoose-aggregate-paginate-v2';
export { default as mongoosePaginate } from 'mongoose-paginate-v2';
import '../typescript/command.js';
import '../typescript/config.js';
import '../typescript/log.js';
import '../typescript/mongoose.js';
import 'mongodb';
import 'mongoose';
import '../typescript/serializer.js';

declare function isJson(str: string): boolean;
declare function regexSearchMapper(str: string): string;
declare const removeAccent: (str: string) => string;

export { isJson, regexSearchMapper, removeAccent };
