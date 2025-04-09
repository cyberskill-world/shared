import type { CodegenConfig } from '@graphql-codegen/cli';

import { COMMAND } from '#nodejs/path/index.js';

import type { I_GraphqlCodegenConfig } from './graphql-codegen.type.js';

export function createGraphqlCodegenConfig({
    uri,
    from,
    to,
    withComponent,
    withHOC,
    withHooks,
    withMutationFn,
    withRefetchFn,
    federation,
}: I_GraphqlCodegenConfig): CodegenConfig {
    const configOptions = {
        ...(withComponent && { withComponent }),
        ...(withHOC && { withHOC }),
        ...(withHooks && { withHooks }),
        ...(withMutationFn && { withMutationFn }),
        ...(withRefetchFn && { withRefetchFn }),
        ...(federation && { config: { federation: true } }),
    };

    return {
        schema: uri,
        documents: [from],
        generates: {
            [to]: {
                plugins: ['typescript', 'typescript-operations', 'typescript-react-apollo'],
                ...(Object.keys(configOptions).length > 0 && { config: configOptions }),
            },
        },
        hooks: {
            afterAllFileWrite: [COMMAND.ESLINT_FIX],
        },
    };
}
