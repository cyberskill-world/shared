import { ReactNode, ReactElement, JSX } from 'react';

type T_Children = ReactNode | ReactNode[] | ReactElement | JSX.Element | null;
interface I_LoadingContext {
    isLoading: boolean;
    isGlobalLoading: boolean;
    showLoading: (global?: boolean) => void;
    hideLoading: () => void;
}

export type { I_LoadingContext, T_Children };
