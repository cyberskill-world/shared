export { default as aggregatePaginate } from 'mongoose-aggregate-paginate-v2';
export { default as mongoosePaginate } from 'mongoose-paginate-v2';
import { C_Document, I_GenerateSchemaOptions, T_MongooseShema, I_GenerateModelOptions, I_ExtendedModel, I_SlugifyOptions, T_FilterQuery, T_GenerateSlugQueryResponse } from '../typescript/mongoose.js';
import 'mongodb';
import 'mongoose';

/**
 * Generate a mongoose schema with optional virtuals and generic fields.
 * @param options - Schema generation options.
 * @param options.mongoose - The mongoose instance.
 * @param options.schema - The schema definition.
 * @param options.virtuals - List of virtual fields.
 * @param options.standalone - Whether to include generic fields.
 * @returns Enhanced schema.
 */
declare function generateSchema<D extends Partial<C_Document>>({ mongoose, schema, virtuals, standalone, }: I_GenerateSchemaOptions<D>): T_MongooseShema<D>;
/**
 * Generate a mongoose model with optional pagination, aggregation, and middleware.
 * @param options - Model generation options.
 * @param options.mongoose - The mongoose instance.
 * @param options.name - The name of the model.
 * @param options.schema - The schema definition.
 * @param options.pagination - Whether to enable pagination plugin.
 * @param options.aggregate - Whether to enable aggregate pagination plugin.
 * @param options.virtuals - List of virtual fields.
 * @param options.middlewares - Middleware functions to add.
 * @returns Mongoose model.
 */
declare function generateModel<D extends Partial<C_Document>>({ mongoose, name, schema, pagination, aggregate, virtuals, middlewares, }: I_GenerateModelOptions<D>): I_ExtendedModel<D>;
declare function generateSlug(str?: string, options?: I_SlugifyOptions): string;
declare function generateShortId(uuid: string, length?: number): string;
declare function generateSlugQuery<D>(slug: string, filters?: T_FilterQuery<D>, id?: string): T_GenerateSlugQueryResponse<D>;

export { generateModel, generateSchema, generateShortId, generateSlug, generateSlugQuery };
