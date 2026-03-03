import type mongooseRaw from 'mongoose';

import type { I_DynamicVirtualConfig, T_Input_Populate } from './mongo.type.js';

import { convertEnumToModelName } from './mongo.util.js';

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
            const popObj = populateOption as { path?: string; populate?: T_Input_Populate;[key: string]: unknown };

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
    populateOption: { path?: string; populate?: T_Input_Populate;[key: string]: unknown },
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
