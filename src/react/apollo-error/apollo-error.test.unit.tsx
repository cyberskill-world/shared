import { render, screen, fireEvent } from '@testing-library/react';
import * as React from 'react';
import { describe, expect, it, vi } from 'vitest';

import { ApolloErrorComponent } from './apollo-error.component.js';
import { ApolloErrorContext } from './apollo-error.context.js';

describe('ApolloErrorComponent', () => {
    it('renders error message with accessibility attributes', () => {
        const mockHideError = vi.fn();
        const mockError = { message: 'Test Error' };

        render(
            <ApolloErrorContext.Provider value={{ error: mockError as any, hideError: mockHideError, showError: vi.fn() }}>
                <ApolloErrorComponent />
            </ApolloErrorContext.Provider>
        );

        // Verify content
        expect(screen.getByText('Test Error')).toBeInTheDocument();

        // Verify accessibility attributes
        const dialog = screen.getByRole('dialog');
        expect(dialog).toBeInTheDocument();
        expect(dialog).toHaveAttribute('aria-modal', 'true');
        expect(dialog).toHaveAttribute('aria-labelledby', 'apollo-error-title');

        expect(screen.getByLabelText('Close error details')).toBeInTheDocument();
        expect(screen.getByLabelText('Reload page')).toBeInTheDocument();

        // Verify Escape key closes the modal
        fireEvent.keyDown(window, { key: 'Escape' });
        expect(mockHideError).toHaveBeenCalled();
    });

    it('does not render when no error is present', () => {
        render(
            <ApolloErrorContext.Provider value={{ error: null, hideError: vi.fn(), showError: vi.fn() }}>
                <ApolloErrorComponent />
            </ApolloErrorContext.Provider>
        );

        expect(screen.queryByText('Test Error')).not.toBeInTheDocument();
    });
});
