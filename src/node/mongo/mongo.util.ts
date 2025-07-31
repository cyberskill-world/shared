import type mongooseRaw from 'mongoose';

import { cloneDeep, isObject } from 'lodash-es';
import migrate from 'migrate-mongo';
import aggregatePaginate from 'mongoose-aggregate-paginate-v2';
import mongoosePaginate from 'mongoose-paginate-v2';
import { v4 as uuidv4 } from 'uuid';

import type { I_Return } from '#typescript/index.js';

import { RESPONSE_STATUS } from '#constant/index.js';
import { getNestedValue, normalizeMongoFilter, regexSearchMapper, setNestedValue } from '#util/index.js';
import { generateShortId, generateSlug } from '#util/string/index.js';
import { validate } from '#util/validate/index.js';

import type { C_Collection, C_Db, I_CreateModelOptions, I_CreateSchemaOptions, I_DeleteOptionsExtended, I_DynamicVirtualConfig, I_DynamicVirtualOptions, I_ExtendedModel, I_GenericDocument, I_Input_CheckSlug, I_Input_CreateSlug, I_Input_GenerateSlug, I_MongooseModelMiddleware, I_PaginateOptionsWithPopulate, I_UpdateOptionsExtended, T_AggregatePaginateResult, T_DeleteResult, T_Filter, T_FilterQuery, T_Input_Populate, T_InsertManyOptions, T_MongoosePlugin, T_MongooseShema, T_OptionalUnlessRequiredId, T_PaginateResult, T_PipelineStage, T_PopulateOptions, T_ProjectionType, T_QueryOptions, T_UpdateQuery, T_UpdateResult, T_VirtualOptions, T_WithId } from './mongo.type.js';

import { appendFileSync, pathExistsSync, readFileSync, writeFileSync } from '../fs/index.js';
import { catchError } from '../log/index.js';
import { MIGRATE_MONGO_CONFIG, PATH } from '../path/index.js';
import { MONGO_SLUG_MAX_ATTEMPTS } from './mongo.constant.js';
import { C_Document } from './mongo.type.js';

/**
 * Converts enum values to proper model names.
 * Handles common naming conventions like converting 'USER' to 'User'.
 *
 * @param enumValue - The enum value to convert
 * @returns The converted model name
 */
function convertEnumToModelName(enumValue: string): string {
    if (enumValue === enumValue.toUpperCase()) {
        return enumValue.charAt(0).toUpperCase() + enumValue.slice(1).toLowerCase();
    }

    return enumValue;
}

/**
 * MongoDB utility object providing comprehensive database operations and utilities.
 * This object contains methods for creating generic fields, applying plugins and middlewares,
 * creating schemas and models, validation functions, migration utilities, and regex filtering.
 */
