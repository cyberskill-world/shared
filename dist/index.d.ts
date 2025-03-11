import * as react_jsx_runtime from 'react/jsx-runtime';
import { Db, InsertOneResult, InsertManyResult, Filter, WithId, UpdateResult, DeleteResult, Collection, OptionalUnlessRequiredId } from 'mongodb';
import mongoose, { Document, Model, PaginateModel, AggregatePaginateModel, FilterQuery, ProjectionType, QueryOptions, PopulateOptions, PaginateOptions, PopulateOption, PaginateResult, PipelineStage, AggregatePaginateResult, InsertManyOptions, UpdateQuery, ClientSession, QueryWithHelpers, Schema, SchemaDefinition } from 'mongoose';
import { ApolloClientOptions, ApolloCache } from '@apollo/client';
import * as react from 'react';
import { ReactNode, ReactElement, JSX } from 'react';
export { default as aggregatePaginate } from 'mongoose-aggregate-paginate-v2';
export { default as mongoosePaginate } from 'mongoose-paginate-v2';

interface I_LoadingProps {
    full?: boolean;
    block?: boolean;
    className?: string;
    message?: string;
}
declare function Loading({ full, block, className, message, ...rest }: I_LoadingProps): react_jsx_runtime.JSX.Element;

declare enum E_SpinnerMessage {
    LintCheck = "Running lint checks...",
    LintFix = "Fixing issues...",
    LintStaged = "Running lint-staged...",
    CommitLint = "Running commitlint...",
    Setup = "Setting up...",
    Reset = "Resetting...",
    UnitTest = "Running unit tests...",
    E2ETest = "Running end-to-end tests...",
    Success = " completed successfully!",
    Fail = " failed."
}
declare enum E_ErrorType {
    Error = "error",
    Warning = "warning"
}
interface I_ErrorEntry {
    type: E_ErrorType;
    file: string;
    message: string;
    position?: string;
    rule?: string;
}
interface I_EslintError {
    filePath: string;
    messages: Array<{
        line: number;
        column: number;
        severity: number;
        message: string;
        ruleId: string;
    }>;
}
interface I_SpinnerOptions {
    successMessage?: string;
    failureMessage?: string;
    errorList?: unknown[];
    exitOnError?: boolean;
}

interface I_Config {
    [key: string]: string | number | boolean | I_Config | I_Config[];
}

interface T_ThrowResponseArgs {
    message?: string;
    status?: {
        CODE: string | number;
        MESSAGE: string;
    };
    type?: 'graphql' | 'rest';
}

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

type T_Children = ReactNode | ReactNode[] | ReactElement | JSX.Element | null;
interface I_ApolloOptions extends Omit<ApolloClientOptions<unknown>, 'cache'> {
    cache?: ApolloCache<unknown>;
    url?: string;
}
interface I_GraphqlCodegenConfig {
    uri: string;
    from: string;
    to: string;
    withComponent?: boolean;
    withHOC?: boolean;
    withHooks?: boolean;
    withMutationFn?: boolean;
    withRefetchFn?: boolean;
}
interface I_LoadingContext {
    isLoading: boolean;
    isGlobalLoading: boolean;
    showLoading: (global?: boolean) => void;
    hideLoading: () => void;
}

interface Serializer$1<T> {
    serialize: (value: T) => string;
    deserialize: (value: string) => T;
}

declare const DIRNAME: string;

