import type { ApolloClientOptions } from '@apollo/client';
import type { JSX, ReactElement, ReactNode } from 'react';

export type T_Children = ReactNode | ReactNode[] | ReactElement | JSX.Element | null;

export type T_ApolloOptions = ApolloClientOptions<unknown> & { url: string };

export interface I_GraphqlCodegenConfig {
    uri: string;
    from: string;
    to: string;
}
