import { C_Document, C_Db, T_InsertOneResult, T_InsertManyResult, T_Filter, T_WithId, T_UpdateResult, T_DeleteResult } from '../typescript/mongoose.js';
import 'mongodb';
import 'mongoose';

declare class MongoController<D extends Partial<C_Document>> {
    private collection;
    constructor(db: C_Db, collectionName: string);
    createOne(document: D): Promise<{
        success: boolean;
        message: string;
        result?: T_InsertOneResult<D>;
    }>;
    createMany(documents: D[]): Promise<{
        success: boolean;
        message: string;
        result?: T_InsertManyResult<D>;
    }>;
    findOne(filter: T_Filter<D>): Promise<{
        success: boolean;
        message: string;
        result?: T_WithId<D> | null;
    }>;
    findAll(filter?: T_Filter<D>): Promise<{
        success: boolean;
        message: string;
        result?: T_WithId<D>[];
    }>;
    count(filter?: T_Filter<D>): Promise<{
        success: boolean;
        message: string;
        result?: number;
    }>;
    updateOne(filter: T_Filter<D>, update: Partial<D>): Promise<{
        success: boolean;
        message: string;
        result?: T_UpdateResult;
    }>;
    updateMany(filter: T_Filter<D>, update: Partial<D>): Promise<{
        success: boolean;
        message: string;
        result?: T_UpdateResult;
    }>;
    deleteOne(filter: T_Filter<D>): Promise<{
        success: boolean;
        message: string;
        result?: T_DeleteResult;
    }>;
    deleteMany(filter: T_Filter<D>): Promise<{
        success: boolean;
        message: string;
        result?: T_DeleteResult;
    }>;
}

export { MongoController };
