import { I_Config } from '../typescript/config.cjs';
export { localStorage } from './localStorage.cjs';
export { throwResponse } from './log.cjs';
export { generateModel, generateSchema, generateShortId, generateSlug, generateSlugQuery } from './mongoose.cjs';
export { serializer } from './serializer.cjs';
export { validate } from './validate.cjs';
export { default as aggregatePaginate } from 'mongoose-aggregate-paginate-v2';
export { default as mongoosePaginate } from 'mongoose-paginate-v2';
import '../typescript/log.cjs';
import '../typescript/mongoose.cjs';
import 'mongodb';
import 'mongoose';

declare function deepMerge(...configs: (I_Config | I_Config[])[]): I_Config;
declare function isJson(str: string): boolean;
declare function regexSearchMapper(str: string): string;
declare const removeAccent: (str: string) => string;

export { deepMerge, isJson, regexSearchMapper, removeAccent };
