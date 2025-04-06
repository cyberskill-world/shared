import type { ApolloError } from '@apollo/client';

export interface I_ApolloErrorViewerContext {
    error: ApolloError | null;
    showError: (error: ApolloError) => void;
    hideError: () => void;
}
