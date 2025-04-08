import { use } from 'react';

import { ApolloErrorContext } from './apollo-error.context.js';

export function useApolloError() {
    const context = use(ApolloErrorContext);

    if (!context) {
        throw new Error('useApolloError must be used within ApolloErrorProvider');
    }

    return context;
}