declare const RESPONSE_STATUS: {
    GRAPHQL_PARSE_FAILED: {
        CODE: string;
        MESSAGE: string;
    };
    GRAPHQL_VALIDATION_FAILED: {
        CODE: string;
        MESSAGE: string;
    };
    BAD_USER_INPUT: {
        CODE: string;
        MESSAGE: string;
    };
    PERSISTED_QUERY_NOT_FOUND: {
        CODE: string;
        MESSAGE: string;
    };
    PERSISTED_QUERY_NOT_SUPPORTED: {
        CODE: string;
        MESSAGE: string;
    };
    OPERATION_RESOLUTION_FAILURE: {
        CODE: string;
        MESSAGE: string;
    };
    CONTINUE: {
        CODE: number;
        MESSAGE: string;
    };
    SWITCHING_PROTOCOLS: {
        CODE: number;
        MESSAGE: string;
    };
    PROCESSING: {
        CODE: number;
        MESSAGE: string;
    };
    OK: {
        CODE: number;
        MESSAGE: string;
    };
    CREATED: {
        CODE: number;
        MESSAGE: string;
    };
    ACCEPTED: {
        CODE: number;
        MESSAGE: string;
    };
    NON_AUTHORITATIVE_INFORMATION: {
        CODE: number;
        MESSAGE: string;
    };
    NO_CONTENT: {
        CODE: number;
        MESSAGE: string;
    };
    RESET_CONTENT: {
        CODE: number;
        MESSAGE: string;
    };
    PARTIAL_CONTENT: {
        CODE: number;
        MESSAGE: string;
    };
    MULTI_STATUS: {
        CODE: number;
        MESSAGE: string;
    };
    MULTIPLE_CHOICES: {
        CODE: number;
        MESSAGE: string;
    };
    MOVED_PERMANENTLY: {
        CODE: number;
        MESSAGE: string;
    };
    MOVED_TEMPORARILY: {
        CODE: number;
        MESSAGE: string;
    };
    SEE_OTHER: {
        CODE: number;
        MESSAGE: string;
    };
    NOT_MODIFIED: {
        CODE: number;
        MESSAGE: string;
    };
    USE_PROXY: {
        CODE: number;
        MESSAGE: string;
    };
    TEMPORARY_REDIRECT: {
        CODE: number;
        MESSAGE: string;
    };
    PERMANENT_REDIRECT: {
        CODE: number;
        MESSAGE: string;
    };
    BAD_REQUEST: {
        CODE: number;
        MESSAGE: string;
    };
    UNAUTHORIZED: {
        CODE: number;
        MESSAGE: string;
    };
    PAYMENT_REQUIRED: {
        CODE: number;
        MESSAGE: string;
    };
    FORBIDDEN: {
        CODE: number;
        MESSAGE: string;
    };
    NOT_FOUND: {
        CODE: number;
        MESSAGE: string;
    };
    METHOD_NOT_ALLOWED: {
        CODE: number;
        MESSAGE: string;
    };
    NOT_ACCEPTABLE: {
        CODE: number;
        MESSAGE: string;
    };
    PROXY_AUTHENTICATION_REQUIRED: {
        CODE: number;
        MESSAGE: string;
    };
    REQUEST_TIMEOUT: {
        CODE: number;
        MESSAGE: string;
    };
    CONFLICT: {
        CODE: number;
        MESSAGE: string;
    };
    GONE: {
        CODE: number;
        MESSAGE: string;
    };
    LENGTH_REQUIRED: {
        CODE: number;
        MESSAGE: string;
    };
    PRECONDITION_FAILED: {
        CODE: number;
        MESSAGE: string;
    };
    REQUEST_TOO_LONG: {
        CODE: number;
        MESSAGE: string;
    };
    REQUEST_URI_TOO_LONG: {
        CODE: number;
        MESSAGE: string;
    };
    UNSUPPORTED_MEDIA_TYPE: {
        CODE: number;
        MESSAGE: string;
    };
    REQUESTED_RANGE_NOT_SATISFIABLE: {
        CODE: number;
        MESSAGE: string;
    };
    EXPECTATION_FAILED: {
        CODE: number;
        MESSAGE: string;
    };
    IM_A_TEAPOT: {
        CODE: number;
        MESSAGE: string;
    };
    INSUFFICIENT_SPACE_ON_RESOURCE: {
        CODE: number;
        MESSAGE: string;
    };
    METHOD_FAILURE: {
        CODE: number;
        MESSAGE: string;
    };
    MISDIRECTED_REQUEST: {
        CODE: number;
        MESSAGE: string;
    };
    UNPROCESSABLE_ENTITY: {
        CODE: number;
        MESSAGE: string;
    };
    LOCKED: {
        CODE: number;
        MESSAGE: string;
    };
    FAILED_DEPENDENCY: {
        CODE: number;
        MESSAGE: string;
    };
    PRECONDITION_REQUIRED: {
        CODE: number;
        MESSAGE: string;
    };
    TOO_MANY_REQUESTS: {
        CODE: number;
        MESSAGE: string;
    };
    REQUEST_HEADER_FIELDS_TOO_LARGE: {
        CODE: number;
        MESSAGE: string;
    };
    UNAVAILABLE_FOR_LEGAL_REASONS: {
        CODE: number;
        MESSAGE: string;
    };
    INTERNAL_SERVER_ERROR: {
        CODE: number;
        MESSAGE: string;
    };
    NOT_IMPLEMENTED: {
        CODE: number;
        MESSAGE: string;
    };
    BAD_GATEWAY: {
        CODE: number;
        MESSAGE: string;
    };
    SERVICE_UNAVAILABLE: {
        CODE: number;
        MESSAGE: string;
    };
    GATEWAY_TIMEOUT: {
        CODE: number;
        MESSAGE: string;
    };
    HTTP_VERSION_NOT_SUPPORTED: {
        CODE: number;
        MESSAGE: string;
    };
    INSUFFICIENT_STORAGE: {
        CODE: number;
        MESSAGE: string;
    };
    NETWORK_AUTHENTICATION_REQUIRED: {
        CODE: number;
        MESSAGE: string;
    };
};

