import type { JSX, ReactElement, ReactNode } from 'react';

export type T_Children = ReactNode | ReactNode[] | ReactElement | JSX.Element | null;

export interface I_LoadingContext {
    isLoading: boolean;
    isGlobalLoading: boolean;
    showLoading: (global?: boolean) => void;
    hideLoading: () => void;
}
