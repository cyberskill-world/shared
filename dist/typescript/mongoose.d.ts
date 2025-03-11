import { Db, InsertOneResult, InsertManyResult, Filter, WithId, UpdateResult, DeleteResult, Collection, OptionalUnlessRequiredId } from 'mongodb';
import mongoose, { Document, Model, PaginateModel, AggregatePaginateModel, FilterQuery, ProjectionType, QueryOptions, PopulateOptions, PaginateOptions, PopulateOption, PaginateResult, PipelineStage, AggregatePaginateResult, InsertManyOptions, UpdateQuery, ClientSession, QueryWithHelpers, Schema, SchemaDefinition } from 'mongoose';

declare class C_Model extends Model {
}
declare class C_Db extends Db {
}
declare class C_Document extends Document {
}
declare class C_Collection<D extends Partial<C_Document>> extends Collection<D> {
}
interface I_GenericDocument extends Partial<C_Document> {
    id?: string;
    isDel?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}
interface I_VirtualNestedOptions {
    [key: string]: I_VirtualNestedOptions | number | string | boolean;
}
interface I_HookNextFunction {
    (error?: Error | null): void;
}
type T_MiddlewareContext<T> = T | QueryWithHelpers<T, T>;
interface I_VirtualOptions {
    ref: string;
    localField: string;
    foreignField: string;
    count?: boolean;
    justOne?: boolean;
    options?: I_VirtualNestedOptions;
}
interface I_MongooseOptions<D extends Partial<C_Document>> {
    mongoose: typeof mongoose;
    virtuals?: {
        name: keyof D | string;
        options?: I_VirtualOptions;
        get?: (this: D) => void;
    }[];
}
type T_MongooseShema<D> = mongoose.Schema<D>;
type T_MongoosePlugin = (schema: Schema, options?: Record<string, unknown>) => void;
type T_Input_MongooseSchema<D> = SchemaDefinition<D>;
interface I_GenerateSchemaOptions<D extends Partial<C_Document>> extends I_MongooseOptions<D> {
    schema: T_Input_MongooseSchema<D>;
    standalone?: boolean;
}
type T_MongooseModelMiddlewareFunction = (this: T_MiddlewareContext<C_Document>, next: I_HookNextFunction) => void;
interface I_MongooseModelMiddleware {
    method: string;
    fn: T_MongooseModelMiddlewareFunction;
}
interface I_GenerateModelOptions<D extends Partial<C_Document>> extends I_MongooseOptions<D> {
    schema: T_Input_MongooseSchema<D>;
    name: string;
    aggregate?: boolean;
    middlewares?: I_MongooseModelMiddleware[];
    pagination?: boolean;
}
interface I_ExtendedModel<D extends Partial<C_Document>> extends Model<D>, PaginateModel<D>, AggregatePaginateModel<D> {
}
interface I_ReturnSuccess<D, E = {}> {
    success: true;
    result: D & E;
    message?: string;
    code?: number | string;
}
interface I_ReturnFailure {
    success: false;
    message: string;
    code: number | string;
}
type I_Return<D = void, E = {}> = I_ReturnSuccess<D, E> | I_ReturnFailure;
type T_Filter<D> = Filter<D>;
type T_InsertOneResult<D> = InsertOneResult<D>;
type T_InsertManyResult<D> = InsertManyResult<D>;
type T_FilterQuery<T> = FilterQuery<T>;
type T_ProjectionType<T> = ProjectionType<T>;
type T_QueryOptions<T> = QueryOptions<T>;
type T_PaginateOptions = PaginateOptions;
type T_PopulateOption = PopulateOption;
type T_PopulateOptions = PopulateOptions;
type T_PipelineStage = PipelineStage;
type T_PaginateResult<T> = PaginateResult<T>;
type T_AggregatePaginateResult<T> = AggregatePaginateResult<T>;
type T_InsertManyOptions = InsertManyOptions;
type T_UpdateQuery<T> = UpdateQuery<T>;
type T_UpdateResult = UpdateResult;
type T_DeleteResult = DeleteResult;
type T_WithId<T> = WithId<T>;
type T_OptionalUnlessRequiredId<T> = OptionalUnlessRequiredId<T>;
type T_Input_Populate = string | string[] | T_PopulateOptions | T_PopulateOptions[];
interface T_PaginateOptionsWithPopulate extends T_PaginateOptions, T_PopulateOption {
}
type T_GenerateSlugQueryResponse<D> = T_FilterQuery<D> & {
    $or: Array<{
        slug: string;
    } | {
        slugHistory: string;
    }>;
} & {
    id?: {
        $ne: string;
    };
};
interface I_Input_FindOne<T> extends T_PopulateOption {
    filter: T_FilterQuery<T>;
    projection?: T_ProjectionType<T>;
    options?: T_QueryOptions<T>;
}
interface I_Input_FindAll<T> extends T_PopulateOption {
    filter: T_FilterQuery<T>;
    projection?: T_ProjectionType<T>;
    options?: T_QueryOptions<T>;
}
interface I_Input_FindPaging<T> {
    filter?: T_FilterQuery<T>;
    options?: T_PaginateOptionsWithPopulate;
}
interface I_Input_FindPagingAggregate {
    pipeline: T_PipelineStage[];
    options?: T_PaginateOptionsWithPopulate;
}
interface I_Input_CreateOne<T> {
    doc: T;
}
interface I_Input_CreateMany<T> {
    docs: T[];
}
interface I_Input_UpdateOne<T> extends T_PopulateOption {
    filter: T_FilterQuery<T>;
    update: T_UpdateQuery<T>;
    options?: I_UpdateOptionsExtended;
}
interface I_Input_UpdateMany<T> extends T_PopulateOption {
    filter: T_FilterQuery<T>;
    update: T_UpdateQuery<T>;
    options?: I_UpdateOptionsExtended;
}
interface I_Input_DeleteOne<T> {
    filter: T_FilterQuery<T>;
    options?: I_DeleteOptionsExtended;
}
interface I_Input_DeleteMany<T> {
    filter: T_FilterQuery<T>;
    options?: I_DeleteOptionsExtended;
}
interface I_UpdateOptionsExtended extends Omit<QueryOptions, 'session'> {
    session?: ClientSession;
}
interface I_DeleteOptionsExtended extends Omit<QueryOptions, 'session'> {
    session?: ClientSession;
}
interface I_SlugifyOptions {
    replacement?: string;
    remove?: RegExp;
    lower?: boolean;
    strict?: boolean;
    locale?: string;
    trim?: boolean;
}

