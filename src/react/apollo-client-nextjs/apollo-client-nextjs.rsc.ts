import { registerApolloClient } from '@apollo/client-integration-nextjs';

import type { I_ApolloOptions } from '../apollo-client/index.js';

import { getClient } from './apollo-client-nextjs.util.js';

export const makeClient = (options: I_ApolloOptions = {}) => registerApolloClient(() => getClient(options));
