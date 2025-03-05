import type { CodegenConfig } from '@graphql-codegen/cli';

import type { I_GraphqlCodegenConfig } from '../../typescript/index.js';

export function createGraphqlCodegenConfig({
    uri,
    from,
    to,
    withComponent,
    withHOC,
    withHooks,
    withMutationFn,
    withRefetchFn,
}: I_GraphqlCodegenConfig): CodegenConfig {
    const configOptions = {
        ...(withComponent && { withComponent }),
        ...(withHOC && { withHOC }),
        ...(withHooks && { withHooks }),
        ...(withMutationFn && { withMutationFn }),
        ...(withRefetchFn && { withRefetchFn }),
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
            afterAllFileWrite: ['npx --yes cyberskill lint:fix'],
        },
    };
}
