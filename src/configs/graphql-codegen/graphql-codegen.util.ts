import type { CodegenConfig } from '@graphql-codegen/cli';

import { defineConfig } from '@eddeee888/gcg-typescript-resolver-files';

import type { I_GraphqlCodegenConfig } from './graphql-codegen.type.js';

export function createGraphqlCodegenConfig({
    uri,
    from,
    to,
    target = 'client',
}: I_GraphqlCodegenConfig): CodegenConfig {
    const isClient = target === 'client';
    const isServer = target === 'server';

    return {
        schema: uri,
        ignoreNoDocuments: true,
        overwrite: true,
        ...(isClient && { documents: [from] }),
        generates: {
            ...(isClient && {
                [to]: {
                    preset: 'client',
                    presetConfig: {
                        fragmentMasking: false,
                        persistedDocuments: true,
                    },
                    config: {
                        useTypeImports: true,
                    },
                },
            }),
            ...(isServer && {
                [to]: defineConfig(),
            }),
        },
    };
}
