export * from './apollo-client.component.js';

export * from './apollo-client.constant.js';
export * from './apollo-client.context.js';
export * from './apollo-client.hook.js';
export * from './apollo-client.type.js';
export * from './apollo-client.util.js';
// TODO: change imports to @apollo/client after migration to v4
export { makeVar } from '@apollo/client/cache/cache.cjs';
export { useApolloClient, useBackgroundQuery, useFragment, useLazyQuery, useLoadableQuery, useMutation, useQuery, useQueryRefHandlers, useReactiveVar, useReadQuery, useSubscription, useSuspenseFragment, useSuspenseQuery } from '@apollo/client/react/hooks/hooks.cjs';
