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

    it('cleans up Escape key listener on unmount', () => {
        const mockHideError = vi.fn();
        const mockError = { message: 'Test Error' };

        const { unmount } = render(
            <ApolloErrorContext.Provider value={{ error: mockError as any, hideError: mockHideError, showError: vi.fn() }}>
                <ApolloErrorComponent />
            </ApolloErrorContext.Provider>
        );

        // Unmount the component to trigger cleanup
        unmount();

        // Verify Escape key no longer triggers hideError after unmount
        fireEvent.keyDown(window, { key: 'Escape' });
        expect(mockHideError).not.toHaveBeenCalled();
    });

    it('does not call hideError on Escape after error is cleared', () => {
        const mockHideError = vi.fn();
        const mockError = { message: 'Test Error' };

        const { rerender } = render(
            <ApolloErrorContext.Provider value={{ error: mockError as any, hideError: mockHideError, showError: vi.fn() }}>
                <ApolloErrorComponent />
            </ApolloErrorContext.Provider>
        );

        // Re-render with error cleared
        rerender(
            <ApolloErrorContext.Provider value={{ error: null, hideError: mockHideError, showError: vi.fn() }}>
                <ApolloErrorComponent />
            </ApolloErrorContext.Provider>
        );

        // Ensure the dialog is no longer rendered
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

        // Verify Escape does not call hideError after error is cleared
        fireEvent.keyDown(window, { key: 'Escape' });
        expect(mockHideError).not.toHaveBeenCalled();
    });

    it('does not render when no error is present', () => {
        render(
            <ApolloErrorContext.Provider value={{ error: null, hideError: vi.fn(), showError: vi.fn() }}>
                <ApolloErrorComponent />
            </ApolloErrorContext.Provider>
        );

        expect(screen.queryByText('Test Error')).not.toBeInTheDocument();
    });

    it('traps focus within the dialog on Tab key', () => {
        const mockHideError = vi.fn();
        const mockError = { message: 'Test Error' };

        render(
            <ApolloErrorContext.Provider value={{ error: mockError as any, hideError: mockHideError, showError: vi.fn() }}>
                <ApolloErrorComponent />
            </ApolloErrorContext.Provider>
        );

        const dialog = screen.getByRole('dialog');
        const buttons = screen.getAllByRole('button');
        const lastButton = buttons[buttons.length - 1]!;

        // Simulate Tab from last focusable element — focus should wrap to first
        lastButton.focus();
        fireEvent.keyDown(dialog, { key: 'Tab', shiftKey: false });
        expect(document.activeElement).toBe(buttons[0]);
    });

    it('traps focus within the dialog on Shift+Tab key', () => {
        const mockHideError = vi.fn();
        const mockError = { message: 'Test Error' };

        render(
            <ApolloErrorContext.Provider value={{ error: mockError as any, hideError: mockHideError, showError: vi.fn() }}>
                <ApolloErrorComponent />
            </ApolloErrorContext.Provider>
        );

        const dialog = screen.getByRole('dialog');
        const buttons = screen.getAllByRole('button');
        const firstButton = buttons[0]!;
        const lastButton = buttons[buttons.length - 1]!;

        // Simulate Shift+Tab from first focusable element — focus should wrap to last
        firstButton.focus();
        fireEvent.keyDown(dialog, { key: 'Tab', shiftKey: true });
        expect(document.activeElement).toBe(lastButton);
    });

    it('returns focus to the previously focused element when dialog closes', () => {
        const mockHideError = vi.fn();
        const mockError = { message: 'Test Error' };

        const triggerButton = document.createElement('button');
        document.body.appendChild(triggerButton);
        triggerButton.focus();

        const { rerender } = render(
            <ApolloErrorContext.Provider value={{ error: mockError as any, hideError: mockHideError, showError: vi.fn() }}>
                <ApolloErrorComponent />
            </ApolloErrorContext.Provider>
        );

        // Re-render with error cleared to trigger focus return
        rerender(
            <ApolloErrorContext.Provider value={{ error: null, hideError: mockHideError, showError: vi.fn() }}>
                <ApolloErrorComponent />
            </ApolloErrorContext.Provider>
        );

        expect(document.activeElement).toBe(triggerButton);
        document.body.removeChild(triggerButton);
    });
});
