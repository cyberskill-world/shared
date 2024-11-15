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

// Utility to apply plugins to a schema
function applyPlugins<D>(schema: T_MongooseShema<D>, plugins: Array<any>) {
    plugins.forEach(plugin => schema.plugin(plugin));
}

// Utility to apply middlewares to a schema
function applyMiddlewares<D>(
    schema: T_MongooseShema<D>,
    middlewares: I_MongooseModelMiddleware[],
) {
    middlewares.forEach(({ method, fn }) => schema.pre(method as RegExp | 'createCollection', fn));
}

// Generic schema generation for reusable fields like `id` and `isDel`
function createGenericSchema(mongoose: typeof mongooseRaw) {
    const defaultUUID = () => uuidv4();

    return new mongoose.Schema<I_GenericDocument>(
        {
            id: { type: String, default: defaultUUID, required: true, unique: true },
            isDel: { type: Boolean, default: false, required: true },
        },
        { timestamps: true },
    );
}

// Schema generator with support for virtuals and optional generic schema inclusion
export function generateSchema<D extends Partial<C_Document>>({
    mongoose,
    schema,
    virtuals = [],
    standalone = false,
}: I_GenerateSchemaOptions<D>): T_MongooseShema<D> {
    if (!Array.isArray(virtuals)) {
        throw new TypeError('Virtuals must be an array of objects.');
    }

    const generatedSchema = new mongoose.Schema<D>(schema, { strict: true });

    // Add virtuals to schema
    virtuals.forEach((virtual) => {
        const virtualInstance = generatedSchema.virtual(
            virtual.name as string,
            virtual.options,
        );
        if (virtual.get) {
            virtualInstance.get(virtual.get);
        }
    });

    // Add generic schema if not standalone
    if (!standalone) {
        generatedSchema.add(createGenericSchema(mongoose));
    }

    return generatedSchema;
}

// Model generator with optional pagination, aggregation, and middleware support
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

    // Return existing model if already created
    if (mongoose.models[name]) {
        return mongoose.models[name] as I_ExtendedModel<D>;
    }

    // Generate schema
    const generatedSchema = generateSchema({
        mongoose,
        schema,
        virtuals,
    });

    // Apply plugins
    applyPlugins<D>(generatedSchema, [
        pagination && mongoosePaginate,
        aggregate && aggregatePaginate,
    ].filter(Boolean));

    // Apply middlewares
    applyMiddlewares<D>(generatedSchema, middlewares);

    // Create and return model
    return mongoose.model<D>(name, generatedSchema) as I_ExtendedModel<D>;
}
