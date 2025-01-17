import { Document } from 'mongoose';

import { RESPONSE_STATUS } from '../constants/response-status.js';
import {
    C_Document,
    I_DeleteOptionsExtended,
    I_ExtendedModel,
    I_Return,
    I_UpdateOptionsExtended,
    T_AggregatePaginateResult,
    T_DeleteResult,
    T_FilterQuery,
    T_Input_Populate,
    T_InsertManyOptions,
    T_PaginateOptionsWithPopulate,
    T_PaginateResult,
    T_PipelineStage,
    T_PopulateOptions,
    T_ProjectionType,
    T_QueryOptions,
    T_UpdateQuery,
    T_UpdateResult,
} from '../typescript/index.js';
import {
    generateShortId,
    generateSlug,
    generateSlugQuery,
} from '../utils/index.js';

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
        } catch (error) {
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
            // eslint-disable-next-line ts/ban-ts-comment
            // @ts-ignore
            const slug = generateSlug(fields[fieldName]);

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
