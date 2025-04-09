export interface I_GraphqlCodegenConfig {
    uri: string;
    from: string;
    to: string;
    withComponent?: boolean;
    withHOC?: boolean;
    withHooks?: boolean;
    withMutationFn?: boolean;
    withRefetchFn?: boolean;
    federation?: boolean;
}