export const mongo = {
    /**
     * Creates generic fields that are commonly used across MongoDB documents.
     * This function generates standard fields including a UUID, deletion flag, and timestamps
     * that can be applied to any document schema.
     *
     * @returns An object containing generic document fields (id, isDel, createdAt, updatedAt).
     */
    createGenericFields(): I_GenericDocument {
        return {
            id: uuidv4(),
            isDel: false,
            createdAt: new Date(),
            updatedAt: new Date(),
        };
    },
    /**
     * Applies plugins to a Mongoose schema.
     * This function filters out falsy plugins and applies the remaining valid plugins
     * to the provided schema.
     *
     * @param schema - The Mongoose schema to apply plugins to.
     * @param plugins - An array of plugin functions or false values to filter and apply.
     */
    applyPlugins<T>(schema: T_MongooseShema<T>, plugins: Array<T_MongoosePlugin | false>) {
        plugins
            .filter((plugin): plugin is T_MongoosePlugin => typeof plugin === 'function')
            .forEach(plugin => schema.plugin(plugin));
    },
    /**
     * Applies middleware functions to a Mongoose schema.
     * This function configures pre and post middleware for specified methods on the schema.
     *
     * @param schema - The Mongoose schema to apply middleware to.
     * @param middlewares - An array of middleware configurations with method, pre, and post functions.
     */
    applyMiddlewares<T extends Partial<C_Document>>(
        schema: T_MongooseShema<T>,
        middlewares: I_MongooseModelMiddleware<T>[],
    ) {
        middlewares.forEach(({ method, pre, post }) => {
            if (method && pre) {
                schema.pre(method as RegExp, pre);
            }

            if (method && post) {
                schema.post(method as RegExp, post);
            }
        });
    },
    /**
     * Creates a generic Mongoose schema with common fields.
     * This function creates a base schema with UUID field and deletion flag,
     * configured with automatic timestamps.
     *
     * @param mongoose - The Mongoose instance to create the schema with.
     * @returns A Mongoose schema with generic document fields.
     */
    createGenericSchema(mongoose: typeof mongooseRaw) {
        return new mongoose.Schema<I_GenericDocument>(
            {
                id: { type: String, default: uuidv4, unique: true },
                isDel: { type: Boolean, default: false },
            },
            { timestamps: true },
        );
    },
    /**
     * Creates a Mongoose schema with optional virtual fields and generic fields.
     * This function creates a new Mongoose schema from the provided schema definition,
     * optionally adds virtual fields, and includes generic fields (unless standalone is true).
     *
     * @param options - Configuration options including mongoose instance, schema definition, virtuals, and standalone flag.
     * @param options.mongoose - The Mongoose instance to use for schema creation.
     * @param options.schema - The schema definition object.
     * @param options.virtuals - Optional array of virtual field configurations.
     * @param options.standalone - Whether to exclude generic fields (default: false).
     * @returns A configured Mongoose schema.
     */
    createSchema<T, R extends string = string>({
        mongoose,
        schema,
        virtuals = [],
        standalone = false,
    }: I_CreateSchemaOptions<T, R>): T_MongooseShema<T> {
        const createdSchema = new mongoose.Schema<T>(schema, {
            toJSON: { virtuals: true }, // So `res.json()` and other `JSON.stringify()` functions include virtuals
            toObject: { virtuals: true }, // So `console.log()` and other functions that use `toObject()` include virtuals
        });

        virtuals.forEach(({ name, options, get }) => {
            if (mongo.isDynamicVirtual<T, R>(options)) {
                const schemaStatics = createdSchema.statics as Record<string, unknown>;

                if (!schemaStatics['_dynamicVirtuals']) {
                    schemaStatics['_dynamicVirtuals'] = [];
                }

                (schemaStatics['_dynamicVirtuals'] as I_DynamicVirtualConfig<T>[]).push({
                    name: name as string,
                    options,
                });

                const virtualInstance = createdSchema.virtual(name as string);

                if (get) {
                    virtualInstance.get(get);
                }
                else {
                    virtualInstance.get(function (this: T & { _populated?: { [key: string]: unknown } }) {
                        return this._populated?.[name as string] || (options?.count ? 0 : (options?.justOne ? null : []));
                    });
                }
            }
            else {
                const virtualInstance = createdSchema.virtual(name as string, options);

                if (get) {
                    virtualInstance.get(get);
                }
            }
        });

        if (!standalone) {
            createdSchema.add(mongo.createGenericSchema(mongoose));
        }

        return createdSchema;
    },
    /**
     * Creates a Mongoose model with plugins, middleware, and pagination support.
     * This function creates a model from a schema with optional pagination and aggregation plugins,
     * and applies any specified middleware. If a model with the same name already exists, it returns the existing model.
     *
     * @param options - Configuration options including mongoose instance, model name, schema, and feature flags.
     * @param options.mongoose - The Mongoose instance to use for model creation.
     * @param options.name - The name of the model to create.
     * @param options.schema - The schema definition for the model.
     * @param options.pagination - Whether to enable pagination plugin (default: false).
     * @param options.aggregate - Whether to enable aggregation pagination plugin (default: false).
     * @param options.virtuals - Optional array of virtual field configurations.
     * @param options.middlewares - Optional array of middleware configurations.
     * @returns A configured Mongoose model with extended functionality.
     * @throws {Error} When the model name is not provided.
     */
    createModel<T extends Partial<C_Document>, R extends string = string>({
        mongoose: currentMongooseInstance,
        name,
        schema,
        virtuals = [],
        pagination = true,
        aggregate = true,
        middlewares = [],
    }: I_CreateModelOptions<T, R>): I_ExtendedModel<T> {
        if (!name) {
            throw new Error('Model name is required.');
        }

        if (currentMongooseInstance.models[name]) {
            return currentMongooseInstance.models[name] as I_ExtendedModel<T>;
        }

        const createdSchema = mongo.createSchema({ mongoose: currentMongooseInstance, schema, virtuals });

        if (pagination || aggregate) {
            mongo.applyPlugins<T>(createdSchema, [
                pagination && mongoosePaginate,
                aggregate && aggregatePaginate,
            ]);
        }

        mongo.applyMiddlewares<T>(createdSchema, middlewares);

        return currentMongooseInstance.model<T>(name, createdSchema) as I_ExtendedModel<T>;
    },
    /**
     * Validation utilities for Mongoose schemas.
     * This object provides common validation functions that can be used in Mongoose schema definitions.
     */
    validator: {
        /**
         * Creates a required field validator.
         * This function returns a validator that checks if a field value is not empty
         * using the validate.isEmpty utility.
         *
         * @returns A validation function that returns true if the field is not empty.
         */
        isRequired<T>(): (this: T, value: unknown) => Promise<boolean> {
            return async function (this: T, value: unknown): Promise<boolean> {
                return !validate.isEmpty(value);
            };
        },
        /**
         * Creates a unique field validator.
         * This function returns a validator that checks if a field value is unique
         * across the specified fields in the collection.
         *
         * @param fields - An array of field names to check for uniqueness.
         * @returns A validation function that returns true if the value is unique across the specified fields.
         * @throws {Error} When fields is not a non-empty array of strings.
         */
        isUnique<T extends { constructor: { exists: (query: { [key: string]: unknown }) => Promise<unknown> } }>(fields: string[]) {
            return async function (this: T, value: unknown): Promise<boolean> {
                if (!Array.isArray(fields) || fields.length === 0) {
                    throw new Error('Fields must be a non-empty array of strings.');
                }

                const query = { $or: fields.map(field => ({ [field]: value })) };
                const existingDocument = await this.constructor.exists(query);

                return !existingDocument;
            };
        },
        /**
         * Creates a regex pattern validator.
         * This function returns a validator that checks if a string value matches
         * all provided regular expressions.
         *
         * @param regexArray - An array of regular expressions to test against the value.
         * @returns A validation function that returns true if the value matches all regex patterns.
         * @throws {Error} When regexArray is not an array of valid RegExp objects.
         */
        matchesRegex(regexArray: RegExp[]): (value: string) => Promise<boolean> {
            return async function (value: string): Promise<boolean> {
                if (!Array.isArray(regexArray) || regexArray.some(r => !(r instanceof RegExp))) {
                    throw new Error('regexArray must be an array of valid RegExp objects.');
                }

                return regexArray.every(regex => regex.test(value));
            };
        },
    },
    /**
     * Migration utilities for MongoDB.
     * This object extends the migrate-mongo library with additional configuration utilities.
     */
    migrate: {
        ...migrate,
        /**
         * Sets the migration configuration and updates .gitignore.
         * This function creates a migration configuration file and ensures it's properly
         * excluded from version control.
         *
         * @param options - Migration configuration options to write to the config file.
         */
        setConfig: (options: Partial<migrate.config.Config> & { moduleSystem?: 'commonjs' | 'esm' }) => {
            const optionsJS = `// This file is automatically generated by the Cyberskill CLI.\nmodule.exports = ${JSON.stringify(options, null, 4)}`;

            writeFileSync(PATH.MIGRATE_MONGO_CONFIG, optionsJS);

            const gitIgnoreEntry = `\n${MIGRATE_MONGO_CONFIG}\n`;

            if (pathExistsSync(PATH.GIT_IGNORE)) {
                const gitignore = readFileSync(PATH.GIT_IGNORE, 'utf-8').split('\n');

                if (!gitignore.includes(MIGRATE_MONGO_CONFIG)) {
                    appendFileSync(PATH.GIT_IGNORE, gitIgnoreEntry);
                }
            }
            else {
                writeFileSync(PATH.GIT_IGNORE, gitIgnoreEntry);
            }
        },
    },
    /**
     * Converts string values in a filter to regex patterns for case-insensitive search.
     * This function recursively processes a filter object and converts string values in specified fields
     * to MongoDB regex patterns that support accented character matching.
     *
     * @param filter - The filter object to process.
     * @param fields - An array of field names to convert to regex patterns.
     * @returns A new filter object with string values converted to regex patterns.
     */
    regexify<T>(filter?: T_FilterQuery<T>, fields?: (keyof T | string)[]): T_FilterQuery<T> {
        if (!filter) {
            return {} as T_FilterQuery<T>;
        }

        let newFilter = cloneDeep(filter);

        if (!fields || fields.length === 0) {
            return newFilter;
        }

        for (const field of fields) {
            const path = field.toString().split('.');
            const value = getNestedValue(newFilter, path);

            if (typeof value === 'string' && value.length > 0) {
                const regexValue = {
                    $regex: `.*${regexSearchMapper(value)}.*`,
                    $options: 'i',
                };

                newFilter = setNestedValue(newFilter, path, regexValue);
            }
        }

        return newFilter;
    },
    /**
     * Checks if a virtual options object has a dynamic ref function.
     *
     * @param options - The virtual options to check.
     * @returns True if the options contain a dynamic ref function.
     */
    isDynamicVirtual<T, R extends string = string>(options?: T_VirtualOptions<T, R>): options is I_DynamicVirtualOptions<T, R> {
        return Boolean(options && typeof options.ref === 'function');
    },

    /**
     * Generic utility function to get new records from the database
     * @param controller - MongoController instance
     * @param recordsToCheck - Array of records to check
     * @param filterFn - Function to determine if a record already exists
     * @returns Array of records that don't exist in the database
     */
    async getNewRecords<T extends I_GenericDocument>(
        controller: MongoController<T>,
        recordsToCheck: T[],
        filterFn: (existingRecord: T_WithId<T>, newRecord: T) => boolean,
    ): Promise<T[]> {
        const existingRecords = await controller.findAll({});

        if (!existingRecords.success) {
            return recordsToCheck;
        }

        const filteredRecords = recordsToCheck.filter(newRecord =>
            !existingRecords.result.some((existingRecord: T_WithId<T>) =>
                filterFn(existingRecord, newRecord),
            ),
        );

        return filteredRecords;
    },

    /**
     * Generic utility function to get existing records that match the filter criteria
     * @param controller - MongoController instance
     * @param recordsToCheck - Array of records to check
     * @param filterFn - Function to determine if a record exists
     * @returns Array of existing records that match the filter criteria
     */
    async getExistingRecords<T extends I_GenericDocument>(
        controller: MongoController<T>,
        recordsToCheck: T[],
        filterFn: (existingRecord: T_WithId<T>, newRecord: T) => boolean,
    ): Promise<T_WithId<T>[]> {
        const existingRecords = await controller.findAll({});

        if (!existingRecords.success) {
            return [];
        }

        const foundRecords = existingRecords.result.filter((existingRecord: T_WithId<T>) =>
            recordsToCheck.some((newRecord: T) =>
                filterFn(existingRecord, newRecord),
            ),
        );

        return foundRecords;
    },
};

