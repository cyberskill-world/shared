import * as react_jsx_runtime from 'react/jsx-runtime';
import { I_ApolloOptions, T_Children } from '../../typescript/react.js';
import '@apollo/client';
import 'react';

declare function ApolloProvider({ options, children }: {
    options: I_ApolloOptions;
    children: T_Children;
}): react_jsx_runtime.JSX.Element;

export { ApolloProvider };
