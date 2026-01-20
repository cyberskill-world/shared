import { render, screen } from '@testing-library/react';
import * as React from 'react';
import { describe, expect, it } from 'vitest';

import { Loading } from './loading.component.js';

describe('Loading Component', () => {
    it('renders with default props and accessibility attributes', () => {
        render(<Loading />);

        const loadingContainer = screen.getByRole('status');
        expect(loadingContainer).toBeInTheDocument();
        expect(loadingContainer).toHaveAttribute('aria-live', 'polite');
        expect(loadingContainer).toHaveAttribute('aria-label', 'Loading');
        expect(screen.getByText('Loading')).toBeInTheDocument();
    });

    it('renders with custom message and updates aria-label', () => {
        const customMessage = 'Processing...';
        render(<Loading message={customMessage} />);

        const loadingContainer = screen.getByRole('status');
        expect(loadingContainer).toHaveAttribute('aria-label', customMessage);
        expect(screen.getByText(customMessage)).toBeInTheDocument();
    });

    it('hides decorative rings from screen readers', () => {
        const { container } = render(<Loading />);
        // Select elements by class name isn't ideal for testing library but we need to check internal structure here
        // or check generic divs with aria-hidden
        const rings = container.querySelectorAll('[aria-hidden="true"]');
        expect(rings.length).toBeGreaterThan(0);
    });

    it('allows overriding aria attributes', () => {
        render(<Loading role="alert" aria-live="assertive" />);

        const loadingContainer = screen.getByRole('alert');
        expect(loadingContainer).toBeInTheDocument();
        expect(loadingContainer).toHaveAttribute('aria-live', 'assertive');
    });

    it('renders in full screen mode', () => {
        const { unmount } = render(<Loading full />);

        // The component uses a side effect to add 'noscroll' class to the body
        expect(document.body).toHaveClass('noscroll');

        // Cleanup
        unmount();
        expect(document.body).not.toHaveClass('noscroll');
    });
});
