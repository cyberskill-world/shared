import type mongooseRaw from 'mongoose';

import migrate from 'migrate-mongo';
import aggregatePaginate from 'mongoose-aggregate-paginate-v2';
import mongoosePaginate from 'mongoose-paginate-v2';
import { randomUUID } from 'node:crypto';

import { deepClone, getNestedValue, regexSearchMapper, setNestedValue } from '#util/index.js';
import { validate } from '#util/validate/index.js';

import type { MongoController } from './mongo.controller.js';
import type { C_Document, I_CreateModelOptions, I_CreateSchemaOptions, I_DynamicVirtualConfig, I_DynamicVirtualOptions, I_ExtendedModel, I_GenericDocument, I_MongooseModelMiddleware, T_FilterQuery, T_Input_Populate, T_MongoosePlugin, T_MongooseShema, T_VirtualOptions, T_WithId } from './mongo.type.js';

import { appendFileSync, pathExistsSync, readFileSync, writeFileSync } from '../fs/index.js';
import { MIGRATE_MONGO_CONFIG, PATH } from '../path/index.js';

/**
 * Converts enum values to proper model names.
 * Handles common naming conventions like converting 'USER' to 'User'.
 *
 * @param enumValue - The enum value to convert
 * @returns The converted model name
 */
export function convertEnumToModelName(enumValue: string): string {
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
            id: randomUUID(),
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
                id: { type: String, default: () => randomUUID(), unique: true },
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

        const model = currentMongooseInstance.model<T>(name, createdSchema) as I_ExtendedModel<T>;

        if (virtuals.length > 0) {
            (model as any)._virtualConfigs = virtuals;
        }

        return model;
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
            return async (value: string): Promise<boolean> => {
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

        let newFilter = deepClone(filter);

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
 * Recursively applies nested populate options to populated documents.
 * This function handles cases where a populated field needs further population.
 *
 * @template T - The document type
 * @param mongoose - The Mongoose instance
 * @param documents - The documents to apply nested populations to
 * @param populateOptions - The populate options to apply
 * @param virtualConfigs - Optional virtual configurations for model inference
 * @param currentModel - The current model context (which model's schema to search for virtuals)
 * @returns Promise with documents that have nested populations applied
 */
export async function applyNestedPopulate<T extends object>(
    mongoose: typeof mongooseRaw,
    documents: T[],
    populateOptions: T_Input_Populate,
    virtualConfigs?: I_DynamicVirtualConfig<unknown, string>[],
    currentModel?: any,
): Promise<T[]> {
    if (!documents.length || !populateOptions) {
        return documents;
    }

    const populateArray = Array.isArray(populateOptions) ? populateOptions : [populateOptions];

    for (const populateOption of populateArray) {
        if (typeof populateOption === 'string') {
            await applyStringPopulate(mongoose, documents, populateOption, virtualConfigs, currentModel);
        }
        else if (populateOption && typeof populateOption === 'object') {
            const popObj = populateOption as { path?: string; populate?: T_Input_Populate; [key: string]: unknown };

            await applyObjectPopulate(mongoose, documents, popObj, virtualConfigs, currentModel);
        }
    }

    return documents;
}

/**
 * Applies string-based populate options (e.g., "field.subfield") to documents.
 *
 * @template T - The document type
 * @param mongoose - The Mongoose instance
 * @param documents - The documents to populate
 * @param populatePath - The populate path string
 * @param virtualConfigs - Optional virtual configurations for model inference
 * @param currentModel - The current model context (which model's schema to search for virtuals)
 */
async function applyStringPopulate<T extends object>(
    mongoose: typeof mongooseRaw,
    documents: T[],
    populatePath: string,
    virtualConfigs?: I_DynamicVirtualConfig<unknown, string>[],
    currentModel?: any,
): Promise<void> {
    const pathParts = populatePath.split('.');

    if (pathParts.length < 2) {
        for (const doc of documents) {
            const docObj = doc as { [key: string]: unknown };

            await populateNestedFieldOnParent(mongoose, docObj, populatePath, virtualConfigs, undefined, currentModel);
        }

        return;
    }

    const mainField = pathParts[0];

    if (!mainField || mainField.trim() === '') {
        return;
    }

    const nestedPath = pathParts.slice(1).join('.');

    for (const doc of documents) {
        const docObj = doc as { [key: string]: unknown };
        const mainValue = docObj[mainField];

        if (mainValue && typeof mainValue === 'object') {
            let nextModelForChildren = currentModel;
            const originalModelForChildren = nextModelForChildren;

            if (currentModel && currentModel.schema && currentModel.schema.virtuals) {
                const virtual = currentModel.schema.virtuals[mainField];

                if (virtual && virtual.options && virtual.options.ref) {
                    let refResult: string | undefined;

                    if (typeof virtual.options.ref === 'function') {
                        refResult = virtual.options.ref(docObj);
                    }
                    else if (typeof virtual.options.ref === 'string') {
                        refResult = virtual.options.ref;
                    }
                    if (refResult) {
                        const modelName = convertEnumToModelName(refResult);

                        if (mongoose.models[modelName]) {
                            nextModelForChildren = mongoose.models[modelName];
                        }
                    }
                }
            }

            if (!nextModelForChildren) {
                const schemaStatics = (currentModel?.schema?.statics ?? {}) as Record<string, unknown>;
                const dynamicVirtuals = ((currentModel as any)?._virtualConfigs as Array<{ name: string; options?: { ref?: unknown } }>)
                    || (schemaStatics['_dynamicVirtuals'] as Array<{ name: string; options?: { ref?: unknown } }> | undefined)
                    || [];
                const dyn = (dynamicVirtuals as Array<{ name: string; options?: { ref?: unknown } }>).find(v => v.name === mainField);

                if (dyn && dyn.options && dyn.options.ref) {
                    let refResult: string | undefined;

                    if (typeof dyn.options.ref === 'function') {
                        refResult = (dyn.options.ref as (d: unknown) => string | undefined)(docObj);
                    }
                    else if (typeof dyn.options.ref === 'string') {
                        refResult = dyn.options.ref as string;
                    }
                    if (refResult) {
                        const modelName = convertEnumToModelName(refResult);

                        if (mongoose.models[modelName]) {
                            nextModelForChildren = mongoose.models[modelName];
                        }
                    }
                }
            }

            if (nextModelForChildren === originalModelForChildren) {
                const schemaStatics = (currentModel?.schema?.statics ?? {}) as Record<string, unknown>;
                const dynamicVirtuals = ((currentModel as any)?._virtualConfigs as Array<{ name: string; options?: { ref?: unknown } }>)
                    || (schemaStatics['_dynamicVirtuals'] as Array<{ name: string; options?: { ref?: unknown } }> | undefined)
                    || [];
                const dyn = (dynamicVirtuals as Array<{ name: string; options?: { ref?: unknown } }>).find(v => v.name === mainField);

                if (dyn && dyn.options && dyn.options.ref) {
                    let refResult: string | undefined;

                    if (typeof dyn.options.ref === 'function') {
                        refResult = (dyn.options.ref as (d: unknown) => string | undefined)(docObj);
                    }
                    else if (typeof dyn.options.ref === 'string') {
                        refResult = dyn.options.ref as string;
                    }
                    if (refResult) {
                        const modelName = convertEnumToModelName(refResult);

                        if (mongoose.models[modelName]) {
                            nextModelForChildren = mongoose.models[modelName];
                        }
                    }
                }
            }

            if (Array.isArray(mainValue)) {
                for (const item of mainValue) {
                    if (item && typeof item === 'object') {
                        await populateNestedFieldOnParent(mongoose, item as { [key: string]: unknown }, nestedPath, virtualConfigs, mainField, nextModelForChildren);
                    }
                }
            }
            else if (mainValue && typeof mainValue === 'object') {
                await populateNestedFieldOnParent(mongoose, mainValue as { [key: string]: unknown }, nestedPath, virtualConfigs, mainField, nextModelForChildren);
            }
        }
    }
}

/**
 * Applies object-based populate options with nested populate to documents.
 *
 * @template T - The document type
 * @param mongoose - The Mongoose instance
 * @param documents - The documents to populate
 * @param populateOption - The populate option object
 * @param populateOption.path - The path to populate
 * @param populateOption.populate - The nested populate options
 * @param virtualConfigs - Optional virtual configurations for model inference
 * @param currentModel - The current model context (which model's schema to search for virtuals)
 */
async function applyObjectPopulate<T extends object>(
    mongoose: typeof mongooseRaw,
    documents: T[],
    populateOption: { path?: string; populate?: T_Input_Populate; [key: string]: unknown },
    virtualConfigs?: I_DynamicVirtualConfig<unknown, string>[],
    currentModel?: any,
): Promise<void> {
    const { path, populate: nestedPopulate } = populateOption;

    if (!path) {
        return;
    }

    if (!nestedPopulate) {
        await applyStringPopulate(mongoose, documents, path, virtualConfigs, currentModel);

        return;
    }

    const pathString = path;

    for (const doc of documents) {
        const docObj = doc as { [key: string]: unknown };
        const fieldValue = docObj[pathString];

        let nextModelForChildren = currentModel;

        if (currentModel && currentModel.schema && currentModel.schema.virtuals) {
            const virtual = currentModel.schema.virtuals[pathString];

            if (virtual && virtual.options && virtual.options.ref) {
                let refResult: string | undefined;

                if (typeof virtual.options.ref === 'function') {
                    refResult = virtual.options.ref(docObj);
                }
                else if (typeof virtual.options.ref === 'string') {
                    refResult = virtual.options.ref;
                }
                if (refResult) {
                    const modelName = convertEnumToModelName(refResult);
                    if (mongoose.models[modelName]) {
                        nextModelForChildren = mongoose.models[modelName];
                    }
                }
            }
        }
        if (!nextModelForChildren && typeof fieldValue === 'object' && fieldValue && 'entityType' in (fieldValue as object)) {
            const maybeModel = convertEnumToModelName(String((fieldValue as { [k: string]: unknown })['entityType']));

            if (mongoose.models[maybeModel]) {
                nextModelForChildren = mongoose.models[maybeModel];
            }
        }

        if (fieldValue && typeof fieldValue === 'object') {
            if (Array.isArray(fieldValue)) {
                for (const item of fieldValue) {
                    if (item && typeof item === 'object') {
                        await applyNestedPopulate(mongoose, [item as { [key: string]: unknown }], nestedPopulate, virtualConfigs, nextModelForChildren);
                    }
                }
            }
            else if (fieldValue && typeof fieldValue === 'object') {
                await applyNestedPopulate(mongoose, [fieldValue as { [key: string]: unknown }], nestedPopulate, virtualConfigs, nextModelForChildren);
            }
        }
    }
}

/**
 * Resolves the target model for a given populate path by following the path step by step.
 * This function traverses the schema hierarchy to find the correct model for population.
 *
 * @param mongoose - The Mongoose instance
 * @param startModel - The starting model (usually the model containing the document)
 * @param path - The populate path to resolve (e.g., "entity.partner1.gallery")
 * @param document - The document being populated (for dynamic virtual resolution)
 * @returns The resolved model name or undefined if not found
 */
function resolveModelFromPath(
    mongoose: typeof mongooseRaw,
    startModel: any,
    path: string,
    document: { [key: string]: unknown },
): string | undefined {
    if (!path || !startModel || !startModel.schema) {
        return undefined;
    }

    const pathParts = path.split('.');
    let currentSchema = startModel.schema;

    for (let i = 0; i < pathParts.length; i++) {
        const pathPart = pathParts[i];

        if (currentSchema && currentSchema.virtuals && pathPart) {
            const virtual = currentSchema.virtuals[pathPart];
            if (virtual && virtual.options && virtual.options.ref) {
                let refResult: string | undefined;

                if (typeof virtual.options.ref === 'function') {
                    refResult = virtual.options.ref(document);
                }
                else if (typeof virtual.options.ref === 'string') {
                    refResult = virtual.options.ref;
                }
                if (refResult && typeof refResult === 'string') {
                    if (i === pathParts.length - 1) {
                        return refResult;
                    }

                    const nextModel = mongoose.models[refResult];

                    if (nextModel && nextModel.schema) {
                        currentSchema = nextModel.schema;
                        continue;
                    }
                }
            }
        }

        if (currentSchema && currentSchema.paths && pathPart) {
            const pathSchema = currentSchema.paths[pathPart];

            if (pathSchema && pathSchema.schema) {
                currentSchema = pathSchema.schema;
                continue;
            }
        }

        return undefined;
    }

    return undefined;
}

/**
 * Attempts to find a model whose schema contains the given field
 * either as a direct path or a virtual. Searches only at the root level
 * of each model schema.
 */
function findModelBySchemaField(
    mongoose: typeof mongooseRaw,
    fieldName: string,
): any | undefined {
    if (!fieldName) {
        return undefined;
    }
    for (const modelName of Object.keys(mongoose.models)) {
        const Model = mongoose.models[modelName];
        const schema = Model?.schema as any;

        if (!schema) {
            continue;
        }
        if ((schema.paths && schema.paths[fieldName]) || (schema.virtuals && schema.virtuals[fieldName])) {
            return Model;
        }
    }

    return undefined;
}

/**
 * Finds a start model whose root schema contains the first segment of the path
 * as either a direct path or a virtual. Useful to jump into the correct model
 * when the current model context is misaligned (e.g., 'partner1.*' should start from User).
 */
function findStartModelByFirstSegment(
    mongoose: typeof mongooseRaw,
    fullPath: string,
): any | undefined {
    const first = (fullPath || '').split('.')[0] || '';

    if (!first) {
        return undefined;
    }
    for (const modelName of Object.keys(mongoose.models)) {
        const Model = mongoose.models[modelName];
        const schema = Model?.schema as any;

        if (!schema) {
            continue;
        }
        if ((schema.paths && schema.paths[first]) || (schema.virtuals && schema.virtuals[first])) {
            return Model;
        }
    }

    return undefined;
}

/**
 * Populates a nested field on the parent object by finding the referenced document and applying populate options.
 *
 * @param mongoose - The Mongoose instance
 * @param document - The document containing the field to populate
 * @param nestedPath - The nested populate path
 * @param virtualConfigs - Optional virtual configurations for model inference
 * @param pathPrefix - The parent path prefix (if nested within another populated field)
 * @param currentModel - The current model context (which model's schema to search for virtuals)
 */
async function populateNestedFieldOnParent(
    mongoose: typeof mongooseRaw,
    document: { [key: string]: unknown },
    nestedPath: string,
    virtualConfigs?: I_DynamicVirtualConfig<unknown, string>[],
    pathPrefix?: string,
    currentModel?: any,
): Promise<void> {
    let modelName = document['__t'];

    if (!modelName) {
        if (currentModel) {
            const fullPath = pathPrefix ? `${pathPrefix}.${nestedPath}` : nestedPath;

            const firstSegment = (fullPath || '').split('.')[0] || '';
            let startModel = currentModel;
            const hasFirstOnCurrent = Boolean(
                (startModel?.schema?.paths && startModel.schema.paths[firstSegment])
                || (startModel?.schema?.virtuals && startModel.schema.virtuals[firstSegment]),
            );

            if (!hasFirstOnCurrent) {
                const betterStart = findStartModelByFirstSegment(mongoose, fullPath);

                if (betterStart) {
                    startModel = betterStart;
                }
            }

            const resolvedFromPath = resolveModelFromPath(mongoose, startModel, fullPath, document);

            if (resolvedFromPath) {
                modelName = resolvedFromPath;
            }
            else {
                const lastSegment = (fullPath.includes('.') ? fullPath.split('.').pop() : fullPath) || '';

                if (lastSegment) {
                    const candidateModel = findModelBySchemaField(mongoose, lastSegment);

                    if (candidateModel) {
                        const rerun = resolveModelFromPath(mongoose, candidateModel, fullPath, document);

                        if (rerun) {
                            modelName = rerun;
                        }
                    }
                }
            }
        }

        if (virtualConfigs && virtualConfigs.length > 0) {
            const fieldName = nestedPath.split('.').pop() || '';
            const matchingVirtual = virtualConfigs.find(v => v.name === fieldName);

            if (matchingVirtual && matchingVirtual.options.ref) {
                let refResult: string | undefined;

                if (typeof matchingVirtual.options.ref === 'function') {
                    refResult = matchingVirtual.options.ref(document);
                }
                else if (typeof matchingVirtual.options.ref === 'string') {
                    refResult = matchingVirtual.options.ref;
                }

                if (refResult && typeof refResult === 'string') {
                    modelName = refResult;
                }
            }
        }

        if (!modelName) {
            for (const [key, value] of Object.entries(document as Record<string, unknown>)) {
                if (key === 'entityType' && typeof value === 'string') {
                    modelName = value;
                    break;
                }
            }

            if (modelName && mongoose.models[modelName as string]) {
                const Model = mongoose.models[modelName as string];

                if (Model && Model.schema) {
                    const schema = Model.schema;
                    const fieldName = nestedPath.split('.').pop() || '';

                    const searchVirtualsInSchema = (schemaToSearch: any, schemaPath = 'root'): string | undefined => {
                        if (!schemaToSearch || !schemaToSearch.virtuals) {
                            return undefined;
                        }

                        const virtuals = schemaToSearch.virtuals;

                        for (const virtualName of Object.keys(virtuals)) {
                            if (virtualName === fieldName) {
                                const virtual = virtuals[virtualName];
                                if (virtual && virtual.options && virtual.options.ref) {
                                    let refResult: string | undefined;

                                    if (typeof virtual.options.ref === 'function') {
                                        refResult = virtual.options.ref(document);
                                    }
                                    else if (typeof virtual.options.ref === 'string') {
                                        refResult = virtual.options.ref;
                                    }
                                    if (refResult && typeof refResult === 'string') {
                                        return refResult;
                                    }
                                }
                            }
                        }

                        if (schemaToSearch.paths) {
                            for (const pathName of Object.keys(schemaToSearch.paths)) {
                                const pathSchema = schemaToSearch.paths[pathName];

                                if (pathSchema && pathSchema.schema) {
                                    const nestedResult = searchVirtualsInSchema(pathSchema.schema, `${schemaPath}.${pathName}`);

                                    if (nestedResult) {
                                        return nestedResult;
                                    }
                                }
                            }
                        }

                        return undefined;
                    };

                    const foundModelName = searchVirtualsInSchema(schema);
                    if (foundModelName) {
                        modelName = foundModelName;
                    }
                }
            }
        }

        if (!modelName) {
            const fieldName = nestedPath.split('.').pop() || '';

            if (currentModel && currentModel.schema) {
                const schema = currentModel.schema;

                const searchVirtualsInSchema = (schemaToSearch: any, schemaPath = 'root'): string | undefined => {
                    if (!schemaToSearch || !schemaToSearch.virtuals) {
                        return undefined;
                    }

                    const virtuals = schemaToSearch.virtuals;

                    for (const virtualName of Object.keys(virtuals)) {
                        if (virtualName === fieldName) {
                            const virtual = virtuals[virtualName];
                            if (virtual && virtual.options && virtual.options.ref) {
                                let refResult: string | undefined;

                                if (typeof virtual.options.ref === 'function') {
                                    refResult = virtual.options.ref(document);
                                }
                                else if (typeof virtual.options.ref === 'string') {
                                    refResult = virtual.options.ref;
                                }

                                if (refResult && typeof refResult === 'string') {
                                    return refResult;
                                }
                            }
                        }
                    }

                    if (schemaToSearch.paths) {
                        for (const pathName of Object.keys(schemaToSearch.paths)) {
                            const pathSchema = schemaToSearch.paths[pathName];

                            if (pathSchema && pathSchema.schema) {
                                const nestedResult = searchVirtualsInSchema(pathSchema.schema, `${schemaPath}.${pathName}`);

                                if (nestedResult) {
                                    return nestedResult;
                                }
                            }
                        }
                    }

                    return undefined;
                };

                const foundModelName = searchVirtualsInSchema(schema);
                if (foundModelName) {
                    modelName = foundModelName;
                }
            }

            if (!modelName) {
                if (currentModel) {
                    const resolvedModel = resolveModelFromPath(mongoose, currentModel, nestedPath, document);

                    if (resolvedModel) {
                        modelName = resolvedModel;
                    }
                }
            }

            if (!modelName && virtualConfigs && virtualConfigs.length > 0) {
                const matchingVirtual = virtualConfigs.find(v => v.name === fieldName);

                if (matchingVirtual && matchingVirtual.options.ref) {
                    let refResult: string | undefined;

                    if (typeof matchingVirtual.options.ref === 'function') {
                        refResult = matchingVirtual.options.ref(document);
                    }
                    else if (typeof matchingVirtual.options.ref === 'string') {
                        refResult = matchingVirtual.options.ref;
                    }
                    if (refResult && typeof refResult === 'string') {
                        modelName = refResult;
                    }
                }
            }
        }

        if (!modelName) {
            const fieldName = nestedPath.split('.').pop() || '';
            const candidate = fieldName ? fieldName.charAt(0).toUpperCase() + fieldName.slice(1) : '';

            if (candidate && mongoose.models[candidate]) {
                modelName = candidate;
            }
        }
    }

    const Model = mongoose.models[modelName as string];

    if (!Model) {
        return;
    }

    const fieldIdKey = `${nestedPath}Id`;
    const fieldIdsKey = `${nestedPath}Ids`;

    const docIds = document[fieldIdKey] || document[fieldIdsKey] || document[nestedPath];

    if (!docIds) {
        return;
    }

    const idsArray = Array.isArray(docIds) ? docIds : [docIds];

    const populatedDocs = await Model.find({ id: { $in: idsArray } }).lean();

    if (populatedDocs.length > 0) {
        if (Array.isArray(docIds)) {
            document[nestedPath] = populatedDocs;
        }
        else {
            document[nestedPath] = populatedDocs[0];
        }
    }
}
