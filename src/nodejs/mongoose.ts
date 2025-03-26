import type mongooseRaw from 'mongoose';

import { Document } from 'mongoose';
import aggregatePaginate from 'mongoose-aggregate-paginate-v2';
import mongoosePaginate from 'mongoose-paginate-v2';
import { v4 as uuidv4 } from 'uuid';

import type { I_Return } from '#typescript/api-response.js';
import type { T_DeleteResult, T_UpdateResult } from '#typescript/mongo.js';
import type {
    C_Document,
    I_CreateModelOptions,
    I_CreateSchemaOptions,
    I_DeleteOptionsExtended,
    I_ExtendedModel,
    I_GenericDocument,
    I_MongooseModelMiddleware,
    I_UpdateOptionsExtended,
    T_AggregatePaginateResult,
    T_CreateSlugQueryResponse,
    T_FilterQuery,
    T_Input_Populate,
    T_InsertManyOptions,
    T_MongoosePlugin,
    T_MongooseShema,
    T_PaginateOptionsWithPopulate,
    T_PaginateResult,
    T_PipelineStage,
    T_PopulateOptions,
    T_ProjectionType,
    T_QueryOptions,
    T_UpdateQuery,
} from '#typescript/mongoose.js';

import { RESPONSE_STATUS } from '#constants/response-status.js';
import { generateShortId, generateSlug } from '#utils/string.js';

export { aggregatePaginate, mongoosePaginate };

function applyPlugins<T>(schema: T_MongooseShema<T>, plugins: Array<T_MongoosePlugin | false>) {
    plugins
        .filter((plugin): plugin is T_MongoosePlugin => typeof plugin === 'function')
        .forEach(plugin => schema.plugin(plugin));
}

