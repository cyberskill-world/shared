import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { describe, expect, it, vi } from 'vitest';

import { ApolloErrorComponent } from './apollo-error.component.js';
import { ApolloErrorContext } from './apollo-error.context.js';

describe('ApolloErrorComponent', () => {
    const mockHideError = vi.fn();
    const mockContextValue = {
        error: {
            message: 'Test Error',
            name: 'Error',
        },
        hideError: mockHideError,
        showError: vi.fn(),
    };

    const renderComponent = (contextValue = mockContextValue) => {
        return render(
            <ApolloErrorContext.Provider value={contextValue}>
                <ApolloErrorComponent />
            </ApolloErrorContext.Provider>
        );
    };

    it('renders nothing when there is no error', () => {
        renderComponent({ ...mockContextValue, error: null });
        expect(screen.queryByText('Test Error')).not.toBeInTheDocument();
    });

    it('renders error message when error is present', () => {
        renderComponent();
        expect(screen.getByText('Test Error')).toBeInTheDocument();
    });

    it('calls hideError when close button is clicked', () => {
        renderComponent();
        const closeButton = screen.getByText('✕');
        fireEvent.click(closeButton);
        expect(mockHideError).toHaveBeenCalled();
    });

    // These tests are expected to fail initially or just check absence of a11y
    it('should have dialog role', () => {
        renderComponent();
        const dialog = screen.getByRole('dialog');
        expect(dialog).toBeInTheDocument();
        expect(dialog).toHaveAttribute('aria-modal', 'true');
    });

    it('should have aria-label on close button', () => {
        renderComponent();
        const closeButton = screen.getByText('✕');
        expect(closeButton).toHaveAttribute('aria-label', 'Close error details');
    });

    it('should close on Escape key', () => {
        renderComponent();
        fireEvent.keyDown(document, { key: 'Escape', code: 'Escape' });
        expect(mockHideError).toHaveBeenCalled();
    });

    it('should have accessible title', () => {
        renderComponent();
        const dialog = screen.getByRole('dialog');
        const title = screen.getByRole('heading', { level: 2 });
        expect(title).toBeInTheDocument();
        expect(dialog).toHaveAttribute('aria-labelledby', title.id);
    });
});