export { C_Collection, C_Db, C_Document, C_Model, type I_DeleteOptionsExtended, type I_ExtendedModel, type I_GenerateModelOptions, type I_GenerateSchemaOptions, type I_GenericDocument, type I_HookNextFunction, type I_Input_CreateMany, type I_Input_CreateOne, type I_Input_DeleteMany, type I_Input_DeleteOne, type I_Input_FindAll, type I_Input_FindOne, type I_Input_FindPaging, type I_Input_FindPagingAggregate, type I_Input_UpdateMany, type I_Input_UpdateOne, type I_MongooseModelMiddleware, type I_MongooseOptions, type I_Return, type I_ReturnFailure, type I_ReturnSuccess, type I_SlugifyOptions, type I_UpdateOptionsExtended, type T_AggregatePaginateResult, type T_DeleteResult, type T_Filter, type T_FilterQuery, type T_GenerateSlugQueryResponse, type T_Input_MongooseSchema, type T_Input_Populate, type T_InsertManyOptions, type T_InsertManyResult, type T_InsertOneResult, type T_MiddlewareContext, type T_MongooseModelMiddlewareFunction, type T_MongoosePlugin, type T_MongooseShema, type T_OptionalUnlessRequiredId, type T_PaginateOptions, type T_PaginateOptionsWithPopulate, type T_PaginateResult, type T_PipelineStage, type T_PopulateOption, type T_PopulateOptions, type T_ProjectionType, type T_QueryOptions, type T_UpdateQuery, type T_UpdateResult, type T_WithId };
