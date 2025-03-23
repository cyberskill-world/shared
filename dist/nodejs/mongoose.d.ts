import { C_Document, I_ExtendedModel, T_FilterQuery, T_ProjectionType, T_QueryOptions, T_Input_Populate, I_Return, T_PaginateOptionsWithPopulate, T_PaginateResult, T_PipelineStage, T_AggregatePaginateResult, T_InsertManyOptions, T_UpdateQuery, I_UpdateOptionsExtended, T_UpdateResult, I_DeleteOptionsExtended, T_DeleteResult } from '../typescript/mongoose.js';
import 'mongodb';
import 'mongoose';

declare class MongooseController<D extends Partial<C_Document>> {
    private model;
    constructor(model: I_ExtendedModel<D>);
    private getModelName;
    findOne(filter?: T_FilterQuery<D>, projection?: T_ProjectionType<D>, options?: T_QueryOptions<D>, populate?: T_Input_Populate): Promise<I_Return<D>>;
    findAll(filter?: T_FilterQuery<D>, projection?: T_ProjectionType<D>, options?: T_QueryOptions<D>, populate?: T_Input_Populate): Promise<I_Return<D[]>>;
    findPaging(filter?: T_FilterQuery<D>, options?: T_PaginateOptionsWithPopulate): Promise<I_Return<T_PaginateResult<D>>>;
    findPagingAggregate(pipeline: T_PipelineStage[], options?: T_PaginateOptionsWithPopulate): Promise<I_Return<T_AggregatePaginateResult<D>>>;
    count(filter?: T_FilterQuery<D>): Promise<I_Return<number>>;
    createOne(doc: D | Partial<D>): Promise<I_Return<D>>;
    createMany(docs: (D | Partial<D>)[], options?: T_InsertManyOptions): Promise<I_Return<D[]>>;
    updateOne(filter?: T_FilterQuery<D>, update?: T_UpdateQuery<D>, options?: I_UpdateOptionsExtended): Promise<I_Return<D>>;
    updateMany(filter?: T_FilterQuery<D>, update?: T_UpdateQuery<D>, options?: I_UpdateOptionsExtended): Promise<I_Return<T_UpdateResult>>;
    deleteOne(filter?: T_FilterQuery<D>, options?: I_DeleteOptionsExtended): Promise<I_Return<D>>;
    deleteMany(filter?: T_FilterQuery<D>, options?: I_DeleteOptionsExtended): Promise<I_Return<T_DeleteResult>>;
    generateShortId(id: string): Promise<I_Return<string>>;
    generateSlug(fieldName: string, fields: D, filters?: T_FilterQuery<D>): Promise<I_Return<string>>;
    aggregate(pipeline: T_PipelineStage[]): Promise<I_Return<D[]>>;
}

export { MongooseController };
