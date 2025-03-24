import type mongooseRaw from 'mongoose';

import cryptoJS from 'crypto-js';
import { Document } from 'mongoose';
import aggregatePaginate from 'mongoose-aggregate-paginate-v2';
import mongoosePaginate from 'mongoose-paginate-v2';
import slugifyRaw from 'slugify';
import { v4 as uuidv4 } from 'uuid';

import type {
    C_Document,
    I_DeleteOptionsExtended,
    I_ExtendedModel,
    I_GenerateModelOptions,
    I_GenerateSchemaOptions,
    I_GenericDocument,
    I_MongooseModelMiddleware,
    I_Return,
    I_SlugifyOptions,
    I_UpdateOptionsExtended,
    T_AggregatePaginateResult,
    T_DeleteResult,
    T_FilterQuery,
    T_GenerateSlugQueryResponse,
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
    T_UpdateResult,
} from '#typescript/mongoose.js';

import { RESPONSE_STATUS } from '#constants/response-status.js';

export class MongooseController<D extends Partial<C_Document>> {
    constructor(private model: I_ExtendedModel<D>) { }

    private getModelName(): string {
        return this.model.modelName;
    }

    async findOne(
        filter: T_FilterQuery<D> = {},
        projection: T_ProjectionType<D> = {},
        options: T_QueryOptions<D> = {},
        populate?: T_Input_Populate,
    ): Promise<I_Return<D>> {
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
        filter: T_FilterQuery<D> = {},
        projection: T_ProjectionType<D> = {},
        options: T_QueryOptions<D> = {},
        populate?: T_Input_Populate,
    ): Promise<I_Return<D[]>> {
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
        filter: T_FilterQuery<D> = {},
        options: T_PaginateOptionsWithPopulate = {},
    ): Promise<I_Return<T_PaginateResult<D>>> {
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
    ): Promise<I_Return<T_AggregatePaginateResult<D>>> {
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

    async count(filter: T_FilterQuery<D> = {}): Promise<I_Return<number>> {
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

    async createOne(doc: D | Partial<D>): Promise<I_Return<D>> {
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
        docs: (D | Partial<D>)[],
        options: T_InsertManyOptions = {},
    ): Promise<I_Return<D[]>> {
        try {
            const createdDocuments = await this.model.insertMany(docs, options);

            const result = createdDocuments
                .map((doc) => {
                    if (doc instanceof Document) {
                        return doc.toObject() as D;
                    }

                    return null;
                })
                .filter((doc): doc is D => doc !== null);

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
        filter: T_FilterQuery<D> = {},
        update: T_UpdateQuery<D> = {},
        options: I_UpdateOptionsExtended = {},
    ): Promise<I_Return<D>> {
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
        filter: T_FilterQuery<D> = {},
        update: T_UpdateQuery<D> = {},
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
        filter: T_FilterQuery<D> = {},
        options: I_DeleteOptionsExtended = {},
    ): Promise<I_Return<D>> {
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
        filter: T_FilterQuery<D> = {},
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

    async generateShortId(id: string): Promise<I_Return<string>> {
        const maxRetries = 10;
        const existingShortIds = new Set();

        for (let retries = 0; retries < maxRetries; retries++) {
            const shortId = generateShortId(id, retries + 4);

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
            message: 'Failed to generate a unique shortId',
            code: RESPONSE_STATUS.INTERNAL_SERVER_ERROR.CODE,
        };
    }

    async generateSlug(
        fieldName: string,
        fields: D,
        filters: T_FilterQuery<D> = {},
    ): Promise<I_Return<string>> {
        try {
            const slug = generateSlug(fields[fieldName as keyof D] as string);

            let existingDoc = await this.model.findOne(
                generateSlugQuery<D>(slug, filters, fields.id),
            );

            if (!existingDoc) {
                return { success: true, result: slug };
            }

            let suffix = 1;
            let uniqueSlug;

            do {
                uniqueSlug = `${slug}-${suffix}`;
                existingDoc = await this.model.findOne(
                    generateSlugQuery<D>(uniqueSlug, filters, fields.id),
                );
                suffix++;
            } while (existingDoc);

            return { success: true, result: uniqueSlug };
        }
        catch (error) {
            return {
                success: false,
                message: `Failed to generate a unique slug: ${(error as Error).message}`,
                code: RESPONSE_STATUS.INTERNAL_SERVER_ERROR.CODE,
            };
        }
    }

    async aggregate(pipeline: T_PipelineStage[]): Promise<I_Return<D[]>> {
        try {
            const result = await this.model.aggregate<D>(pipeline);

            return { success: true, result };
        }
        catch (error) {
            return { success: false, message: (error as Error).message, code: RESPONSE_STATUS.INTERNAL_SERVER_ERROR.CODE };
        }
    }
}

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
