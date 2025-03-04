import type { CodegenConfig } from '@graphql-codegen/cli';

import type { I_GraphqlCodegenConfig } from '../../typescript/index.js';

export function createGraphqlCodegenConfig({ uri, from, to }: I_GraphqlCodegenConfig): CodegenConfig {
    return {
        schema: uri,
        documents: [from],
        generates: {
            [to]: {
                plugins: ['typescript', 'typescript-operations', 'typescript-react-apollo'],
                config: {
                    withComponent: true,
                    withHOC: true,
                    withHooks: true,
                    withMutationFn: true,
                    withRefetchFn: true,
                },
            },
        },
        hooks: { afterAllFileWrite: ['npx --yes cyberskill lint:fix'] },
    };
}