function applyMiddlewares<T extends Partial<C_Document>>(
    schema: T_MongooseShema<T>,
    middlewares: I_MongooseModelMiddleware<T>[],
) {
    middlewares.forEach(({ method, pre, post }) => {
        if (method && pre) {
            schema.pre(method as RegExp, pre);
        }

        if (method && post) {
            schema.post(method as RegExp, post);
        }
    });
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

export function createSchema<T extends Partial<C_Document>>({
    mongoose,
    schema,
    virtuals = [],
    standalone = false,
}: I_CreateSchemaOptions<T>): T_MongooseShema<T> {
    const createdSchema = new mongoose.Schema<T>(schema, { strict: true });

    virtuals.forEach(({ name, options, get }) => {
        const virtualInstance = createdSchema.virtual(name as string, options);
        if (get)
            virtualInstance.get(get);
    });

    if (!standalone) {
        createdSchema.add(createGenericSchema(mongoose));
    }

    return createdSchema;
}

export function createModel<T extends Partial<C_Document>>({
    mongoose,
    name,
    schema,
    pagination = false,
    aggregate = false,
    virtuals = [],
    middlewares = [],
}: I_CreateModelOptions<T>): I_ExtendedModel<T> {
    if (!name) {
        throw new Error('Model name is required.');
    }

    if (mongoose.models[name]) {
        return mongoose.models[name] as I_ExtendedModel<T>;
    }

    const createdSchema = createSchema({ mongoose, schema, virtuals });

    applyPlugins<T>(createdSchema, [
        pagination && mongoosePaginate,
        aggregate && aggregatePaginate,
    ]);

    applyMiddlewares<T>(createdSchema, middlewares);

    return mongoose.model<T>(name, createdSchema) as I_ExtendedModel<T>;
}

export function createSlugQuery<T>(
    slug: string,
    filters: T_FilterQuery<T> = {},
    id?: string,
): T_CreateSlugQueryResponse<T> {
    return {
        ...filters,
        ...(id && { id: { $ne: id } }),
        $or: [
            { slug },
            { slugHistory: slug },
        ],
    };
}

export class MongooseController<T extends Partial<C_Document>> {
    constructor(private model: I_ExtendedModel<T>) { }

    private getModelName(): string {
        return this.model.modelName;
    }

    async findOne(
        filter: T_FilterQuery<T> = {},
        projection: T_ProjectionType<T> = {},
        options: T_QueryOptions<T> = {},
        populate?: T_Input_Populate,
    ): Promise<I_Return<T>> {
        try {
            const query = this.model.findOne(filter, projection, options);

            if (populate) {
                query.populate(populate as T_PopulateOptions);
            }

            const result = await query.exec();

            if (!result) {
                return {
                    success: false,
                    message: `No ${this.getModelName()} found.`,
                    code: RESPONSE_STATUS.NOT_FOUND.CODE,
                };
            }

            return { success: true, result };
        }
        catch (error) {
            return {
                success: false,
                message: (error as Error).message,
                code: RESPONSE_STATUS.INTERNAL_SERVER_ERROR.CODE,
            };
        }
    }

    async findAll(
        filter: T_FilterQuery<T> = {},
        projection: T_ProjectionType<T> = {},
        options: T_QueryOptions<T> = {},
        populate?: T_Input_Populate,
    ): Promise<I_Return<T[]>> {
        try {
            const query = this.model.find(filter, projection, options);

            if (populate) {
                query.populate(populate as T_PopulateOptions);
            }

            const result = await query.exec();

            return { success: true, result };
        }
        catch (error) {
            return {
                success: false,
                message: (error as Error).message,
                code: RESPONSE_STATUS.INTERNAL_SERVER_ERROR.CODE,
            };
        }
    }

    async findPaging(
        filter: T_FilterQuery<T> = {},
        options: T_PaginateOptionsWithPopulate = {},
    ): Promise<I_Return<T_PaginateResult<T>>> {
        try {
            const result = await this.model.paginate(filter, options);

            return { success: true, result };
        }
        catch (error) {
            return {
                success: false,
                message: (error as Error).message,
                code: RESPONSE_STATUS.INTERNAL_SERVER_ERROR.CODE,
            };
        }
    }

    async findPagingAggregate(
        pipeline: T_PipelineStage[],
        options: T_PaginateOptionsWithPopulate = {},
    ): Promise<I_Return<T_AggregatePaginateResult<T>>> {
        try {
            const result = await this.model.aggregatePaginate(
                this.model.aggregate(pipeline),
                options,
            );

            return { success: true, result };
        }
        catch (error) {
            return {
                success: false,
                message: (error as Error).message,
                code: RESPONSE_STATUS.INTERNAL_SERVER_ERROR.CODE,
            };
        }
    }

    async count(filter: T_FilterQuery<T> = {}): Promise<I_Return<number>> {
        try {
            const result = await this.model.countDocuments(filter);

            return { success: true, result };
        }
        catch (error) {
            return {
                success: false,
                message: (error as Error).message,
                code: RESPONSE_STATUS.INTERNAL_SERVER_ERROR.CODE,
            };
        }
    }

    async createOne(doc: T | Partial<T>): Promise<I_Return<T>> {
        try {
            const result = await this.model.create(doc);

            return { success: true, result };
        }
        catch (error) {
            return {
                success: false,
                message: (error as Error).message,
                code: RESPONSE_STATUS.INTERNAL_SERVER_ERROR.CODE,
            };
        }
    }

    async createMany(
        docs: (T | Partial<T>)[],
        options: T_InsertManyOptions = {},
    ): Promise<I_Return<T[]>> {
        try {
            const createdDocuments = await this.model.insertMany(docs, options);

            const result = createdDocuments
                .map((doc) => {
                    if (doc instanceof Document) {
                        return doc.toObject() as T;
                    }

                    return null;
                })
                .filter((doc): doc is T => doc !== null);

            return { success: true, result };
        }
        catch (error) {
            return {
                success: false,
                message: (error as Error).message,
                code: RESPONSE_STATUS.INTERNAL_SERVER_ERROR.CODE,
            };
        }
    }

    async updateOne(
        filter: T_FilterQuery<T> = {},
        update: T_UpdateQuery<T> = {},
        options: I_UpdateOptionsExtended = {},
    ): Promise<I_Return<T>> {
        try {
            const result = await this.model
                .findOneAndUpdate(filter, update, {
                    new: true,
                    ...options,
                })
                .exec();

            if (!result) {
                return {
                    success: false,
                    message: `Failed to update ${this.getModelName()}.`,
                    code: RESPONSE_STATUS.NOT_FOUND.CODE,
                };
            }

            return { success: true, result };
        }
        catch (error) {
            return {
                success: false,
                message: (error as Error).message,
                code: RESPONSE_STATUS.INTERNAL_SERVER_ERROR.CODE,
            };
        }
    }

    async updateMany(
        filter: T_FilterQuery<T> = {},
        update: T_UpdateQuery<T> = {},
        options: I_UpdateOptionsExtended = {},
    ): Promise<I_Return<T_UpdateResult>> {
        try {
            const result = await this.model
                .updateMany(filter, update, options)
                .exec();

            return { success: true, result };
        }
        catch (error) {
            return {
                success: false,
                message: (error as Error).message,
                code: RESPONSE_STATUS.INTERNAL_SERVER_ERROR.CODE,
            };
        }
    }

    async deleteOne(
        filter: T_FilterQuery<T> = {},
        options: I_DeleteOptionsExtended = {},
    ): Promise<I_Return<T>> {
        try {
            const result = await this.model
                .findOneAndDelete(filter, options)
                .exec();

            if (!result) {
                return {
                    success: false,
                    message: `No ${this.getModelName()} found to delete.`,
                    code: RESPONSE_STATUS.NOT_FOUND.CODE,
                };
            }

            return { success: true, result };
        }
        catch (error) {
            return {
                success: false,
                message: (error as Error).message,
                code: RESPONSE_STATUS.INTERNAL_SERVER_ERROR.CODE,
            };
        }
    }

    async deleteMany(
        filter: T_FilterQuery<T> = {},
        options: I_DeleteOptionsExtended = {},
    ): Promise<I_Return<T_DeleteResult>> {
        try {
            const result = await this.model.deleteMany(filter, options).exec();

            if (result.deletedCount === 0) {
                return {
                    success: false,
                    message: `No documents found to delete.`,
                    code: RESPONSE_STATUS.NOT_FOUND.CODE,
                };
            }

            return { success: true, result };
        }
        catch (error) {
            return {
                success: false,
                message: (error as Error).message,
                code: RESPONSE_STATUS.INTERNAL_SERVER_ERROR.CODE,
            };
        }
    }

    async createShortId(id: string, length = 4): Promise<I_Return<string>> {
        const maxRetries = 10;
        const existingShortIds = new Set();

        for (let retries = 0; retries < maxRetries; retries++) {
            const shortId = generateShortId(id, retries + length);

            if (!existingShortIds.has(shortId)) {
                existingShortIds.add(shortId);

                const shortIdExists = await this.model.exists({ shortId });

                if (!shortIdExists) {
                    return { success: true, result: shortId };
                }
            }
        }

        return {
            success: false,
            message: 'Failed to create a unique shortId',
            code: RESPONSE_STATUS.INTERNAL_SERVER_ERROR.CODE,
        };
    }

    async createSlug(
        fieldName: string,
        fields: T,
        filters: T_FilterQuery<T> = {},
    ): Promise<I_Return<string | { [key: string]: string }>> {
        try {
            const fieldValue = fields[fieldName as keyof T];

            const createUniqueSlug = async (slug: string): Promise<string> => {
                let existingDoc = await this.model.findOne(
                    createSlugQuery<T>(slug, filters, fields.id),
                );

                if (!existingDoc)
                    return slug;

                let suffix = 1;
                let uniqueSlug;

                do {
                    uniqueSlug = `${slug}-${suffix}`;
                    existingDoc = await this.model.findOne(
                        createSlugQuery<T>(uniqueSlug, filters, fields.id),
                    );
                    suffix++;
                } while (existingDoc);

                return uniqueSlug;
            };

            if (typeof fieldValue === 'object') {
                const slugResults: { [key: string]: string } = {};

                for (const lang in fieldValue) {
                    const slug = generateSlug(fieldValue[lang] as string);
                    slugResults[lang] = await createUniqueSlug(slug);
                }

                return { success: true, result: slugResults };
            }
            else {
                const slug = generateSlug(fieldValue as string);
                const uniqueSlug = await createUniqueSlug(slug);

                return { success: true, result: uniqueSlug };
            }
        }
        catch (error) {
            return {
                success: false,
                message: `Failed to create a unique slug: ${(error as Error).message}`,
                code: RESPONSE_STATUS.INTERNAL_SERVER_ERROR.CODE,
            };
        }
    }

    async aggregate(pipeline: T_PipelineStage[]): Promise<I_Return<T[]>> {
        try {
            const result = await this.model.aggregate<T>(pipeline);

            return { success: true, result };
        }
        catch (error) {
            return { success: false, message: (error as Error).message, code: RESPONSE_STATUS.INTERNAL_SERVER_ERROR.CODE };
        }
    }
}

export const validateMongooseField = {
    isEmpty(value: unknown): boolean {
        if (value === null || value === undefined) {
            return true;
        }

        if (Array.isArray(value)) {
            return value.length === 0;
        }

        if (typeof value === 'object') {
            if (value instanceof Date) {
                return false;
            }
            return Object.keys(value).length === 0;
        }

        if (typeof value === 'string') {
            return value.trim().length === 0;
        }

        return false;
    },
    isEmptyValidator<T>(): (this: T, value: unknown) => Promise<boolean> {
        return async function (this: T, value: unknown): Promise<boolean> {
            return !validateMongooseField.isEmpty(value);
        };
    },
    isUniqueValidator<T extends { constructor: { findOne: (query: Record<string, unknown>) => Promise<unknown> } }>(fields: string[]) {
        return async function (this: T, value: unknown): Promise<boolean> {
            if (!Array.isArray(fields) || fields.length === 0) {
                throw new Error('Fields must be a non-empty array of strings.');
            }

            const query = { $or: fields.map(field => ({ [field]: value })) };
            const existingDocument = await this.constructor.findOne(query);

            return !existingDocument;
        };
    },
    matchesRegexValidator(regexArray: RegExp[]): (value: string) => Promise<boolean> {
        return async function (value: string): Promise<boolean> {
            if (!Array.isArray(regexArray) || regexArray.some(r => !(r instanceof RegExp))) {
                throw new Error('regexArray must be an array of valid RegExp objects.');
            }

            return regexArray.every(regex => regex.test(value));
        };
    },
};
