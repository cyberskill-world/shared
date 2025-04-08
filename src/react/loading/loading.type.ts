export interface I_LoadingContext {
    isLoading: boolean;
    isGlobalLoading: boolean;
    showLoading: (global?: boolean) => void;
    hideLoading: () => void;
}

export interface I_LoadingProps {
    full?: boolean;
    block?: boolean;
    className?: string;
    message?: string;
}
