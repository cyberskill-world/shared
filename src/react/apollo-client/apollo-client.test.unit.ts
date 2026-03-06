import { CombinedGraphQLErrors, CombinedProtocolErrors, ServerError } from '@apollo/client/core';
import { ErrorLink } from '@apollo/client/link/error';
import { describe, expect, it, vi } from 'vitest';

import { log } from '../log/index.js';
import { createApolloLinks, getClient } from './apollo-client.util.js';

// All vi.mock factories are hoisted to the top of the file by vitest.
// Classes used with `new` in the source code MUST be mock-constructors, not arrow functions.

vi.mock('@apollo/client/core', () => ({
    ApolloClient: vi.fn().mockImplementation(function (this: any, opts: any) {
        Object.assign(this, opts);
        this.__isApolloClient = true;
    }),
    InMemoryCache: vi.fn().mockImplementation(() => { }),
    CombinedGraphQLErrors: { is: vi.fn().mockReturnValue(false) },
    CombinedProtocolErrors: { is: vi.fn().mockReturnValue(false) },
    ServerError: { is: vi.fn().mockReturnValue(false) },
}));

vi.mock('@apollo/client/link', () => {
    class MockLink { }
    return {
        ApolloLink: Object.assign(MockLink, {
            from: vi.fn((links: any[]) => ({ links, __isLink: true })),
            split: vi.fn((_test: any, _a: any, b: any) => b),
            empty: vi.fn(() => ({ __isEmpty: true })),
        }),
    };
});

vi.mock('@apollo/client/link/error', () => ({
    ErrorLink: vi.fn().mockImplementation(() => { }),
}));

vi.mock('@apollo/client/link/remove-typename', () => ({
    RemoveTypenameFromVariablesLink: vi.fn().mockImplementation(() => { }),
}));

vi.mock('@apollo/client/link/subscriptions', () => ({
    GraphQLWsLink: vi.fn().mockImplementation(() => { }),
}));

vi.mock('graphql-ws', () => ({
    createClient: vi.fn(() => ({})),
}));

vi.mock('graphql', () => ({
    OperationTypeNode: { SUBSCRIPTION: 'subscription' },
}));

vi.mock('rxjs', () => ({
    tap: vi.fn(() => (source: any) => source),
}));

vi.mock('./links/index.js', () => ({
    createUploadLink: vi.fn(() => ({ __isUploadLink: true })),
}));

vi.mock('../apollo-error/index.js', () => ({
    hasCustomApolloErrorHandler: vi.fn().mockReturnValue(false),
    showGlobalApolloError: vi.fn(),
}));

vi.mock('../log/index.js', () => ({
    log: { info: vi.fn(), warn: vi.fn(), error: vi.fn() },
}));

vi.mock('../toast/index.js', () => ({
    toast: { error: vi.fn() },
}));

vi.mock('./apollo-client.module.scss', () => ({
    default: {},
}));

// ---------------------------------------------------------------------------
// createApolloLinks
// ---------------------------------------------------------------------------
describe('createApolloLinks', () => {
    it('should return an array of links', () => {
        const links = createApolloLinks({ uri: 'http://localhost:4000/graphql' });
        expect(Array.isArray(links)).toBe(true);
        expect(links.length).toBeGreaterThan(0);
    });

    it('should include ws link when wsUrl is provided', () => {
        const links = createApolloLinks({
            uri: 'http://localhost:4000/graphql',
            wsUrl: 'ws://localhost:4000/graphql',
        });
        expect(links.length).toBeGreaterThan(0);
    });

    it('should work without wsUrl', () => {
        const links = createApolloLinks({ uri: 'http://localhost:4000/graphql' });
        expect(links.length).toBeGreaterThan(0);
    });

    it('should include custom links when provided', () => {
        const customLink = { __isCustom: true } as any;
        const links = createApolloLinks({
            uri: 'http://localhost:4000/graphql',
            customLinks: [customLink],
        });
        expect(links).toContain(customLink);
    });

    it('should warn when no uri is provided', () => {
        createApolloLinks({} as any);
        expect(log.warn).toHaveBeenCalledWith(expect.stringContaining('No GraphQL URI'));
    });
});

// ---------------------------------------------------------------------------
// getClient
// ---------------------------------------------------------------------------
describe('getClient', () => {
    it('should return an Apollo Client instance', () => {
        const client = getClient({ uri: 'http://localhost:4000/graphql' });
        expect(client).toBeDefined();
        expect((client as any).__isApolloClient).toBe(true);
    });
});

// ---------------------------------------------------------------------------
// ErrorLink callback branches
// ---------------------------------------------------------------------------
describe('errorLink callback', () => {
    // Capture the error handler callback from ErrorLink mock
    /**
     *
     */
    function getErrorHandler() {
        const calls = vi.mocked(ErrorLink).mock.calls;
        return calls[0]?.[0] as (args: { error: any; operation: any }) => void;
    }

    const mockOperation = { operationName: 'TestOp' };

    it('should handle CombinedGraphQLErrors', () => {
        vi.mocked(CombinedGraphQLErrors.is).mockReturnValueOnce(true);
        const handler = getErrorHandler();
        handler({
            error: {
                message: 'gql error',
                errors: [
                    { message: 'Field error', locations: [{ line: 1, column: 1 }], path: ['test'] },
                    { message: 'Second error', locations: [], path: [] },
                ],
            },
            operation: mockOperation,
        });
        expect(log.error).toHaveBeenCalledWith(expect.stringContaining('GraphQL error'));
    });

    it('should handle CombinedProtocolErrors', () => {
        vi.mocked(CombinedGraphQLErrors.is).mockReturnValueOnce(false);
        vi.mocked(CombinedProtocolErrors.is).mockReturnValueOnce(true);
        const handler = getErrorHandler();
        handler({
            error: {
                message: 'protocol error',
                errors: [
                    { message: 'Protocol issue', extensions: { code: 'TEST' } },
                    { message: 'Another', extensions: {} },
                ],
            },
            operation: mockOperation,
        });
        expect(log.error).toHaveBeenCalledWith(expect.stringContaining('Protocol error'));
    });

    it('should handle ServerError', () => {
        vi.mocked(CombinedGraphQLErrors.is).mockReturnValueOnce(false);
        vi.mocked(CombinedProtocolErrors.is).mockReturnValueOnce(false);
        vi.mocked(ServerError.is).mockReturnValueOnce(true);
        const handler = getErrorHandler();
        handler({
            error: { message: 'Server failure' },
            operation: mockOperation,
        });
        expect(log.error).toHaveBeenCalledWith(expect.stringContaining('Server error'));
    });

    it('should handle generic network error', () => {
        vi.mocked(CombinedGraphQLErrors.is).mockReturnValueOnce(false);
        vi.mocked(CombinedProtocolErrors.is).mockReturnValueOnce(false);
        vi.mocked(ServerError.is).mockReturnValueOnce(false);
        const handler = getErrorHandler();
        handler({
            error: { message: 'Network down' },
            operation: mockOperation,
        });
        expect(log.error).toHaveBeenCalledWith(expect.stringContaining('Network error'));
    });
});
