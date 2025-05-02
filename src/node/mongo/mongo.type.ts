import type {
    DeleteResult,
    Filter,
    InsertManyResult,
    InsertOneResult,
    OptionalUnlessRequiredId,
    UpdateResult,
    WithId,
} from 'mongodb';
import type {
    AggregatePaginateModel,
    AggregatePaginateResult,
    ClientSession,
    ErrorHandlingMiddlewareFunction,
    ErrorHandlingMiddlewareWithOption,
    FilterQuery,
    InsertManyOptions,
    PaginateModel,
    PaginateOptions,
    PaginateResult,
    PipelineStage,
    PopulateOption,
    PopulateOptions,
    PostMiddlewareFunction,
    PreMiddlewareFunction,
    PreSaveMiddlewareFunction,
    ProjectionType,
    QueryOptions,
    QueryWithHelpers,
    Schema,
    SchemaDefinition,
    UpdateQuery,
} from 'mongoose';
import type mongoose from 'mongoose';

import { Collection, Db } from 'mongodb';
import {
    Document,
    Model,
} from 'mongoose';

export class C_Db extends Db { }

export type T_Filter<T> = Filter<T>;

export type T_InsertOneResult<T> = InsertOneResult<T>;

export type T_InsertManyResult<T> = InsertManyResult<T>;

export type T_UpdateResult = UpdateResult;

export type T_DeleteResult = DeleteResult;

export type T_WithId<T> = WithId<T>;

export type T_OptionalUnlessRequiredId<T> = OptionalUnlessRequiredId<T>;

export class C_Document extends Document { }

export class C_Model extends Model { }

export class C_Collection<
    T extends Partial<C_Document>,
> extends Collection<T> { }

export interface I_ExtendedModel<T extends Partial<C_Document>>
    extends Model<T>, PaginateModel<T>,
    AggregatePaginateModel<T> { }

export type T_FilterQuery<T> = FilterQuery<T>;

export type T_ProjectionType<T> = ProjectionType<T>;

export type T_QueryOptions<T> = QueryOptions<T>;

export type T_PaginateOptions = PaginateOptions;

export type T_PopulateOption = PopulateOption;

export type T_PopulateOptions = PopulateOptions;

export type T_PipelineStage = PipelineStage;

export type T_PaginateResult<T> = PaginateResult<T>;

export type T_AggregatePaginateResult<T> = AggregatePaginateResult<T>;

export type T_InsertManyOptions = InsertManyOptions;

export type T_UpdateQuery<T> = UpdateQuery<T>;

export type T_QueryWithHelpers<T> = QueryWithHelpers<T, T>;

export type T_PreMiddlewareFunction<T> = PreMiddlewareFunction<T>;

export type T_PreSaveMiddlewareFunction<T> = PreSaveMiddlewareFunction<T>;

export type T_PostMiddlewareFunction<T> = PostMiddlewareFunction<T>;

export type T_ErrorHandlingMiddlewareFunction<T> = ErrorHandlingMiddlewareFunction<T>;

export type T_ErrorHandlingMiddlewareWithOption<T> = ErrorHandlingMiddlewareWithOption<T>;

export type T_MongooseShema<T> = mongoose.Schema<T>;

export type T_Input_MongooseSchema<T> = SchemaDefinition<T>;

export type T_MongoosePlugin = (schema: Schema, options?: Record<string, unknown>) => void;

export interface I_GenericDocument extends Partial<C_Document> {
    id: string;
    isDel: boolean;
    createdAt: string | Date;
    updatedAt: string | Date;
}

interface I_VirtualNestedOptions {
    [key: string]: I_VirtualNestedOptions | number | string | boolean;
}

interface I_VirtualOptions {
    ref: string;
    localField: string;
    foreignField: string;
    count?: boolean;
    justOne?: boolean;
    options?: I_VirtualNestedOptions;
}

export interface I_MongooseOptions<T extends Partial<C_Document>> {
    mongoose: typeof mongoose;
    virtuals?: {
        name: keyof T | string;
        options?: I_VirtualOptions;
        get?: (this: T) => void;
    }[];
}

export interface I_CreateSchemaOptions<T extends Partial<C_Document>>
    extends I_MongooseOptions<T> {
    schema: T_Input_MongooseSchema<T>;
    standalone?: boolean;
}

export type T_MongooseMiddlewareMethod = string | RegExp;

export type T_MongooseMiddlewarePreFunction<T> = T_PreMiddlewareFunction<T> & T_PreSaveMiddlewareFunction<T>;

export type T_MongooseMiddlewarePostFunction<T> = T_PostMiddlewareFunction<T> & T_ErrorHandlingMiddlewareFunction<T> & T_ErrorHandlingMiddlewareWithOption<T>;

export type T_MongooseHookNextFunction = (error?: Error) => void;

export interface I_MongooseModelMiddleware<T extends Partial<C_Document>> {
    method: T_MongooseMiddlewareMethod;
    pre?: T_MongooseMiddlewarePreFunction<T & T_QueryWithHelpers<T>>;
    post?: T_MongooseMiddlewarePostFunction<T>;
}

export interface I_CreateModelOptions<T extends Partial<C_Document>>
    extends I_MongooseOptions<T> {
    schema: T_Input_MongooseSchema<T>;
    name: string;
    aggregate?: boolean;
    middlewares?: I_MongooseModelMiddleware<T>[];
    pagination?: boolean;
}

export type T_Input_Populate = string | string[] | T_PopulateOptions | T_PopulateOptions[];

export interface T_PaginateOptionsWithPopulate
    extends T_PaginateOptions,
    Omit<T_PopulateOption, 'populate'> {
    populate?: T_Input_Populate;
}

export interface I_Input_FindOne<T> extends T_PopulateOption {
    filter: T_FilterQuery<T>;
    projection?: T_ProjectionType<T>;
    options?: T_QueryOptions<T>;
}

export interface I_Input_FindAll<T> extends T_PopulateOption {
    filter: T_FilterQuery<T>;
    projection?: T_ProjectionType<T>;
    options?: T_QueryOptions<T>;
}

export interface I_Input_FindPaging<T> {
    filter?: T_FilterQuery<T>;
    options?: T_PaginateOptionsWithPopulate;
}

export interface I_Input_FindPagingAggregate {
    pipeline: T_PipelineStage[];
    options?: T_PaginateOptionsWithPopulate;
}

export interface I_Input_CreateOne<T> {
    doc: T;
}

export interface I_Input_CreateMany<T> {
    docs: T[];
}

export interface I_UpdateOptionsExtended extends Omit<QueryOptions, 'session'> {
    session?: ClientSession;
}

export interface I_Input_UpdateOne<T> extends T_PopulateOption {
    filter: T_FilterQuery<T>;
    update: T_UpdateQuery<T>;
    options?: I_UpdateOptionsExtended;
}

export interface I_Input_UpdateMany<T> extends T_PopulateOption {
    filter: T_FilterQuery<T>;
    update: T_UpdateQuery<T>;
    options?: I_UpdateOptionsExtended;
}

export interface I_DeleteOptionsExtended extends Omit<QueryOptions, 'session'> {
    session?: ClientSession;
}

export interface I_Input_DeleteOne<T> {
    filter: T_FilterQuery<T>;
    options?: I_DeleteOptionsExtended;
}

export interface I_Input_DeleteMany<T> {
    filter: T_FilterQuery<T>;
    options?: I_DeleteOptionsExtended;
}
