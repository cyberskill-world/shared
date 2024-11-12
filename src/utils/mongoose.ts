import type mongooseRaw from 'mongoose';
import type {
    C_Document,
    I_ExtendedModel,
    I_GenerateModelOptions,
    I_GenerateSchemaOptions,
    I_GenericDocument,
} from '../typescript/mongoose.js';
import aggregatePaginate from 'mongoose-aggregate-paginate-v2';
import mongoosePaginate from 'mongoose-paginate-v2';

import { v4 as uuidv4 } from 'uuid';

// Generic schema generation for reusable fields like `id` and `isDel`
function createGenericSchema(mongoose: typeof mongooseRaw) {
    return new mongoose.Schema<I_GenericDocument>(
        {
            id: { type: String, default: uuidv4, required: true, unique: true },
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
}: I_GenerateSchemaOptions<D>) {
    const generatedSchema = new mongoose.Schema<D>(schema);

    virtuals.forEach((virtual) => {
        const virtualInstance = generatedSchema.virtual(
            virtual.name,
            virtual.options,
        );

        if (virtual.get) {
            virtualInstance.get(virtual.get);
        }
    });

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
}: I_GenerateModelOptions<D>) {
    if (mongoose.models[name]) {
        return mongoose.models[name] as I_ExtendedModel<D>;
    }

    const generatedSchema = generateSchema({
        mongoose,
        schema,
        virtuals,
    });

    if (pagination) {
        generatedSchema.plugin(mongoosePaginate);
    }

    if (aggregate) {
        generatedSchema.plugin(aggregatePaginate);
    }

    middlewares.forEach(({ method, fn }) => generatedSchema.pre(method, fn));

    return mongoose.model<D>(name, generatedSchema) as I_ExtendedModel<D>;
}
