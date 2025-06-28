import { ApolloClient, InMemoryCache } from '@apollo/client-integration-nextjs';
// TODO: change imports to @apollo/client after migration to v4
import { from } from '@apollo/client/link/core/core.cjs';

import type { I_ApolloOptions } from '../apollo-client/index.js';

import { createApolloLinks } from '../apollo-client/index.js';

export function getClientNextJS(options: I_ApolloOptions = {}) {
    const link = from(createApolloLinks(options));

    return new ApolloClient({
        link,
        cache: new InMemoryCache(),
        ...options,
    });
}