/**
 * Filters out dynamic virtuals from populate options to prevent Mongoose from trying to populate them.
 * This function creates a new populate configuration that only includes regular virtuals.
 *
 * @template T - The document type
 * @param populate - The original populate options
 * @param dynamicVirtuals - Array of dynamic virtual configurations
 * @returns Filtered populate options excluding dynamic virtuals
 */
function filterDynamicVirtualsFromPopulate<T>(
    populate: T_Input_Populate | undefined,
    dynamicVirtuals: I_DynamicVirtualConfig<T>[] | undefined,
): T_Input_Populate | undefined {
    if (!populate || !dynamicVirtuals || dynamicVirtuals.length === 0) {
        return populate;
    }

    const dynamicVirtualNames = new Set(dynamicVirtuals.map(v => v.name));

    if (Array.isArray(populate)) {
        const filtered = populate.filter((p) => {
            if (typeof p === 'string') {
                return !dynamicVirtualNames.has(p);
            }
            if (typeof p === 'object' && p !== null) {
                const popObj = p as { path?: string; populate?: string };

                return !dynamicVirtualNames.has(popObj.path || popObj.populate || '');
            }

            return true;
        });

        return filtered.length > 0 ? (filtered as T_Input_Populate) : undefined;
    }

    if (typeof populate === 'string') {
        return dynamicVirtualNames.has(populate) ? undefined : populate;
    }

    if (typeof populate === 'object' && populate !== null) {
        const popObj = populate as { path?: string; populate?: string };
        const virtualName = popObj.path || popObj.populate || '';

        return dynamicVirtualNames.has(virtualName) ? undefined : populate;
    }

    return populate;
}

/**
 * Groups documents by the resolved model name for a dynamic virtual field.
 * Used to batch population queries for dynamic virtuals.
 *
 * @template T - The document type
 * @template R - The model name type (usually string or enum)
 * @param {T[]} documents - The array of documents to process
 * @param {string} virtualName - The name of the dynamic virtual field
 * @param {I_DynamicVirtualOptions<T, R>} virtualOptions - The dynamic virtual options (must include a ref function)
 * @returns {Array<{ model: string; docs: T[] }>} An array of groups, each with a model name and the docs for that model
 */
