import mongooseRaw from 'mongoose';
import aggregatePaginate from 'mongoose-aggregate-paginate-v2';
import mongoosePaginate from 'mongoose-paginate-v2';
import { v4 as uuidv4 } from 'uuid';

import {
    C_Document,
    I_ExtendedModel,
    I_GenerateModelOptions,
    I_GenerateSchemaOptions,
    I_GenericDocument,
    I_MongooseModelMiddleware,
    T_MongooseShema,
} from '../typescript/mongoose.js';

/**
 * Apply plugins to a schema.
 * @param schema - The schema to enhance.
 * @param plugins - List of plugins to apply.
 */
function applyPlugins<D>(schema: T_MongooseShema<D>, plugins: Array<any>) {
    plugins.forEach(plugin => plugin && schema.plugin(plugin));
}

/**
 * Apply middlewares to a schema.
 * @param schema - The schema to enhance.
 * @param middlewares - Middleware functions to add.
 */
function applyMiddlewares<D>(
    schema: T_MongooseShema<D>,
    middlewares: I_MongooseModelMiddleware[],
) {
    middlewares.forEach(({ method, fn }) =>
        schema.pre(method as RegExp | 'createCollection', fn),
    );
}

/**
 * Create a generic schema with common fields like `id` and `isDel`.
 * @param mongoose - The mongoose instance.
 * @returns Schema object.
 */
function createGenericSchema(mongoose: typeof mongooseRaw) {
    return new mongoose.Schema<I_GenericDocument>(
        {
            id: { type: String, default: uuidv4, required: true, unique: true },
            isDel: { type: Boolean, default: false, required: true },
        },
        { timestamps: true },
    );
}

/**
 * Generate a mongoose schema with optional virtuals and generic fields.
 * @param options - Schema generation options.
 * @param options.mongoose - The mongoose instance.
 * @param options.schema - The schema definition.
 * @param options.virtuals - List of virtual fields.
 * @param options.standalone - Whether to include generic fields.
 * @returns Enhanced schema.
 */
export function generateSchema<D extends Partial<C_Document>>({
    mongoose,
    schema,
    virtuals = [],
    standalone = false,
}: I_GenerateSchemaOptions<D>): T_MongooseShema<D> {
    const generatedSchema = new mongoose.Schema<D>(schema, { strict: true });

    // Add virtuals if provided
    virtuals.forEach(({ name, options, get }) => {
        const virtualInstance = generatedSchema.virtual(name as string, options);
        if (get)
            virtualInstance.get(get);
    });

    // Include generic schema if standalone is false
    if (!standalone) {
        generatedSchema.add(createGenericSchema(mongoose));
    }

    return generatedSchema;
}

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
export function generateModel<D extends Partial<C_Document>>({
    mongoose,
    name,
    schema,
    pagination = false,
    aggregate = false,
    virtuals = [],
    middlewares = [],
}: I_GenerateModelOptions<D>): I_ExtendedModel<D> {
    if (!name) {
        throw new Error('Model name is required.');
    }

    // Return existing model if already defined
    if (mongoose.models[name]) {
        return mongoose.models[name] as I_ExtendedModel<D>;
    }

    // Create schema with optional enhancements
    const generatedSchema = generateSchema({ mongoose, schema, virtuals });

    // Apply plugins if enabled
    applyPlugins<D>(generatedSchema, [
        pagination && mongoosePaginate,
        aggregate && aggregatePaginate,
    ]);

    // Apply middlewares
    applyMiddlewares<D>(generatedSchema, middlewares);

    // Create and return the model
    return mongoose.model<D>(name, generatedSchema) as I_ExtendedModel<D>;
}
