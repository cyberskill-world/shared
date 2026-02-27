import * as React from 'react';
import { use, useEffect, useRef } from 'react';

import { validate } from '#util/validate/validate.util.js';

import { ApolloErrorContext } from './apollo-error.context.js';
import style from './apollo-error.module.scss';

const FOCUSABLE_SELECTORS = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

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
    const { error, hideError } = context ?? {};
    const dialogRef = useRef<HTMLDivElement>(null);
    const previousFocusRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
        if (!error || !hideError) return;

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                hideError();
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [error, hideError]);

    useEffect(() => {
        if (error && dialogRef.current) {
            previousFocusRef.current = document.activeElement as HTMLElement;
            dialogRef.current.focus();
        }
        else if (!error && previousFocusRef.current) {
            previousFocusRef.current.focus();
            previousFocusRef.current = null;
        }
    }, [error]);

    const handleFocusTrap = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key !== 'Tab' || !dialogRef.current) return;

        const focusableElements = Array.from(
            dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTORS),
        ).filter(el => !el.hasAttribute('disabled'));

        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (!firstElement || !lastElement) return;

        if (event.shiftKey) {
            if (document.activeElement === firstElement) {
                event.preventDefault();
                lastElement.focus();
            }
        }
        else if (document.activeElement === lastElement) {
            event.preventDefault();
            firstElement.focus();
        }
    };

    if (!error) {
        return null;
    }

    const isGraphQLError = 'locations' in error || 'path' in error || 'extensions' in error;
    const errorMessage = 'message' in error ? error.message : 'Unknown error occurred';

    return (
        <div className={style['modal-backdrop']}>
            <div
                ref={dialogRef}
                className={style['modal-content']}
                role="dialog"
                aria-modal="true"
                aria-labelledby="apollo-error-title"
                tabIndex={-1}
                onKeyDown={handleFocusTrap}
            >
                <button
                    type="button"
                    className={style['btn-close']}
                    onClick={hideError}
                    aria-label="Close error details"
                    title="Close error details"
                >
                    ✕
                </button>
                <div id="apollo-error-title" className={style['error-title']}>
                    <button
                        type="button"
                        className={style['btn-retry']}
                        onClick={() => window.location.reload()}
                        aria-label="Reload page"
                        title="Reload page"
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