function remapDynamicPopulate<T, R extends string = string>(
    documents: T[],
    virtualName: string,
    virtualOptions: I_DynamicVirtualOptions<T, R>,
): Array<{ model: string; docs: T[] }> {
    if (!documents.length || !virtualName || !virtualOptions?.ref) {
        return [];
    }

    const modelGroups = new Map<string, T[]>();
    documents.forEach((doc) => {
        try {
            const modelName = virtualOptions.ref(doc);

            if (modelName === undefined || modelName === null) {
                return;
            }

            const modelNameString = typeof modelName === 'string' ? modelName : String(modelName);

            if (modelNameString && modelNameString.trim() !== '') {
                const convertedModelName = convertEnumToModelName(modelNameString);

                if (!modelGroups.has(convertedModelName)) {
                    modelGroups.set(convertedModelName, []);
                }
                modelGroups.get(convertedModelName)!.push(doc);
            }
        }
        catch (error) {
            catchError(new Error(`Dynamic ref function failed for virtual "${virtualName}": ${error instanceof Error ? error.message : String(error)}`));
        }
    });
    return Array.from(modelGroups.entries()).map(([model, docs]) => ({ model, docs }));
}

/**
 * Optimized batch population for dynamic virtuals.
 *
 * - Groups documents by model and batches queries for each model.
 * - Populates all dynamic virtuals in parallel for maximum performance.
 * - Uses direct assignment for plain objects and skips already populated fields.
 * - Supports optional projection for population queries.
 * - Only populates virtuals that are explicitly requested in populate options.
 * - Reminder: Ensure indexes exist on foreignField in referenced collections for best performance.
 *
 * @template T - The document type (must be an object)
 * @template R - The model name type (usually string or enum)
 * @param {typeof mongooseRaw} mongoose - The Mongoose instance
 * @param {T[]} documents - The array of documents to populate
 * @param {I_DynamicVirtualConfig<T, R>[]} virtualConfigs - The dynamic virtual configurations to process
 * @param {T_Input_Populate} [populate] - Population options to determine which virtuals to populate
 * @param {Record<string, 0 | 1>} [projection] - Optional projection for population queries
 * @returns {Promise<object[]>} The array of documents with dynamic virtuals populated
 */
async function populateDynamicVirtuals<T extends object, R extends string = string>(
    mongoose: typeof mongooseRaw,
    documents: T[],
    virtualConfigs: I_DynamicVirtualConfig<T, R>[],
    populate?: T_Input_Populate,
    projection?: Record<string, 0 | 1>,
): Promise<T[]> {
    if (!documents.length || !virtualConfigs.length) {
        return documents;
    }

    if (!populate) {
        return documents;
    }

    const requestedVirtuals = virtualConfigs.filter((config) => {
        if (Array.isArray(populate)) {
            return populate.length > 0 && populate.some(p => typeof p === 'string' ? p === config.name : (p as { path?: string }).path === config.name);
        }

        if (typeof populate === 'string') {
            return populate === config.name;
        }

        if (typeof populate === 'object' && populate !== null) {
            const popObj = populate as { path?: string; populate?: string };

            return (popObj.path && popObj.path === config.name) || (popObj.populate && popObj.populate === config.name);
        }

        return false;
    });

    if (requestedVirtuals.length === 0) {
        return documents;
    }

    const clonedDocuments = cloneDeep(documents);

    clonedDocuments.forEach((doc) => {
        requestedVirtuals.forEach(({ name, options }) => {
            if (!(name in doc)) {
                (doc as { [key: string]: unknown })[name as string] = options.count ? 0 : (options.justOne ? null : []);
            }
        });
    });

    const modelProcessingMap = new Map<string, {
        virtuals: I_DynamicVirtualConfig<T, R>[];
        localValueSets: Map<string, Set<string>>;
        docsByLocalValue: Map<string, number[]>;
    }>();

    for (const virtualConfig of requestedVirtuals) {
        const { name, options } = virtualConfig;
        const populateGroups = remapDynamicPopulate(clonedDocuments, name, options);

        for (const group of populateGroups) {
            if (!modelProcessingMap.has(group.model)) {
                modelProcessingMap.set(group.model, {
                    virtuals: [],
                    localValueSets: new Map(),
                    docsByLocalValue: new Map(),
                });
            }

            const processing = modelProcessingMap.get(group.model)!;

            if (!processing.virtuals.find(v => v.name === name)) {
                processing.virtuals.push(virtualConfig);
                processing.localValueSets.set(name as string, new Set());
            }

            const localValueSet = processing.localValueSets.get(name as string)!;
            group.docs.forEach((doc) => {
                const localVal = (doc as { [key: string]: unknown })[options.localField];

                if (localVal != null) {
                    const strVal = String(localVal);
                    localValueSet.add(strVal);

                    let idx = -1;

                    const docWithKeys = doc as { [key: string]: unknown };

                    if (docWithKeys['id'] !== undefined) {
                        idx = clonedDocuments.findIndex((d) => {
                            const dWithKeys = d as { [key: string]: unknown };

                            return dWithKeys['id'] === docWithKeys['id'];
                        });
                    }
                    else if (docWithKeys['_id'] !== undefined) {
                        idx = clonedDocuments.findIndex((d) => {
                            const dWithKeys = d as { [key: string]: unknown };

                            return dWithKeys['_id']?.toString?.() === docWithKeys['_id']?.toString?.();
                        });
                    }

                    if (idx !== -1) {
                        if (!processing.docsByLocalValue.has(strVal)) {
                            processing.docsByLocalValue.set(strVal, []);
                        }
                        processing.docsByLocalValue.get(strVal)!.push(idx);
                    }
                }
            });
        }
    }

    await Promise.all(Array.from(modelProcessingMap.entries()).map(async ([modelName, processing]) => {
        const Model = mongoose.models[modelName];

        if (!Model) {
            return;
        }

        const allLocalValues = new Set<string>();
        processing.localValueSets.forEach((localValueSet) => {
            localValueSet.forEach(val => allLocalValues.add(val));
        });

        if (allLocalValues.size === 0) {
            return;
        }

        const foreignFields = [...new Set(processing.virtuals.map(v => v.options.foreignField))];
        const localValuesArray = Array.from(allLocalValues);
        let query;

        if (foreignFields.length === 1) {
            query = { [String(foreignFields[0])]: { $in: localValuesArray } };
        }
        else {
            query = { $or: foreignFields.map(field => ({ [field]: { $in: localValuesArray } })) };
        }

        const allPopulatedData = await Model.find(query, projection).lean();

        for (const virtualConfig of processing.virtuals) {
            const { name, options } = virtualConfig;
            const relevantData = allPopulatedData.filter((item) => {
                const foreignVal = (item)[options.foreignField];

                return foreignVal != null && allLocalValues.has(String(foreignVal));
            });

            if (options.count) {
                const countMap = new Map<string, number>();

                relevantData.forEach((item) => {
                    const key = (item)[options.foreignField]?.toString();

                    if (key) {
                        countMap.set(key, (countMap.get(key) || 0) + 1);
                    }
                });

                processing.localValueSets.get(name as string)!.forEach((localValue) => {
                    const docs = processing.docsByLocalValue.get(localValue) || [];
                    const count = countMap.get(localValue) || 0;

                    docs.forEach((idx) => {
                        const docToUpdate = clonedDocuments[idx] as { [key: string]: unknown };

                        if (docToUpdate[name] === undefined) {
                            docToUpdate[name] = count;
                        }
                    });
                });
            }
            else {
                const resultMap = new Map<string, T[]>();

                relevantData.forEach((item) => {
                    const key = (item)[options.foreignField]?.toString();

                    if (key) {
                        if (!resultMap.has(key)) {
                            resultMap.set(key, []);
                        }
                        resultMap.get(key)!.push(item);
                    }
                });

                processing.localValueSets.get(name as string)!.forEach((localVal) => {
                    const docs = processing.docsByLocalValue.get(localVal) || [];
                    const results = resultMap.get(localVal) || [];
                    const value = options.justOne ? (results[0] || null) : results;

                    docs.forEach((idx) => {
                        const docToUpdate = clonedDocuments[idx] as { [key: string]: unknown };
                        docToUpdate[name] = value;
                    });
                });
            }
        }
    }));

    return clonedDocuments;
}

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
            const result = await this.collection.findOne(filter);

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
            const result = await this.collection.find(filter).toArray();

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
                    code: RESPONSE_STATUS.INTERNAL_SERVER_ERROR.CODE,
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
                    code: RESPONSE_STATUS.INTERNAL_SERVER_ERROR.CODE,
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
                    code: RESPONSE_STATUS.INTERNAL_SERVER_ERROR.CODE,
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
                    code: RESPONSE_STATUS.INTERNAL_SERVER_ERROR.CODE,
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