declare const LoadingContext: react.Context<I_LoadingContext | undefined>;

declare class MigrationController<D extends Partial<C_Document>> {
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

declare function useLoading(): I_LoadingContext;

declare function useStorage<T>(key: string, initialValue: T, serializer?: Serializer$1<T>): readonly [T, (value: T | ((val: T) => T)) => Promise<void>];

declare function ApolloProvider({ options, children }: {
    options: I_ApolloOptions;
    children: T_Children;
}): react_jsx_runtime.JSX.Element;

declare function LoadingProvider({ children }: {
    children: T_Children;
}): react_jsx_runtime.JSX.Element;

/**
 * Save the entire error list to storage.
 * @param errorList Array of I_ErrorEntry objects.
 */
declare function saveErrorListToStorage(errorList: I_ErrorEntry[]): Promise<void>;
/**
 * Get all stored error lists.
 * @returns An array of stored error objects.
 */
declare function getStoredErrorLists(): Promise<I_ErrorEntry[]>;
/**
 * Clear expired error lists from storage.
 */
declare function clearExpiredErrorLists(): Promise<void>;

declare function displayResults(): Promise<void>;

/**
 * Wraps an async function with a loading spinner.
 * @param message Message to display in the spinner.
 * @param action Async action to perform.
 * @param options Additional options.
 */
declare function runWithSpinner(message: string, action: () => Promise<void>, options?: I_SpinnerOptions): Promise<void>;

declare function logProcessStep(message: string, icon?: string): void;
declare function parseCommandOutput(output: string): void;
declare function executeCommand(command: string, description: string, parser?: typeof parseCommandOutput): Promise<void>;

declare function throwResponse({ message, status, type, }: T_ThrowResponseArgs): never;

/**
 * Generate a mongoose schema with optional virtuals and generic fields.
 * @param options - Schema generation options.
 * @param options.mongoose - The mongoose instance.
 * @param options.schema - The schema definition.
 * @param options.virtuals - List of virtual fields.
 * @param options.standalone - Whether to include generic fields.
 * @returns Enhanced schema.
 */
declare function generateSchema<D extends Partial<C_Document>>({ mongoose, schema, virtuals, standalone, }: I_GenerateSchemaOptions<D>): T_MongooseShema<D>;
/**
 * Generate a mongoose model with optional pagination, aggregation, and middleware.
 * @param options - Model generation options.
 * @param options.mongoose - The mongoose instance.
 * @param options.name - The name of the model.
 * @param options.schema - The schema definition.
 * @param options.pagination - Whether to enable pagination plugin.
 * @param options.aggregate - Whether to enable aggregate pagination plugin.
 * @param options.virtuals - List of virtual fields.
 * @param options.middlewares - Middleware functions to add.
 * @returns Mongoose model.
 */
declare function generateModel<D extends Partial<C_Document>>({ mongoose, name, schema, pagination, aggregate, virtuals, middlewares, }: I_GenerateModelOptions<D>): I_ExtendedModel<D>;
declare function generateSlug(str?: string, options?: I_SlugifyOptions): string;
declare function generateShortId(uuid: string, length?: number): string;
declare function generateSlugQuery<D>(slug: string, filters?: T_FilterQuery<D>, id?: string): T_GenerateSlugQueryResponse<D>;

declare function getLatestPackageVersion(packageName: string, forceRefresh?: boolean): Promise<string>;
/**
 * Check if the installed package is outdated.
 * @param packageName Name of the package.
 * @param forceRefresh Whether to bypass cache and force refresh.
 * @returns True if the installed version is different from the latest version.
 */
declare function isPackageOutdated(packageName: string, forceRefresh?: boolean): Promise<boolean>;
/**
 * Update the specified package to the latest version.
 * @param packageName Name of the package.
 */
declare function updatePackage(packageName: string): Promise<void>;
declare function isCurrentProject(INIT_CWD: string, PACKAGE_NAME: string): boolean;

interface Serializer<T> {
    serialize: (value: T) => string;
    deserialize: (value: string) => T;
}
declare const serializer: Serializer<any>;

declare const storage: {
    /**
     * Get the value of a key.
     * @param key The key to retrieve.
     * @returns A promise that resolves to the value associated with the key, or `null` if the key doesn't exist.
     */
    get<T = unknown>(key: string): Promise<T | null>;
    /**
     * Set the value for a key.
     * @param key The key to set.
     * @param value The value to store.
     * @returns A promise that resolves once the value is stored.
     */
    set<T = unknown>(key: string, value: T): Promise<void>;
    /**
     * Remove the value associated with a key.
     * @param key The key to remove.
     * @returns A promise that resolves once the key is removed.
     */
    remove(key: string): Promise<void>;
    /**
     * Get all keys in the storage.
     * @returns A promise that resolves to an array of all keys.
     */
    keys(): Promise<string[]>;
    /**
     * Get all values in the storage.
     * @returns A promise that resolves to an array of all values.
     */
    values<T = unknown>(): Promise<T[]>;
    /**
     * Get all entries in the storage as [key, value] tuples.
     * @returns A promise that resolves to an array of entries.
     */
    entries<T = unknown>(): Promise<[string, T][]>;
    /**
     * Clear all keys and values in the storage.
     * @returns A promise that resolves once the storage is cleared.
     */
    clear(): Promise<void>;
    /**
     * Get the number of items in the storage.
     * @returns A promise that resolves to the number of keys stored.
     */
    length(): Promise<number>;
};

declare const validate: {
    common: {
        /**
         * Check if a value is empty (null, undefined, empty string, empty array, or empty object).
         * @param {unknown} value - The value to check.
         * @returns {boolean} - True if the value is empty; otherwise, false.
         */
        isEmpty(value: unknown): boolean;
        /**
         * Validator to check if a value is not empty.
         * @returns {(value: unknown) => Promise<boolean>} - The validation function.
         */
        isEmptyValidator<T>(): (this: T, value: unknown) => Promise<boolean>;
        /**
         * Validator to check if a value is unique in specified fields.
         * @param {string[]} fields - Fields to check for uniqueness.
         * @returns {(value: unknown) => Promise<boolean>} - The validation function.
         */
        isUniqueValidator<T extends {
            constructor: {
                findOne: (query: Record<string, unknown>) => Promise<unknown>;
            };
        }>(fields: string[]): (this: T, value: unknown) => Promise<boolean>;
        /**
         * Validator to check if a value matches all regex patterns in an array.
         * @param {RegExp[]} regexArray - Array of regex patterns.
         * @returns {(value: string) => Promise<boolean>} - The validation function.
         */
        matchesRegexValidator(regexArray: RegExp[]): (value: string) => Promise<boolean>;
    };
};

declare function deepMerge(...configs: (I_Config | I_Config[])[]): I_Config;
declare function isJson(str: string): boolean;
declare function regexSearchMapper(str: string): string;
declare const removeAccent: (str: string) => string;

export { ApolloProvider, C_Collection, C_Db, C_Document, C_Model, DIRNAME, E_ErrorType, E_SpinnerMessage, type I_ApolloOptions, type I_Config, type I_DeleteOptionsExtended, type I_ErrorEntry, type I_EslintError, type I_ExtendedModel, type I_GenerateModelOptions, type I_GenerateSchemaOptions, type I_GenericDocument, type I_GraphqlCodegenConfig, type I_HookNextFunction, type I_Input_CreateMany, type I_Input_CreateOne, type I_Input_DeleteMany, type I_Input_DeleteOne, type I_Input_FindAll, type I_Input_FindOne, type I_Input_FindPaging, type I_Input_FindPagingAggregate, type I_Input_UpdateMany, type I_Input_UpdateOne, type I_LoadingContext, type I_LoadingProps, type I_MongooseModelMiddleware, type I_MongooseOptions, type I_Return, type I_ReturnFailure, type I_ReturnSuccess, type I_SlugifyOptions, type I_SpinnerOptions, type I_UpdateOptionsExtended, Loading, LoadingContext, LoadingProvider, MigrationController, MongooseController, RESPONSE_STATUS, type Serializer$1 as Serializer, type T_AggregatePaginateResult, type T_Children, type T_DeleteResult, type T_Filter, type T_FilterQuery, type T_GenerateSlugQueryResponse, type T_Input_MongooseSchema, type T_Input_Populate, type T_InsertManyOptions, type T_InsertManyResult, type T_InsertOneResult, type T_MiddlewareContext, type T_MongooseModelMiddlewareFunction, type T_MongoosePlugin, type T_MongooseShema, type T_OptionalUnlessRequiredId, type T_PaginateOptions, type T_PaginateOptionsWithPopulate, type T_PaginateResult, type T_PipelineStage, type T_PopulateOption, type T_PopulateOptions, type T_ProjectionType, type T_QueryOptions, type T_ThrowResponseArgs, type T_UpdateQuery, type T_UpdateResult, type T_WithId, clearExpiredErrorLists, deepMerge, displayResults, executeCommand, generateModel, generateSchema, generateShortId, generateSlug, generateSlugQuery, getLatestPackageVersion, getStoredErrorLists, isCurrentProject, isJson, isPackageOutdated, logProcessStep, regexSearchMapper, removeAccent, runWithSpinner, saveErrorListToStorage, serializer, storage, throwResponse, updatePackage, useLoading, useStorage, validate };
