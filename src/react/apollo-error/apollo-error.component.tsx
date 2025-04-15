import React, { use } from 'react';
import { FaRepeat } from 'react-icons/fa6';

import { ApolloErrorContext } from './apollo-error.context.js';
import styles from './apollo-error.module.scss';

export function ApolloError() {
    const context = use(ApolloErrorContext);

    const error = context?.error;

    if (!error) {
        return null;
    }

    const renderErrorList = (label: string, list?: readonly { message: string }[]) =>
        list?.length
            ? (
                    <div>
                        <strong>
                            {label}
                            :
                        </strong>
                        <ul>
                            {list.map(e => <li key={e.message}>{e.message}</li>)}
                        </ul>
                    </div>
                )
            : null;

    return (
        <div className={styles['modal-backdrop']}>
            <div className={styles['modal-content']}>
                <button
                    type="button"
                    className={styles['btn-close']}
                    onClick={context.hideError}
                >
                    ✕
                </button>
                <div className={styles['error-title']}>
                    <button
                        type="button"
                        className={styles['btn-retry']}
                        onClick={() => window.location.reload()}
                    >
                        <FaRepeat />
                    </button>
                    {' '}
                    {error.message}
                </div>
                <div className={styles['error-details']}>
                    {error.networkError && (
                        <pre className="network">
                            <strong>Network Error:</strong>
                            {' '}
                            {error.networkError.message}
                        </pre>
                    )}
                    {renderErrorList('GraphQL Errors', [...error.graphQLErrors])}
                    {renderErrorList('Protocol Errors', [...error.protocolErrors])}
                    {renderErrorList('Client Errors', [...error.clientErrors])}
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