/**
 * Mongoose controller for database operations with advanced features.
 * This class provides a comprehensive interface for Mongoose operations including
 * pagination, aggregation, slug generation, and short ID creation.
 */
export class MongooseController<T extends Partial<C_Document>> {
    /**
     * Creates a new Mongoose controller instance.
     *
     * @param model - The Mongoose model to operate on.
     */
    constructor(private model: I_ExtendedModel<T>) { }

    /**
     * Gets the model name for logging and error messages.
     *
     * @returns The name of the model.
     */
    private getModelName(): string {
        return this.model.modelName;
    }

    /**
     * Gets the dynamic virtuals configuration from the model schema.
     *
     * @returns Array of dynamic virtual configurations or undefined if none exist.
     */
    private getDynamicVirtuals(): I_DynamicVirtualConfig<T>[] | undefined {
        const schemaStatics = this.model.schema.statics as { [key: string]: unknown };

        return schemaStatics['_dynamicVirtuals'] as I_DynamicVirtualConfig<T>[] | undefined;
    }

    /**
     * Populates dynamic virtuals for a single document.
     *
     * @param result - The document to populate dynamic virtuals for.
     * @param populate - The populate options to determine which virtuals to populate.
     * @returns The document with dynamic virtuals populated.
     */
    private async populateDynamicVirtualsForDocument(result: T, populate?: T_Input_Populate): Promise<T> {
        const dynamicVirtuals = this.getDynamicVirtuals();

        if (dynamicVirtuals && dynamicVirtuals.length > 0) {
            const populatedArr = await populateDynamicVirtuals(this.model.base, [result], dynamicVirtuals, populate);

            return (populatedArr && populatedArr[0]) ? populatedArr[0] as T : result;
        }

        return result;
    }

    /**
     * Populates dynamic virtuals for an array of documents.
     *
     * @param results - The documents to populate dynamic virtuals for.
     * @param populate - The populate options to determine which virtuals to populate.
     * @returns The documents with dynamic virtuals populated.
     */
    private async populateDynamicVirtualsForDocuments(results: T[], populate?: T_Input_Populate): Promise<T[]> {
        const dynamicVirtuals = this.getDynamicVirtuals();

        if (dynamicVirtuals && dynamicVirtuals.length > 0 && results.length > 0) {
            return await populateDynamicVirtuals(this.model.base, results, dynamicVirtuals, populate) as T[];
        }

        return results;
    }

