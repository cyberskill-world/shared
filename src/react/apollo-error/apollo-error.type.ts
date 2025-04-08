import type { ApolloError } from '@apollo/client';

export interface I_ApolloErrorContext {
    error: ApolloError | null;
    showError: (error: ApolloError) => void;
    hideError: () => void;
}
