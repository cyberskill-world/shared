import React, { useCallback, useMemo, useState } from 'react';

import type { I_Children } from '#typescript/react.js';

import { Loading } from './loading.component.js';
import { LoadingContext } from './loading.context.js';

export function LoadingProvider({ children }: I_Children) {
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
