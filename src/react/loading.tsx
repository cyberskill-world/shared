import cn from 'classnames';
import { createContext, use, useCallback, useMemo, useState } from 'react';

import type { I_LoadingProps } from '../typescript/loading.js';
import type { I_LoadingContext, T_Children } from '../typescript/react.js';

import styles from './loading.module.scss';

// #region -------------- LoadingContext --------------
export const LoadingContext = createContext<I_LoadingContext | undefined>(undefined);
// #endregion

// #region -------------- useLoading --------------
export function useLoading() {
    const context = use(LoadingContext);
    if (!context) {
        throw new Error('useLoading must be used within a LoadingProvider');
    }
    return context;
}
// #endregion

// #region -------------- Loading --------------
export function Loading({ full = false, block = false, className = '', message = 'Loading', ...rest }: I_LoadingProps) {
    function _renderLoading() {
        return (
            <div className={styles.container} {...rest}>
                <div className={styles.ring}></div>
                <div className={styles.ring}></div>
                <div className={styles.ring}></div>
                <div className={styles.ring}></div>
                {message && <div className={styles.message}>{message}</div>}
            </div>
        );
    }

    if (full) {
        return (
            <div className={cn(styles.fullscreen, className)}>
                {_renderLoading()}
            </div>
        );
    }
    else if (block) {
        return (
            <div className={cn(styles.block, className)}>
                {_renderLoading()}
            </div>
        );
    }

    return _renderLoading();
}
// #endregion

// #region -------------- LoadingProvider --------------
export function LoadingProvider({ children }: { children: T_Children }) {
    const [isLoading, setIsLoading] = useState(false);
    const [isGlobalLoading, setIsGlobalLoading] = useState(false);

    const showLoading = useCallback((global = false) => {
        setIsLoading(true);
        setIsGlobalLoading(global);
    }, []);

    const hideLoading = useCallback(() => {
        setIsLoading(false);
        setIsGlobalLoading(false);
    }, []);

    const contextValue = useMemo(
        () => ({ isLoading, isGlobalLoading, showLoading, hideLoading }),
        [isLoading, isGlobalLoading, showLoading, hideLoading],
    );

    return (
        <LoadingContext value={contextValue}>
            {isLoading ? <Loading full={isGlobalLoading} /> : children}
        </LoadingContext>
    );
}
// #endregion
