import {
    Collection,
    Db,
    DeleteResult,
    Filter,
    InsertManyResult,
    InsertOneResult,
    OptionalUnlessRequiredId,
    UpdateResult,
    WithId,
} from 'mongodb';
import mongoose, {
    AggregatePaginateModel,
    AggregatePaginateResult,
    ClientSession,
    Document,
    FilterQuery,
    InsertManyOptions,
    Model,
    PaginateModel,
    PaginateOptions,
    PaginateResult,
    PipelineStage,
    PopulateOption,
    PopulateOptions,
    ProjectionType,
    QueryOptions,
    QueryWithHelpers,
    SchemaDefinition,
    UpdateQuery,
} from 'mongoose';

// Class Definitions

export class C_Model extends Model { }
export class C_Db extends Db { }
export class C_Document extends Document { }

// Define Collection with Partial Documents

export class C_Collection<
    D extends Partial<C_Document>,
> extends Collection<D> { }

// Interfaces

export interface I_GenericDocument extends Partial<C_Document> {
    id?: string;
    isDel?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

interface I_VirtualNestedOptions {
    [key: string]: I_VirtualNestedOptions | number | string | boolean;
}

export interface I_HookNextFunction {
    (error?: Error | null): void;
}

export type T_MiddlewareContext<T> = T | QueryWithHelpers<T, T>;

interface I_VirtualOptions {
    ref: string;
    localField: string;
    foreignField: string;
    count?: boolean;
    justOne?: boolean;
    options?: I_VirtualNestedOptions;
}

export interface I_MongooseOptions<D extends Partial<C_Document>> {
    mongoose: typeof mongoose;
    virtuals?: {
        name: keyof D | string;
        options: I_VirtualOptions;
        get?: (this: D) => void;
    }[];
}

export type T_MongooseShema<D> = mongoose.Schema<D>;

export type T_Input_MongooseSchema<D> = SchemaDefinition<D>;

export interface I_GenerateSchemaOptions<D extends Partial<C_Document>>
    extends I_MongooseOptions<D> {
    schema: T_Input_MongooseSchema<D>;
    standalone?: boolean;
}

export type T_MongooseModelMiddlewareFunction = (this: T_MiddlewareContext<C_Document>, next: I_HookNextFunction) => void;

export interface I_MongooseModelMiddleware {
    method: string;
    fn: T_MongooseModelMiddlewareFunction;
}

export interface I_GenerateModelOptions<D extends Partial<C_Document>>
    extends I_MongooseOptions<D> {
    schema: T_Input_MongooseSchema<D>;
    name: string;
    aggregate?: boolean;
    middlewares?: I_MongooseModelMiddleware[];
    pagination?: boolean;
}

export interface I_ExtendedModel<D extends Partial<C_Document>>
    extends Model<D>, PaginateModel<D>,
    AggregatePaginateModel<D> { }

// eslint-disable-next-line ts/no-empty-object-type
export interface I_ReturnSuccess<D, E = {}> {
    success: true;
    result: D & E;
    message?: string;
    code?: number | string;
}

export interface I_ReturnFailure {
    success: false;
    message: string;
    code: number | string;
}

// eslint-disable-next-line ts/no-empty-object-type
export type I_Return<D = void, E = {}> = I_ReturnSuccess<D, E> | I_ReturnFailure;

// MongoDB and Mongoose Type Aliases

export type T_Filter<D> = Filter<D>;
export type T_InsertOneResult<D> = InsertOneResult<D>;
export type T_InsertManyResult<D> = InsertManyResult<D>;
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
export type T_UpdateResult = UpdateResult;
export type T_DeleteResult = DeleteResult;
export type T_WithId<T> = WithId<T>;
export type T_OptionalUnlessRequiredId<T> = OptionalUnlessRequiredId<T>;

export type T_Input_Populate =
    | string
    | string[]
    | T_PopulateOptions
    | T_PopulateOptions[];

export interface T_PaginateOptionsWithPopulate
    extends T_PaginateOptions,
    T_PopulateOption { }

export type T_GenerateSlugQueryResponse<D> = T_FilterQuery<D> & {
    $or: Array<{ slug: string } | { slugHistory: string }>;
} & { id?: { $ne: string } };

// Input Interfaces

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

export interface I_Input_DeleteOne<T> {
    filter: T_FilterQuery<T>;
    options?: I_DeleteOptionsExtended;
}

export interface I_Input_DeleteMany<T> {
    filter: T_FilterQuery<T>;
    options?: I_DeleteOptionsExtended;
}

export interface I_UpdateOptionsExtended extends Omit<QueryOptions, 'session'> {
    session?: ClientSession;
}

export interface I_DeleteOptionsExtended extends Omit<QueryOptions, 'session'> {
    session?: ClientSession;
}