    /**
     * Finds a single document with optional population and projection.
     * Automatically handles dynamic virtual population if configured.
     *
     * @param filter - The filter criteria to find the document.
     * @param projection - The fields to include/exclude in the result.
     * @param options - Query options for the operation.
     * @param populate - Population configuration for related documents.
     * @returns A promise that resolves to a standardized response with the found document.
     */
    async findOne(
        filter: T_FilterQuery<T> = {},
        projection: T_ProjectionType<T> = {},
        options: T_QueryOptions<T> = {},
        populate?: T_Input_Populate,
    ): Promise<I_Return<T>> {
        try {
            const normalizedFilter = normalizeMongoFilter(filter);
            const query = this.model.findOne(normalizedFilter, projection, options);
            const dynamicVirtuals = this.getDynamicVirtuals();

            const regularPopulate = filterDynamicVirtualsFromPopulate(populate, dynamicVirtuals);

            if (regularPopulate) {
                query.populate(regularPopulate as T_PopulateOptions);
            }

            const result = await query.exec().then(data => data instanceof C_Document ? data.toObject() : data);

            if (!result) {
                return {
                    success: false,
                    message: `No ${this.getModelName()} found.`,
                    code: RESPONSE_STATUS.NOT_FOUND.CODE,
                };
            }

            const finalResult = await this.populateDynamicVirtualsForDocument(result, populate);

            return { success: true, result: finalResult };
        }
        catch (error) {
            return catchError<T>(error);
        }
    }

    /**
     * Finds all documents with optional population and projection.
     * Automatically handles dynamic virtual population if configured.
     *
     * @param filter - The filter criteria to find documents.
     * @param projection - The fields to include/exclude in the result.
     * @param options - Query options for the operation.
     * @param populate - Population configuration for related documents.
     * @returns A promise that resolves to a standardized response with the found documents.
     */
    async findAll(
        filter: T_FilterQuery<T> = {},
        projection: T_ProjectionType<T> = {},
        options: T_QueryOptions<T> = {},
        populate?: T_Input_Populate,
    ): Promise<I_Return<T[]>> {
        try {
            const normalizedFilter = normalizeMongoFilter(filter);
            const query = this.model.find(normalizedFilter, projection, options);
            const dynamicVirtuals = this.getDynamicVirtuals();

            const regularPopulate = filterDynamicVirtualsFromPopulate(populate, dynamicVirtuals);

            if (regularPopulate) {
                query.populate(regularPopulate as T_PopulateOptions);
            }

            const result = await query.exec().then(data => data?.map(item => item instanceof C_Document ? item.toObject() : item));

            const finalResult = await this.populateDynamicVirtualsForDocuments(result, populate);

            return { success: true, result: finalResult };
        }
        catch (error) {
            return catchError<T[]>(error);
        }
    }

    /**
     * Finds documents with pagination support.
     * Automatically handles dynamic virtual population if configured.
     *
     * @param filter - The filter criteria to find documents.
     * @param options - Pagination options including page, limit, and population.
     * @returns A promise that resolves to a standardized response with paginated results.
     */
    async findPaging(
        filter: T_FilterQuery<T> = {},
        options: I_PaginateOptionsWithPopulate = {},
    ): Promise<I_Return<T_PaginateResult<T>>> {
        try {
            const normalizedFilter = normalizeMongoFilter(filter);
            const dynamicVirtuals = this.getDynamicVirtuals();

            const filteredOptions = { ...options };

            if (options.populate) {
                filteredOptions.populate = filterDynamicVirtualsFromPopulate(options.populate, dynamicVirtuals);
            }

            const result = await this.model.paginate(normalizedFilter, filteredOptions);

            const finalDocs = await this.populateDynamicVirtualsForDocuments(result.docs.map(item => item instanceof C_Document ? item.toObject() : item), options.populate);

            return { success: true, result: { ...result, docs: finalDocs } };
        }
        catch (error) {
            return catchError<T_PaginateResult<T>>(error);
        }
    }

    /**
     * Performs aggregation with pagination support.
     *
     * @param pipeline - The aggregation pipeline stages.
     * @param options - Pagination options for the aggregation result.
     * @returns A promise that resolves to a standardized response with paginated aggregation results.
     */
    async findPagingAggregate(
        pipeline: T_PipelineStage[],
        options: I_PaginateOptionsWithPopulate = {},
    ): Promise<I_Return<T_AggregatePaginateResult<T>>> {
        try {
            const dynamicVirtuals = this.getDynamicVirtuals();

            const filteredOptions = { ...options };

            if (options.populate) {
                filteredOptions.populate = filterDynamicVirtualsFromPopulate(options.populate, dynamicVirtuals);
            }

            const result = await this.model.aggregatePaginate(
                this.model.aggregate(pipeline),
                filteredOptions,
            );

            const finalDocs = await this.populateDynamicVirtualsForDocuments(result.docs.map(item => item instanceof C_Document ? item.toObject() : item), options.populate);

            return { success: true, result: { ...result, docs: finalDocs } };
        }
        catch (error) {
            return catchError<T_AggregatePaginateResult<T>>(error);
        }
    }

    /**
     * Counts documents matching the filter criteria.
     *
     * @param filter - The filter criteria to count documents.
     * @returns A promise that resolves to a standardized response with the document count.
     */
    async count(filter: T_FilterQuery<T> = {}): Promise<I_Return<number>> {
        try {
            const normalizedFilter = normalizeMongoFilter(filter);
            const result = await this.model.countDocuments(normalizedFilter);

            return { success: true, result };
        }
        catch (error) {
            return catchError<number>(error);
        }
    }

    /**
     * Creates a single document.
     *
     * @param doc - The document to create.
     * @returns A promise that resolves to a standardized response with the created document.
     */
    async createOne(doc: T | Partial<T>): Promise<I_Return<T>> {
        try {
            const result = await this.model.create(doc).then(data => data instanceof C_Document ? data.toObject() : data);

            return { success: true, result };
        }
        catch (error) {
            return catchError<T>(error);
        }
    }

