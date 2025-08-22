import type { GraphQLError } from 'graphql';

export type { GraphQLError } from 'graphql';

export interface I_ApolloErrorContext {
    error: GraphQLError | Error | null;
    showError: (error: GraphQLError | Error) => void;
    hideError: () => void;
}
