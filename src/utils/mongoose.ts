import type mongooseRaw from 'mongoose';

import cryptoJS from 'crypto-js';
import aggregatePaginate from 'mongoose-aggregate-paginate-v2';
import mongoosePaginate from 'mongoose-paginate-v2';
import slugifyRaw from 'slugify';
import { v4 as uuidv4 } from 'uuid';

import type {
    C_Document,
    I_ExtendedModel,
    I_GenerateModelOptions,
    I_GenerateSchemaOptions,
    I_GenericDocument,
    I_MongooseModelMiddleware,
    I_SlugifyOptions,
    T_FilterQuery,
    T_GenerateSlugQueryResponse,
    T_MongoosePlugin,
    T_MongooseShema,
} from '../typescript/mongoose.js';

import { getMongoDateTime } from './datetime.js';

export { aggregatePaginate, mongoosePaginate };

function applyPlugins<D>(schema: T_MongooseShema<D>, plugins: Array<T_MongoosePlugin | false>) {
    plugins
        .filter((plugin): plugin is T_MongoosePlugin => typeof plugin === 'function')
        .forEach(plugin => schema.plugin(plugin));
}

function applyMiddlewares<D>(
    schema: T_MongooseShema<D>,
    middlewares: I_MongooseModelMiddleware[],
) {
    middlewares.forEach(({ method, fn }) =>
        schema.pre(method as RegExp | 'createCollection', fn),
    );
}

function createGenericSchema(mongoose: typeof mongooseRaw) {
    return new mongoose.Schema<I_GenericDocument>(
        {
            id: { type: String, default: uuidv4, required: true, unique: true },
            isDel: { type: Boolean, default: false, required: true },
        },
        { timestamps: true },
    );
}

export function generateSchema<D extends Partial<C_Document>>({
    mongoose,
    schema,
    virtuals = [],
    standalone = false,
}: I_GenerateSchemaOptions<D>): T_MongooseShema<D> {
    const generatedSchema = new mongoose.Schema<D>(schema, { strict: true });

    virtuals.forEach(({ name, options, get }) => {
        const virtualInstance = generatedSchema.virtual(name as string, options);
        if (get)
            virtualInstance.get(get);
    });

    if (!standalone) {
        generatedSchema.add(createGenericSchema(mongoose));
    }

    return generatedSchema;
}

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

    if (mongoose.models[name]) {
        return mongoose.models[name] as I_ExtendedModel<D>;
    }

    const generatedSchema = generateSchema({ mongoose, schema, virtuals });

    applyPlugins<D>(generatedSchema, [
        pagination && mongoosePaginate,
        aggregate && aggregatePaginate,
    ]);

    applyMiddlewares<D>(generatedSchema, middlewares);

    return mongoose.model<D>(name, generatedSchema) as I_ExtendedModel<D>;
}

const slugify = slugifyRaw.default || slugifyRaw;

export function generateSlug(str = '', options?: I_SlugifyOptions): string {
    const { lower = true, locale = 'vi', ...rest } = options || {};
    return slugify(str, { lower, locale, ...rest });
}

export function generateShortId(uuid: string, length = 4): string {
    return cryptoJS.SHA256(uuid).toString(cryptoJS.enc.Hex).slice(0, length);
}

export function generateSlugQuery<D>(
    slug: string,
    filters: T_FilterQuery<D> = {},
    id?: string,
): T_GenerateSlugQueryResponse<D> {
    return {
        ...filters,
        ...(id && { id: { $ne: id } }),
        $or: [
            { slug },
            { slugHistory: slug },
        ],
    };
}

export function getMongoGenericFields<T extends 'date' | 'string'>({
    isNew = true,
    returnDateAs = 'string' as T,
}: { isNew?: boolean; returnDateAs?: T } = {}): {
        id?: string;
        isDel: boolean;
        createdAt: T extends 'string' ? string : Date;
        updatedAt: T extends 'string' ? string : Date;
    } {
    const now = (returnDateAs === 'string' ? getMongoDateTime() : new Date()) as T extends 'string' ? string : Date;

    return {
        ...(isNew && { id: uuidv4() }),
        isDel: false,
        createdAt: now,
        updatedAt: now,
    };
}
