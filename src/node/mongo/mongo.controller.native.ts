import type { I_Return } from '#typescript/index.js';

import { RESPONSE_STATUS } from '#constant/index.js';

import type { C_Collection, C_Db, C_Document, T_DeleteResult, T_Filter, T_OptionalUnlessRequiredId, T_UpdateResult, T_WithId } from './mongo.type.js';

import { catchError } from '../log/index.js';
import { mongo } from './mongo.util.js';

/**
 * MongoDB native driver controller for direct database operations.
 * This class provides a simplified interface for MongoDB operations using the native driver,
 * with automatic generic field generation and standardized response formatting.
 */
export class MongoController<D extends Partial<C_Document>> {
    private collection: C_Collection<D>;

    /**
     * Creates a new MongoDB controller instance.
     *
     * @param db - The MongoDB database instance.
     * @param collectionName - The name of the collection to operate on.
     */
    constructor(db: C_Db, collectionName: string) {
        this.collection = db.collection<D>(collectionName);
    }

    /**
     * Creates a single document in the collection.
     * This method adds generic fields (id, isDel, timestamps) to the document before insertion.
     *
     * @param document - The document to create, with or without generic fields.
     * @returns A promise that resolves to a standardized response with the created document.
     */
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

    /**
     * Creates multiple documents in the collection.
     * This method adds generic fields to each document before bulk insertion.
     *
     * @param documents - An array of documents to create.
     * @returns A promise that resolves to a standardized response with the created documents.
     */
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

    /**
     * Finds a single document by filter criteria.
     *
     * @param filter - The filter criteria to find the document.
     * @returns A promise that resolves to a standardized response with the found document.
     */
    async findOne(filter: T_Filter<D>): Promise<I_Return<T_WithId<D>>> {
        try {
            const result = await this.collection.findOne(filter, { maxTimeMS: 30_000 });

            if (!result) {
                return { success: false, message: 'Document not found', code: RESPONSE_STATUS.NOT_FOUND.CODE };
            }

            return { success: true, message: 'Document found', result };
        }
        catch (error) {
            return catchError<T_WithId<D>>(error);
        }
    }

    /**
     * Finds all documents matching the filter criteria.
     *
     * @param filter - The filter criteria to find documents (defaults to empty object for all documents).
     * @returns A promise that resolves to a standardized response with the found documents.
     */
    async findAll(
        filter: T_Filter<D> = {},
    ): Promise<I_Return<T_WithId<D>[]>> {
        try {
            const result = await this.collection.find(filter).limit(10_000).maxTimeMS(30_000).toArray();

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

    /**
     * Counts documents matching the filter criteria.
     *
     * @param filter - The filter criteria to count documents (defaults to empty object for all documents).
     * @returns A promise that resolves to a standardized response with the document count.
     */
    async count(
        filter: T_Filter<D> = {},
    ): Promise<I_Return<number>> {
        try {
            const result = await this.collection.countDocuments(filter);

            return {
                success: true,
                message: `${result} documents counted successfully`,
                result,
            };
        }
        catch (error) {
            return catchError<number>(error);
        }
    }

    /**
     * Updates a single document matching the filter criteria.
     *
     * @param filter - The filter criteria to find the document to update.
     * @param update - The update data to apply to the document.
     * @returns A promise that resolves to a standardized response with the update result.
     */
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
                    code: RESPONSE_STATUS.NOT_FOUND.CODE,
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

    /**
     * Updates multiple documents matching the filter criteria.
     *
     * @param filter - The filter criteria to find documents to update.
     * @param update - The update data to apply to the documents.
     * @returns A promise that resolves to a standardized response with the update result.
     */
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
                    code: RESPONSE_STATUS.NOT_FOUND.CODE,
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

    /**
     * Deletes a single document matching the filter criteria.
     *
     * @param filter - The filter criteria to find the document to delete.
     * @returns A promise that resolves to a standardized response with the delete result.
     */
    async deleteOne(
        filter: T_Filter<D>,
    ): Promise<I_Return<T_DeleteResult>> {
        try {
            const result = await this.collection.deleteOne(filter);

            if (result.deletedCount === 0) {
                return {
                    success: false,
                    message: 'No documents matched the filter',
                    code: RESPONSE_STATUS.NOT_FOUND.CODE,
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

    /**
     * Deletes multiple documents matching the filter criteria.
     *
     * @param filter - The filter criteria to find documents to delete.
     * @returns A promise that resolves to a standardized response with the delete result.
     */
    async deleteMany(
        filter: T_Filter<D>,
    ): Promise<I_Return<T_DeleteResult>> {
        try {
            const result = await this.collection.deleteMany(filter);

            if (result.deletedCount === 0) {
                return {
                    success: false,
                    message: 'No documents matched the filter',
                    code: RESPONSE_STATUS.NOT_FOUND.CODE,
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
