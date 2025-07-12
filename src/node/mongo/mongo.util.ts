import type mongooseRaw from 'mongoose';

import migrate from 'migrate-mongo';
import { Document } from 'mongoose';
import aggregatePaginate from 'mongoose-aggregate-paginate-v2';
import mongoosePaginate from 'mongoose-paginate-v2';
import { v4 as uuidv4 } from 'uuid';

import type { I_Return } from '#typescript/index.js';

import { RESPONSE_STATUS } from '#constant/index.js';
import { deepClone, getNestedValue, isObject, regexSearchMapper, setNestedValue } from '#util/index.js';
import { generateShortId, generateSlug } from '#util/string/index.js';
import { validate } from '#util/validate/index.js';

import type { C_Collection, C_Db, C_Document, I_CreateModelOptions, I_CreateSchemaOptions, I_DeleteOptionsExtended, I_ExtendedModel, I_GenericDocument, I_Input_CheckSlug, I_Input_CreateSlug, I_Input_GenerateSlug, I_MongooseModelMiddleware, I_UpdateOptionsExtended, T_AggregatePaginateResult, T_DeleteResult, T_Filter, T_FilterQuery, T_Input_Populate, T_InsertManyOptions, T_MongoosePlugin, T_MongooseShema, T_OptionalUnlessRequiredId, T_PaginateOptionsWithPopulate, T_PaginateResult, T_PipelineStage, T_PopulateOptions, T_ProjectionType, T_QueryOptions, T_UpdateQuery, T_UpdateResult, T_WithId } from './mongo.type.js';

import { appendFileSync, pathExistsSync, readFileSync, writeFileSync } from '../fs/index.js';
import { catchError } from '../log/index.js';
import { MIGRATE_MONGO_CONFIG, PATH } from '../path/index.js';

export { aggregatePaginate, mongoosePaginate };

