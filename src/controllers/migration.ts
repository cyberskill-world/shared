import {
    C_Collection,
    C_Db,
    C_Document,
    T_DeleteResult,
    T_Filter,
    T_InsertManyResult,
    T_InsertOneResult,
    T_OptionalUnlessRequiredId,
    T_UpdateResult,
    T_WithId,
} from '../typescript/index.js';

export class MigrationController<D extends Partial<C_Document>> {
    private collection: C_Collection<D>;

    constructor(db: C_Db, collectionName: string) {
        this.collection = db.collection<D>(collectionName);
    }

    async createOne(document: D): Promise<{
        success: boolean;
        message: string;
        result?: T_InsertOneResult<D>;
    }> {
        try {
            const result = await this.collection.insertOne(
                document as T_OptionalUnlessRequiredId<D>,
            );
            return {
                success: true,
                message: 'Document created successfully',
                result,
            };
        } catch (error) {
            console.error(error);
            return { success: false, message: (error as Error).message };
        }
    }

    async createMany(documents: D[]): Promise<{
        success: boolean;
        message: string;
        result?: T_InsertManyResult<D>;
    }> {
        try {
            const result = await this.collection.insertMany(
                documents as T_OptionalUnlessRequiredId<D>[],
            );
            if (result.insertedCount === 0) {
                return {
                    success: false,
                    message: 'No documents were inserted',
                };
            }
            return {
                success: true,
                message: `${result.insertedCount} documents created successfully`,
                result,
            };
        } catch (error) {
            console.error(error);
            return { success: false, message: (error as Error).message };
        }
    }

    async findOne(filter: T_Filter<D>): Promise<{
        success: boolean;
        message: string;
        result?: T_WithId<D> | null;
    }> {
        try {
            const result = await this.collection.findOne(filter);
            if (!result) {
                return { success: false, message: 'Document not found' };
            }
            return { success: true, message: 'Document found', result };
        } catch (error) {
            console.error(error);
            return { success: false, message: (error as Error).message };
        }
    }

    async findAll(
        filter: T_Filter<D> = {},
    ): Promise<{ success: boolean; message: string; result?: T_WithId<D>[] }> {
        try {
            const result = await this.collection.find(filter).toArray();
            return {
                success: true,
                message: 'Documents retrieved successfully',
                result,
            };
        } catch (error) {
            console.error(error);
            return { success: false, message: (error as Error).message };
        }
    }

    async updateOne(
        filter: T_Filter<D>,
        update: Partial<D>,
    ): Promise<{ success: boolean; message: string; result?: T_UpdateResult }> {
        try {
            const result = await this.collection.updateOne(filter, {
                $set: update,
            });
            if (result.matchedCount === 0) {
                return {
                    success: false,
                    message: 'No documents matched the filter',
                };
            }
            return {
                success: true,
                message: 'Document updated successfully',
                result,
            };
        } catch (error) {
            console.error(error);
            return { success: false, message: (error as Error).message };
        }
    }

    async updateMany(
        filter: T_Filter<D>,
        update: Partial<D>,
    ): Promise<{ success: boolean; message: string; result?: T_UpdateResult }> {
        try {
            const result = await this.collection.updateMany(filter, {
                $set: update,
            });
            if (result.matchedCount === 0) {
                return {
                    success: false,
                    message: 'No documents matched the filter',
                };
            }
            return {
                success: true,
                message: 'Documents updated successfully',
                result,
            };
        } catch (error) {
            console.error(error);
            return { success: false, message: (error as Error).message };
        }
    }

    async deleteOne(
        filter: T_Filter<D>,
    ): Promise<{ success: boolean; message: string; result?: T_DeleteResult }> {
        try {
            const result = await this.collection.deleteOne(filter);
            if (result.deletedCount === 0) {
                return {
                    success: false,
                    message: 'No documents matched the filter',
                };
            }
            return {
                success: true,
                message: 'Document deleted successfully',
                result,
            };
        } catch (error) {
            console.error(error);
            return { success: false, message: (error as Error).message };
        }
    }

    async deleteMany(
        filter: T_Filter<D>,
    ): Promise<{ success: boolean; message: string; result?: T_DeleteResult }> {
        try {
            const result = await this.collection.deleteMany(filter);
            if (result.deletedCount === 0) {
                return {
                    success: false,
                    message: 'No documents matched the filter',
                };
            }
            return {
                success: true,
                message: 'Documents deleted successfully',
                result,
            };
        } catch (error) {
            console.error(error);
            return { success: false, message: (error as Error).message };
        }
    }
}
