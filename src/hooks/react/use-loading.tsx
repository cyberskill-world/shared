import { useContext } from 'react';

import { LoadingContext } from '../../contexts/react/loading.js';

export function useLoading() {
    const context = useContext(LoadingContext);
    if (!context) {
        throw new Error('useLoading must be used within a LoadingProvider');
    }
    return context;
}