export const mongo = {
    createGenericFields(): I_GenericDocument {
        return {
            id: uuidv4(),
            isDel: false,
            createdAt: new Date(),
            updatedAt: new Date(),
        };
    },
    applyPlugins<T>(schema: T_MongooseShema<T>, plugins: Array<T_MongoosePlugin | false>) {
        plugins
            .filter((plugin): plugin is T_MongoosePlugin => typeof plugin === 'function')
            .forEach(plugin => schema.plugin(plugin));
    },
    applyMiddlewares<T extends Partial<C_Document>>(
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
    },
    createGenericSchema(mongoose: typeof mongooseRaw) {
        return new mongoose.Schema<I_GenericDocument>(
            {
                id: { type: String, default: uuidv4, unique: true },
                isDel: { type: Boolean, default: false },
            },
            { timestamps: true },
        );
    },
    createSchema<T>({
        mongoose,
        schema,
        virtuals = [],
        standalone = false,
    }: I_CreateSchemaOptions<T>): T_MongooseShema<T> {
        const createdSchema = new mongoose.Schema<T>(schema);

        virtuals.forEach(({ name, options, get }) => {
            const virtualInstance = createdSchema.virtual(name as string, options);
            if (get)
                virtualInstance.get(get);
        });

        if (!standalone) {
            createdSchema.add(mongo.createGenericSchema(mongoose));
        }

        return createdSchema;
    },
    createModel<T extends Partial<C_Document>>({
        mongoose: currentMongooseInstance,
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

        if (currentMongooseInstance.models[name]) {
            return currentMongooseInstance.models[name] as I_ExtendedModel<T>;
        }

        const createdSchema = mongo.createSchema({ mongoose: currentMongooseInstance, schema, virtuals });

        mongo.applyPlugins<T>(createdSchema, [
            pagination && mongoosePaginate,
            aggregate && aggregatePaginate,
        ]);

        mongo.applyMiddlewares<T>(createdSchema, middlewares);

        return currentMongooseInstance.model<T>(name, createdSchema) as I_ExtendedModel<T>;
    },
    validator: {
        isRequired<T>(): (this: T, value: unknown) => Promise<boolean> {
            return async function (this: T, value: unknown): Promise<boolean> {
                return !validate.isEmpty(value);
            };
        },
        isUnique<T extends { constructor: { exists: (query: Record<string, unknown>) => Promise<unknown> } }>(fields: string[]) {
            return async function (this: T, value: unknown): Promise<boolean> {
                if (!Array.isArray(fields) || fields.length === 0) {
                    throw new Error('Fields must be a non-empty array of strings.');
                }

                const query = { $or: fields.map(field => ({ [field]: value })) };
                const existingDocument = await this.constructor.exists(query);

                return !existingDocument;
            };
        },
        matchesRegex(regexArray: RegExp[]): (value: string) => Promise<boolean> {
            return async function (value: string): Promise<boolean> {
                if (!Array.isArray(regexArray) || regexArray.some(r => !(r instanceof RegExp))) {
                    throw new Error('regexArray must be an array of valid RegExp objects.');
                }

                return regexArray.every(regex => regex.test(value));
            };
        },
    },
    migrate: {
        ...migrate,
        setConfig: (options: Partial<migrate.config.Config>) => {
            const optionsJS = `// This file is automatically generated by the Cyberskill CLI.\nmodule.exports = ${JSON.stringify(options, null, 4)}`;

            writeFileSync(PATH.MIGRATE_MONGO_CONFIG, optionsJS);

            const gitIgnoreEntry = `\n${MIGRATE_MONGO_CONFIG}\n`;

            if (pathExistsSync(PATH.GIT_IGNORE)) {
                const gitignore = readFileSync(PATH.GIT_IGNORE, 'utf-8').split('\n');

                if (!gitignore.includes(MIGRATE_MONGO_CONFIG)) {
                    appendFileSync(PATH.GIT_IGNORE, gitIgnoreEntry);
                }
            }
            else {
                writeFileSync(PATH.GIT_IGNORE, gitIgnoreEntry);
            }
        },
    },
    regexify<T>(filter?: T_FilterQuery<T>, fields?: (keyof T | string)[]): T_FilterQuery<T> {
        if (!filter) {
            return {} as T_FilterQuery<T>;
        }

        let newFilter = deepClone(filter);

        if (!fields || fields.length === 0) {
            return newFilter;
        }

        for (const field of fields) {
            const path = field.toString().split('.');
            const value = getNestedValue(newFilter, path);

            if (typeof value === 'string' && value.length > 0) {
                const regexValue = {
                    $regex: `.*${regexSearchMapper(value)}.*`,
                    $options: 'i',
                };

                newFilter = setNestedValue(newFilter, path, regexValue);
            }
        }

        return newFilter;
    },
};

export class MongoController<D extends Partial<C_Document>> {
    private collection: C_Collection<D>;

    constructor(db: C_Db, collectionName: string) {
        this.collection = db.collection<D>(collectionName);
    }

    async createOne(document: D | Partial<D>): Promise<I_Return<D | Partial<D>>> {
        try {
            const finalDocument = {
                ...mongo.createGenericFields(),
                ...document,
            };

            const result = await this.collection.insertOne(finalDocument as unknown as T_OptionalUnlessRequiredId<D>);

            if (!result.acknowledged) {
                return {
                    success: false,
                    message: 'Document creation failed',
                    code: RESPONSE_STATUS.INTERNAL_SERVER_ERROR.CODE,
                };
            }

            return {
                success: true,
                message: 'Document created successfully',
                result: finalDocument,
            };
        }
        catch (error) {
            return catchError<(D | Partial<D>)>(error);
        }
    }

    async createMany(documents: (D | Partial<D>)[]): Promise<I_Return<(D | Partial<D>)[]>> {
        try {
            const finalDocuments = documents.map(document => ({
                ...mongo.createGenericFields(),
                ...document,
            }));

            const result = await this.collection.insertMany(finalDocuments as unknown as T_OptionalUnlessRequiredId<D>[]);

            if (result.insertedCount === 0) {
                return {
                    success: false,
                    message: 'No documents were inserted',
                    code: RESPONSE_STATUS.INTERNAL_SERVER_ERROR.CODE,
                };
            }

            return {
                success: true,
                message: `${result.insertedCount} documents created successfully`,
                result: finalDocuments,
            };
        }
        catch (error) {
            return catchError<(D | Partial<D>)[]>(error);
        }
    }

    async findOne(filter: T_Filter<D>): Promise<I_Return<T_WithId<D>>> {
        try {
            const result = await this.collection.findOne(filter);

            if (!result) {
                return { success: false, message: 'Document not found', code: RESPONSE_STATUS.NOT_FOUND.CODE };
            }
            return { success: true, message: 'Document found', result };
        }
        catch (error) {
            return catchError<T_WithId<D>>(error);
        }
    }

    async findAll(
        filter: T_Filter<D> = {},
    ): Promise<I_Return<T_WithId<D>[]>> {
        try {
            const result = await this.collection.find(filter).toArray();

            return {
                success: true,
                message: 'Documents retrieved successfully',
                result,
            };
        }
        catch (error) {
            return catchError<T_WithId<D>[]>(error);
        }
    }

    async count(
        filter: T_Filter<D> = {},
    ): Promise<I_Return<number>> {
        try {
            const result = await this.collection.countDocuments(filter);

            return {
                success: true,
                message: `Count retrieved successfully`,
                result,
            };
        }
        catch (error) {
            return catchError<number>(error);
        }
    }

    async updateOne(
        filter: T_Filter<D>,
        update: Partial<D>,
    ): Promise<I_Return<T_UpdateResult>> {
        try {
            const result = await this.collection.updateOne(filter, {
                $set: update,
            });

            if (result.matchedCount === 0) {
                return {
                    success: false,
                    message: 'No documents matched the filter',
                    code: RESPONSE_STATUS.INTERNAL_SERVER_ERROR.CODE,
                };
            }
            return {
                success: true,
                message: 'Document updated successfully',
                result,
            };
        }
        catch (error) {
            return catchError<T_UpdateResult>(error);
        }
    }

    async updateMany(
        filter: T_Filter<D>,
        update: Partial<D>,
    ): Promise<I_Return<T_UpdateResult>> {
        try {
            const result = await this.collection.updateMany(filter, {
                $set: update,
            });

            if (result.matchedCount === 0) {
                return {
                    success: false,
                    message: 'No documents matched the filter',
                    code: RESPONSE_STATUS.INTERNAL_SERVER_ERROR.CODE,
                };
            }
            return {
                success: true,
                message: 'Documents updated successfully',
                result,
            };
        }
        catch (error) {
            return catchError<T_UpdateResult>(error);
        }
    }

    async deleteOne(
        filter: T_Filter<D>,
    ): Promise<I_Return<T_DeleteResult>> {
        try {
            const result = await this.collection.deleteOne(filter);

            if (result.deletedCount === 0) {
                return {
                    success: false,
                    message: 'No documents matched the filter',
                    code: RESPONSE_STATUS.INTERNAL_SERVER_ERROR.CODE,
                };
            }
            return {
                success: true,
                message: 'Document deleted successfully',
                result,
            };
        }
        catch (error) {
            return catchError<T_DeleteResult>(error);
        }
    }

    async deleteMany(
        filter: T_Filter<D>,
    ): Promise<I_Return<T_DeleteResult>> {
        try {
            const result = await this.collection.deleteMany(filter);

            if (result.deletedCount === 0) {
                return {
                    success: false,
                    message: 'No documents matched the filter',
                    code: RESPONSE_STATUS.INTERNAL_SERVER_ERROR.CODE,
                };
            }
            return {
                success: true,
                message: 'Documents deleted successfully',
                result,
            };
        }
        catch (error) {
            return catchError<T_DeleteResult>(error);
        }
    }
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
            return catchError<T>(error);
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
            return catchError<T[]>(error);
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
            return catchError<T_PaginateResult<T>>(error);
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
            return catchError<T_AggregatePaginateResult<T>>(error);
        }
    }

    async count(filter: T_FilterQuery<T> = {}): Promise<I_Return<number>> {
        try {
            const result = await this.model.countDocuments(filter);

            return { success: true, result };
        }
        catch (error) {
            return catchError<number>(error);
        }
    }

    async createOne(doc: T | Partial<T>): Promise<I_Return<T>> {
        try {
            const result = await this.model.create(doc);

            return { success: true, result };
        }
        catch (error) {
            return catchError<T>(error);
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
            return catchError<T[]>(error);
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
            return catchError<T>(error);
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
            return catchError<T_UpdateResult>(error);
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
            return catchError<T>(error);
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
            return catchError<T_DeleteResult>(error);
        }
    }

    async createShortId(id: string, length = 4): Promise<I_Return<string>> {
        try {
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
        catch (error) {
            return catchError<string>(error);
        }
    }

    createSlugQuery({ slug, field, isObject, filter }: I_Input_GenerateSlug<T>) {
        const baseFilter = { ...(filter ?? {}) };

        return isObject
            ? {
                    ...baseFilter,
                    $or: [
                        { [`slug.${field}`]: slug },
                        { slugHistory: { $elemMatch: { [`slug.${field}`]: slug } } },
                    ],
                }
            : {
                    ...baseFilter,
                    $or: [
                        { slug },
                        { slugHistory: slug },
                    ],
                };
    }

    async createUniqueSlug({ slug, field, isObject, filter }: I_Input_GenerateSlug<T>): Promise<string> {
        const baseSlug = generateSlug(slug);
        let uniqueSlug = baseSlug;
        let suffix = 1;

        while (await this.model.exists(this.createSlugQuery({ slug: uniqueSlug, field, isObject, filter }))) {
            uniqueSlug = `${baseSlug}-${suffix++}`;
        }

        return uniqueSlug;
    }

    async createSlug<R = string>({ field, from, filter }: I_Input_CreateSlug<T>): Promise<I_Return<R>> {
        try {
            const fieldValue = from[field as keyof T];
            const isObjectValue = isObject(fieldValue);

            if (isObjectValue) {
                const uniqueSlug = Object.fromEntries(
                    await Promise.all(
                        Object.entries(fieldValue).map(async ([key, value]) => {
                            const uniqueSlugForKey = await this.createUniqueSlug({
                                slug: value as string,
                                field: key,
                                isObject: true,
                                filter,
                            });
                            return [key, uniqueSlugForKey];
                        }),
                    ),
                );

                return { success: true, result: uniqueSlug as R };
            }

            const uniqueSlug = await this.createUniqueSlug({
                slug: fieldValue as string,
                field,
                isObject: false,
                filter,
            });
            return { success: true, result: uniqueSlug as R };
        }
        catch (error) {
            return catchError<R>(error);
        }
    }

    async checkSlug({ slug, field, from, filter }: I_Input_CheckSlug<T>): Promise<I_Return<boolean>> {
        try {
            const fieldValue = from[field as keyof T];
            const isObjectValue = isObject(fieldValue);

            if (isObjectValue) {
                for (const value of Object.values(fieldValue)) {
                    const nestedSlug = generateSlug(value as string);
                    const exists = await this.model.exists(this.createSlugQuery({
                        slug: nestedSlug,
                        field,
                        isObject: true,
                        filter,
                    }));

                    if (exists) {
                        return { success: true, result: true };
                    }
                }
                return { success: true, result: false };
            }

            const baseSlug = generateSlug(slug);
            const exists = await this.model.exists(this.createSlugQuery({
                slug: baseSlug,
                field,
                isObject: false,
                filter,
            }));

            return { success: true, result: exists !== null };
        }
        catch (error) {
            return catchError<boolean>(error);
        }
    }

    async aggregate(pipeline: T_PipelineStage[]): Promise<I_Return<T[]>> {
        try {
            const result = await this.model.aggregate<T>(pipeline);

            return { success: true, result };
        }
        catch (error) {
            return catchError<T[]>(error);
        }
    }
}
