import * as react_jsx_runtime from 'react/jsx-runtime';
import * as react from 'react';
import { I_LoadingProps } from '../typescript/loading.js';
import { I_LoadingContext, T_Children } from '../typescript/react.js';

declare const LoadingContext: react.Context<I_LoadingContext | undefined>;
declare function useLoading(): I_LoadingContext;
declare function Loading({ full, block, className, message, ...rest }: I_LoadingProps): react_jsx_runtime.JSX.Element;
declare function LoadingProvider({ children }: {
    children: T_Children;
}): react_jsx_runtime.JSX.Element;

export { Loading, LoadingContext, LoadingProvider, useLoading };
