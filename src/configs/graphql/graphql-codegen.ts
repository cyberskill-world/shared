import type { CodegenConfig } from '@graphql-codegen/cli';

import type { I_GraphqlCodegenConfig } from '../../typescript/index.js';

export function createGraphqlCodegenConfig({ uri, from, to }: I_GraphqlCodegenConfig): CodegenConfig {
    return {
        schema: uri,
        documents: [from],
        generates: {
            [to]: {
                plugins: ['typescript', 'typescript-operations', 'typescript-react-apollo'],
            },
        },
        hooks: { afterAllFileWrite: ['npx --yes cyberskill lint:fix'] },
    };
}
