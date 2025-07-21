import React, { use } from 'react';

import { ApolloErrorContext } from './apollo-error.context.js';
import style from './apollo-error.module.scss';

/**
 * Renders a list of error messages in a structured format.
 * This helper function creates a formatted display of error messages with
 * a label and bulleted list, providing clear visual separation between
 * different types of errors.
 *
 * @param label - The label to display above the error list.
 * @param list - An array of error objects with message properties.
 * @returns A React element displaying the error list, or null if the list is empty.
 */
function _renderErrorList(label: string, list?: readonly { message: string }[]): React.ReactElement | null {
    if (!list?.length) {
        return null;
    }

    return (
        <div>
            <strong>
                {label}
                :
            </strong>
            <ul>
                {list.map(e => <li key={e.message}>{e.message}</li>)}
            </ul>
        </div>
    );
}

/**
 * Apollo Error Component that displays detailed error information in a modal.
 * This component provides a comprehensive error display interface that shows
 * all types of Apollo errors including GraphQL errors, network errors, protocol
 * errors, and client errors. It includes a reload button for recovery and
 * detailed error information for debugging purposes.
 *
 * Features:
 * - Modal overlay with backdrop for focus
 * - Detailed error categorization and display
 * - Reload functionality for error recovery
 * - Close button to dismiss the error modal
 * - Structured display of different error types
 * - Extra information display for debugging
 *
 * @returns A modal component displaying Apollo error details, or null if no error is present.
 */
export function ApolloErrorComponent() {
    const context = use(ApolloErrorContext);

    const error = context?.error;

    if (!error) {
        return null;
    }

    return (
        <div className={style['modal-backdrop']}>
            <div className={style['modal-content']}>
                <button
                    type="button"
                    className={style['btn-close']}
                    onClick={context.hideError}
                >
                    ✕
                </button>
                <div className={style['error-title']}>
                    <button
                        type="button"
                        className={style['btn-retry']}
                        onClick={() => window.location.reload()}
                    >
                        Reload
                    </button>
                    {' '}
                    {error.message}
                </div>
                <div className={style['error-details']}>
                    {error.networkError && (
                        <pre className="network">
                            <strong>Network Error:</strong>
                            {' '}
                            {error.networkError.message}
                        </pre>
                    )}
                    {_renderErrorList('GraphQL Errors', [...error.graphQLErrors])}
                    {_renderErrorList('Protocol Errors', [...error.protocolErrors])}
                    {_renderErrorList('Client Errors', [...error.clientErrors])}
                    {error.extraInfo && (
                        <pre className="extra">
                            <strong>Extra Info:</strong>
                            {' '}
                            {JSON.stringify(error.extraInfo, null, 4)}
                        </pre>
                    )}
                </div>
            </div>
        </div>
    );
}
