export { default as aggregatePaginate } from 'mongoose-aggregate-paginate-v2';
export { default as mongoosePaginate } from 'mongoose-paginate-v2';
import { C_Document, I_GenerateSchemaOptions, T_MongooseShema, I_GenerateModelOptions, I_ExtendedModel, I_SlugifyOptions, T_FilterQuery, T_GenerateSlugQueryResponse } from '../typescript/mongoose.cjs';
import 'mongodb';
import 'mongoose';

declare function generateSchema<D extends Partial<C_Document>>({ mongoose, schema, virtuals, standalone, }: I_GenerateSchemaOptions<D>): T_MongooseShema<D>;
declare function generateModel<D extends Partial<C_Document>>({ mongoose, name, schema, pagination, aggregate, virtuals, middlewares, }: I_GenerateModelOptions<D>): I_ExtendedModel<D>;
declare function generateSlug(str?: string, options?: I_SlugifyOptions): string;
declare function generateShortId(uuid: string, length?: number): string;
declare function generateSlugQuery<D>(slug: string, filters?: T_FilterQuery<D>, id?: string): T_GenerateSlugQueryResponse<D>;
declare function getMongoGenericFields<T extends 'date' | 'string'>({ isNew, returnDateAs, }?: {
    isNew?: boolean;
    returnDateAs?: T;
}): {
    id?: string;
    isDel: boolean;
    createdAt: T extends 'string' ? string : Date;
    updatedAt: T extends 'string' ? string : Date;
};

export { generateModel, generateSchema, generateShortId, generateSlug, generateSlugQuery, getMongoGenericFields };
