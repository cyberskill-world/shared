import { CodegenConfig } from '@graphql-codegen/cli';
import { I_GraphqlCodegenConfig } from '../../typescript/react.cjs';
import '@apollo/client';
import '@apollo/experimental-nextjs-app-support';
import 'react';

declare function createGraphqlCodegenConfig({ uri, from, to, withComponent, withHOC, withHooks, withMutationFn, withRefetchFn, }: I_GraphqlCodegenConfig): CodegenConfig;

export { createGraphqlCodegenConfig };
