import {
    C_Document,
    I_DeleteOptionsExtended,
    I_ExtendedModel,
    I_Return,
    I_UpdateOptionsExtended,
    T_AggregatePaginateResult,
    T_DeleteResult,
    T_FilterQuery,
    T_InsertManyOptions,
    T_PaginateOptions,
    T_PaginateResult,
    T_PipelineStage,
    T_PopulateOptions,
    T_ProjectionType,
    T_QueryOptions,
    T_UpdateQuery,
    T_UpdateResult,
} from '../typescript/index.js';

export class MongooseController<D extends Partial<C_Document>> {
    constructor(private model: I_ExtendedModel<D>) {}

    private getModelName(): string {
        return this.model.modelName;
    }

    async findOne(
        filter: T_FilterQuery<D> = {},
        projection: T_ProjectionType<D> = {},
        options: T_QueryOptions<D> = {},
        populate?: T_PopulateOptions,
    ): Promise<I_Return<D>> {
        try {
            const query = this.model.findOne(filter, projection, options);

            if (populate) {
                if (Array.isArray(populate)) {
                    populate.forEach((option) => query.populate(option));
                } else {
                    query.populate(populate);
                }
            }

            const result = await query.exec();

            if (!result) {
                return {
                    success: false,
                    message: `No ${this.getModelName()} found.`,
                };
            }

            return { success: true, result };
        } catch (error) {
            console.error(error);

            return {
                success: false,
                message: (error as Error).message,
            };
        }
    }

    async findAll(
        filter: T_FilterQuery<D> = {},
        projection: T_ProjectionType<D> = {},
        options: T_QueryOptions<D> = {},
        populate?: T_PopulateOptions,
    ): Promise<I_Return<D[]>> {
        try {
            const query = this.model.find(filter, projection, options);

            if (populate) {
                if (Array.isArray(populate)) {
                    populate.forEach((option) => query.populate(option));
                } else {
                    query.populate(populate);
                }
            }

            const result = await query.exec();

            return { success: true, result };
        } catch (error) {
            console.error(error);

            return {
                success: false,
                message: (error as Error).message,
            };
        }
    }

    async findPaging(
        filter: T_FilterQuery<D> = {},
        options: T_PaginateOptions = {},
    ): Promise<I_Return<T_PaginateResult<D>>> {
        try {
            const result = await this.model.paginate(filter, options);

            return { success: true, result };
        } catch (error) {
            console.error(error);

            return {
                success: false,
                message: (error as Error).message,
            };
        }
    }

    async findPagingAggregate(
        pipeline: T_PipelineStage[],
        options: T_PaginateOptions = {},
    ): Promise<I_Return<T_AggregatePaginateResult<D>>> {
        try {
            const result = await this.model.aggregatePaginate(
                this.model.aggregate(pipeline),
                options,
            );

            return { success: true, result };
        } catch (error) {
            console.error(error);

            return {
                success: false,
                message: (error as Error).message,
            };
        }
    }

    async createOne(doc: D | Partial<D>): Promise<I_Return<D>> {
        try {
            const result = await this.model.create(doc);

            return { success: true, result };
        } catch (error) {
            console.error(error);

            return {
                success: false,
                message: (error as Error).message,
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

                    console.error(
                        'Document is not an instance of MongooseDocument:',
                        doc,
                    );

                    return null;
                })
                .filter((doc): doc is D => doc !== null);

            return { success: true, result };
        } catch (error) {
            console.error(error);

            return {
                success: false,
                message: (error as Error).message,
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
                };
            }

            return { success: true, result };
        } catch (error) {
            console.error(error);

            return {
                success: false,
                message: (error as Error).message,
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
        } catch (error) {
            console.error(error);

            return {
                success: false,
                message: (error as Error).message,
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
                };
            }

            return { success: true, result };
        } catch (error) {
            console.error(error);

            return {
                success: false,
                message: (error as Error).message,
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
                };
            }

            return { success: true, result };
        } catch (error) {
            console.error(error);

            return {
                success: false,
                message: (error as Error).message,
            };
        }
    }
}