    /**
     * Creates multiple documents with bulk insertion.
     *
     * @param docs - An array of documents to create.
     * @param options - Options for the bulk insertion operation.
     * @returns A promise that resolves to a standardized response with the created documents.
     */
    async createMany(
        docs: (T | Partial<T>)[],
        options: T_InsertManyOptions = {},
    ): Promise<I_Return<T[]>> {
        try {
            const createdDocuments = await this.model.insertMany(docs, options).then(data => data.map(item => item instanceof C_Document ? item.toObject() : item)) as T[];

            return { success: true, result: createdDocuments };
        }
        catch (error) {
            return catchError<T[]>(error);
        }
    }

    /**
     * Updates a single document and returns the updated version.
     *
     * @param filter - The filter criteria to find the document to update.
     * @param update - The update data to apply.
     * @param options - Options for the update operation.
     * @returns A promise that resolves to a standardized response with the updated document.
     */
    async updateOne(
        filter: T_FilterQuery<T> = {},
        update: T_UpdateQuery<T> = {},
        options: I_UpdateOptionsExtended = {},
    ): Promise<I_Return<T>> {
        try {
            const normalizedFilter = normalizeMongoFilter(filter);
            const result = await this.model
                .findOneAndUpdate(normalizedFilter, update, {
                    new: true,
                    ...options,
                })
                .exec()
                .then(data => data instanceof C_Document ? data.toObject() : data);

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
            return catchError<T>(error);
        }
    }

    /**
     * Updates multiple documents matching the filter criteria.
     *
     * @param filter - The filter criteria to find documents to update.
     * @param update - The update data to apply.
     * @param options - Options for the update operation.
     * @returns A promise that resolves to a standardized response with the update result.
     */
    async updateMany(
        filter: T_FilterQuery<T> = {},
        update: T_UpdateQuery<T> = {},
        options: I_UpdateOptionsExtended = {},
    ): Promise<I_Return<T_UpdateResult>> {
        try {
            const normalizedFilter = normalizeMongoFilter(filter);
            const result = await this.model
                .updateMany(normalizedFilter, update, options)
                .exec();

            return { success: true, result };
        }
        catch (error) {
            return catchError<T_UpdateResult>(error);
        }
    }

    /**
     * Deletes a single document and returns the deleted version.
     *
     * @param filter - The filter criteria to find the document to delete.
     * @param options - Options for the delete operation.
     * @returns A promise that resolves to a standardized response with the deleted document.
     */
    async deleteOne(
        filter: T_FilterQuery<T> = {},
        options: I_DeleteOptionsExtended = {},
    ): Promise<I_Return<T>> {
        try {
            const normalizedFilter = normalizeMongoFilter(filter);
            const result = await this.model
                .findOneAndDelete(normalizedFilter, options)
                .exec()
                .then(data => data instanceof C_Document ? data.toObject() : data);

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
            return catchError<T>(error);
        }
    }

    /**
     * Deletes multiple documents matching the filter criteria.
     *
     * @param filter - The filter criteria to find documents to delete.
     * @param options - Options for the delete operation.
     * @returns A promise that resolves to a standardized response with the delete result.
     */
    async deleteMany(
        filter: T_FilterQuery<T> = {},
        options: I_DeleteOptionsExtended = {},
    ): Promise<I_Return<T_DeleteResult>> {
        try {
            const normalizedFilter = normalizeMongoFilter(filter);
            const result = await this.model.deleteMany(normalizedFilter, options).exec();

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
            return catchError<T_DeleteResult>(error);
        }
    }

    /**
     * Creates a unique short ID based on a given ID.
     * This method generates multiple short IDs with increasing lengths and finds the first available one.
     *
     * @param id - The base ID to generate short IDs from.
     * @param length - The initial length for short ID generation (default: 4).
     * @returns A promise that resolves to a standardized response with the unique short ID.
     */
    async createShortId(id: string, length = 4): Promise<I_Return<string>> {
        try {
            const maxRetries = 10;
            const shortIds = Array.from({ length: maxRetries }, (_, index) =>
                generateShortId(id, index + length));

            const existenceChecks = await Promise.all(
                shortIds.map(shortId => this.model.exists({ shortId })),
            );

            const availableIndex = existenceChecks.findIndex(exists => !exists);

            if (availableIndex !== -1) {
                const availableShortId = shortIds[availableIndex];

                if (availableShortId) {
                    return { success: true, result: availableShortId };
                }
            }

            return {
                success: false,
                message: 'Failed to create a unique shortId',
                code: RESPONSE_STATUS.INTERNAL_SERVER_ERROR.CODE,
            };
        }
        catch (error) {
            return catchError<string>(error);
        }
    }

    /**
     * Creates a query for slug existence checking.
     * This method generates a query that checks for slug existence in both current and historical slug fields.
     *
     * @param options - Configuration for slug query generation including slug, field, and filter.
     * @param options.slug - The slug string to check for existence.
     * @param options.field - The field name for object-based slug checking.
     * @param options.isObject - Whether the slug is stored as an object with nested fields.
     * @param options.haveHistory - Whether to check historical slug fields for existence.
     * @param options.filter - Additional filter conditions to apply to the query.
     * @returns A MongoDB query object for checking slug existence.
     */
    createSlugQuery({ slug, field, isObject, haveHistory = false, filter }: I_Input_GenerateSlug<T>) {
        const baseFilter = { ...(filter ?? {}) };

        return isObject
            ? {
                    ...baseFilter,
                    $or: [
                        { [`slug.${field}`]: slug },
                        ...(haveHistory ? [{ slugHistory: { $elemMatch: { [`slug.${field}`]: slug } } }] : []),
                    ],
                }
            : {
                    ...baseFilter,
                    $or: [
                        { slug },
                        ...(haveHistory ? [{ slugHistory: slug }] : []),
                    ],
                };
    }

