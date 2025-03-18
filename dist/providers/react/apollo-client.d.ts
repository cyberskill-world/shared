import * as react_jsx_runtime from 'react/jsx-runtime';
import { I_ApolloOptionsNextJS, T_Children } from '../../typescript/react.js';
import '@apollo/client';
import '@apollo/experimental-nextjs-app-support';
import 'react';

declare function ApolloProvider({ isNextJS, options, children }: {
    isNextJS: boolean;
    options: I_ApolloOptionsNextJS;
    children: T_Children;
}): react_jsx_runtime.JSX.Element;

export { ApolloProvider };
