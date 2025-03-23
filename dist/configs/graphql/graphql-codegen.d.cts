import { CodegenConfig } from '@graphql-codegen/cli';
import { I_GraphqlCodegenConfig } from '../../typescript/graphql-codegen.cjs';

declare function createGraphqlCodegenConfig({ uri, from, to, withComponent, withHOC, withHooks, withMutationFn, withRefetchFn, }: I_GraphqlCodegenConfig): CodegenConfig;

export { createGraphqlCodegenConfig };