    /**
     * Creates a unique slug based on a given string.
     * This method generates multiple slug variations and finds the first available one.
     *
     * @param options - Configuration for slug generation including slug, field, and filter.
     * @param options.slug - The base slug string to make unique.
     * @param options.field - The field name for object-based slug checking.
     * @param options.isObject - Whether the slug is stored as an object with nested fields.
     * @param options.haveHistory - Whether to check historical slug fields for uniqueness.
     * @param options.filter - Additional filter conditions to apply when checking slug existence.
     * @returns A promise that resolves to a unique slug string.
     */
    async createUniqueSlug({ slug, field, isObject, haveHistory, filter }: I_Input_GenerateSlug<T>): Promise<string> {
        if (!slug || typeof slug !== 'string') {
            throw new Error('Invalid slug provided: must be a non-empty string');
        }

        const baseSlug = generateSlug(slug);

        const baseExists = await this.model.exists(
            this.createSlugQuery({ slug: baseSlug, field, isObject, haveHistory, filter }),
        );

        if (!baseExists) {
            return baseSlug;
        }

        for (let index = 1; index <= MONGO_SLUG_MAX_ATTEMPTS; index++) {
            const slugVariation = `${baseSlug}-${index}`;

            const exists = await this.model.exists(
                this.createSlugQuery({ slug: slugVariation, field, isObject, haveHistory, filter }),
            );

            if (!exists) {
                return slugVariation;
            }
        }

        const timestamp = Date.now();
        const randomSuffix = Math.random().toString(36).substring(2, 8);

        return `${baseSlug}-${timestamp}-${randomSuffix}`;
    }

    /**
     * Creates a slug for a document field.
     * This method handles both simple string fields and object fields with nested slug generation.
     *
     * @param options - Configuration for slug creation including field, source document, and filter.
     * @param options.field - The field name to create a slug for.
     * @param options.from - The source document containing the field value.
     * @param options.haveHistory - Whether to check historical slug fields for uniqueness.
     * @param options.filter - Additional filter conditions to apply when checking slug existence.
     * @returns A promise that resolves to a standardized response with the created slug(s).
     */
    async createSlug<R = string>({ field, from, filter, haveHistory }: I_Input_CreateSlug<T>): Promise<I_Return<R>> {
        try {
            const fieldValue = from[field as keyof T];
            const isObjectValue = isObject(fieldValue);

            if (isObjectValue) {
                const uniqueSlug = Object.fromEntries(
                    await Promise.all(
                        Object.entries(fieldValue).map(async ([key, value]) => {
                            const uniqueSlugForKey = await this.createUniqueSlug({
                                slug: value as string,
                                field: key,
                                isObject: true,
                                haveHistory,
                                filter,
                            });
                            return [key, uniqueSlugForKey];
                        }),
                    ),
                );

                return { success: true, result: uniqueSlug as R };
            }

            const uniqueSlug = await this.createUniqueSlug({
                slug: fieldValue as string,
                field,
                isObject: false,
                haveHistory,
                filter,
            });

            return { success: true, result: uniqueSlug as R };
        }
        catch (error) {
            return catchError<R>(error);
        }
    }

    /**
     * Checks if a slug already exists in the collection.
     * This method verifies slug existence in both current and historical slug fields.
     *
     * @param options - Configuration for slug checking including slug, field, source document, and filter.
     * @param options.slug - The slug string to check for existence.
     * @param options.field - The field name for object-based slug checking.
     * @param options.from - The source document containing the field value.
     * @param options.haveHistory - Whether to check historical slug fields for existence.
     * @param options.filter - Additional filter conditions to apply to the query.
     * @returns A promise that resolves to a standardized response indicating whether the slug exists.
     */
    async checkSlug({ slug, field, from, filter, haveHistory }: I_Input_CheckSlug<T>): Promise<I_Return<boolean>> {
        try {
            const fieldValue = from[field as keyof T];
            const isObjectValue = isObject(fieldValue);

            if (isObjectValue) {
                const values = Object.values(fieldValue);
                const nestedSlugs = values.map(value => generateSlug(value as string));

                const existenceChecks = await Promise.all(
                    nestedSlugs.map(nestedSlug =>
                        this.model.exists(this.createSlugQuery({
                            slug: nestedSlug,
                            field,
                            isObject: true,
                            haveHistory,
                            filter,
                        })),
                    ),
                );

                if (existenceChecks.some(exists => exists)) {
                    return { success: true, result: true };
                }

                return { success: true, result: false };
            }

            const baseSlug = generateSlug(slug);
            const exists = await this.model.exists(this.createSlugQuery({
                slug: baseSlug,
                field,
                isObject: false,
                filter,
            }));

            return { success: true, result: exists !== null };
        }
        catch (error) {
            return catchError<boolean>(error);
        }
    }

    /**
     * Performs aggregation operations on the collection.
     *
     * @param pipeline - The aggregation pipeline stages to execute.
     * @returns A promise that resolves to a standardized response with the aggregation results.
     */
    async aggregate(pipeline: T_PipelineStage[]): Promise<I_Return<T[]>> {
        try {
            const result = await this.model.aggregate<T>(pipeline);

            return { success: true, result };
        }
        catch (error) {
            return catchError<T[]>(error);
        }
    }

    /**
     * Retrieves distinct values for the specified key from the collection.
     *
     * @param key - The field for which to return distinct values.
     * @param filter - The filter query to apply (optional).
     * @param options - Additional options for the distinct operation (optional).
     * @returns A promise that resolves to a standardized response with the array of distinct values.
     */
    async distinct(
        key: string,
        filter: T_FilterQuery<T> = {},
        options: T_QueryOptions<T> = {},
    ): Promise<I_Return<unknown[]>> {
        try {
            const result = await this.model.distinct(key, filter, options);

            return { success: true, result };
        }
        catch (error) {
            return catchError<unknown[]>(error);
        }
    }
}
