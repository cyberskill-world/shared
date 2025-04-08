import { use } from 'react';

import { LoadingContext } from './loading.context.js';

export function useLoading() {
    const context = use(LoadingContext);
    if (!context) {
        throw new Error('useLoading must be used within a LoadingProvider');
    }
    return context;
}
