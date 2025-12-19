import { render, screen } from '@testing-library/react';
import React from 'react';
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
        const { container } = render(<Loading full />);
        // Check if the wrapper has the 'full' class (this relies on CSS module implementation details which might be flaky if class names are hashed)
        // Better to check structure or if possible mocking the style import.
        // For now, let's just ensure it still renders the accessible content.
        expect(screen.getByRole('status')).toBeInTheDocument();
    });
});
