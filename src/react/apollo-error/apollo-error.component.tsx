import * as React from 'react';
import { use, useEffect } from 'react';

import { validate } from '#util/validate/validate.util.js';

import { ApolloErrorContext } from './apollo-error.context.js';
import style from './apollo-error.module.scss';

/**
 * Apollo Error Component that displays detailed error information in a modal.
 * This component provides a comprehensive error display interface that shows
 * GraphQL errors and other error types with detailed information for debugging purposes.
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

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                context?.hideError();
            }
        };

        if (context?.error) {
            window.addEventListener('keydown', handleKeyDown);
        }

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [context]);

    const error = context?.error;

    if (!error) {
        return null;
    }

    const isGraphQLError = 'locations' in error || 'path' in error || 'extensions' in error;
    const errorMessage = 'message' in error ? error.message : 'Unknown error occurred';

    return (
        <div className={style['modal-backdrop']}>
            <div
                className={style['modal-content']}
                role="dialog"
                aria-modal="true"
                aria-labelledby="apollo-error-title"
            >
                <button
                    type="button"
                    className={style['btn-close']}
                    onClick={context.hideError}
                    aria-label="Close error details"
                >
                    ✕
                </button>
                <div id="apollo-error-title" className={style['error-title']}>
                    <button
                        type="button"
                        className={style['btn-retry']}
                        onClick={() => window.location.reload()}
                        aria-label="Reload page"
                    >
                        Reload
                    </button>
                    {' '}
                    {!validate.isEmpty(error) && errorMessage}
                </div>
                <div className={style['error-details']}>
                    {isGraphQLError && 'locations' in error && error.locations && (
                        <pre className="locations">
                            <strong>Locations:</strong>
                            {' '}
                            {JSON.stringify(error.locations, null, 4)}
                        </pre>
                    )}
                    {isGraphQLError && 'path' in error && error.path && (
                        <pre className="path">
                            <strong>Path:</strong>
                            {' '}
                            {JSON.stringify(error.path, null, 4)}
                        </pre>
                    )}
                    {isGraphQLError && 'extensions' in error && error.extensions && (
                        <pre className="extensions">
                            <strong>Extensions:</strong>
                            {' '}
                            {JSON.stringify(error.extensions, null, 4)}
                        </pre>
                    )}
                    {!isGraphQLError && (
                        <pre className="error-details">
                            <strong>Error Details:</strong>
                            {' '}
                            {validate.isEmpty(error) ? errorMessage : JSON.stringify(error, null, 4)}
                        </pre>
                    )}
                </div>
            </div>
        </div>
    );
}
