import * as react_jsx_runtime from 'react/jsx-runtime';
import { I_ApolloProviderProps } from '../../typescript/apollo.js';
import '@apollo/client';
import 'react';
import '../../typescript/react.js';

declare function ApolloProvider({ isNextJS, options, children, client: CustomClient, provider: CustomProvider, cache: CustomCache, }: I_ApolloProviderProps): react_jsx_runtime.JSX.Element;

export { ApolloProvider };
