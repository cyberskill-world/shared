import { CodegenConfig } from '@graphql-codegen/cli';
import { I_GraphqlCodegenConfig } from '../../typescript/react.js';
import '@apollo/client';
import 'react';

declare function createGraphqlCodegenConfig({ uri, from, to }: I_GraphqlCodegenConfig): CodegenConfig;

export { createGraphqlCodegenConfig };
