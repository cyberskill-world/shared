import clsx from 'clsx';
import React, { useEffect } from 'react';

import type { I_LoadingProps } from './loading.type.js';

import style from './loading.module.scss';

/**
 * Injects CSS styles to prevent scrolling when full-screen loading is active.
 * This function creates and injects a style element that adds the 'noscroll' class
 * to prevent body scrolling and sets a fixed height. It ensures the style is only
 * injected once by checking for an existing style element with the same ID.
 */
function injectNoScrollStyle() {
    if (document.getElementById('noscroll-style')) {
        return;
    }

    const style = document.createElement('style');
    style.id = 'noscroll-style';
    style.innerHTML = `
    .noscroll {
        overflow: hidden !important;
        height: 100vh !important;
    }
    `;
    document.head.appendChild(style);
}

/**
 * Loading component that displays animated loading indicators.
 * This component provides a customizable loading interface with animated rings
 * and optional full-screen overlay. It includes features for preventing user
 * interaction during loading states and supports both inline and full-screen modes.
 *
 * Features:
 * - Animated loading rings with multiple colors
 * - Full-screen overlay mode with scroll prevention
 * - Context menu prevention during full-screen loading
 * - Customizable loading message
 * - Responsive design with CSS modules
 * - Accessibility considerations with reduced motion support
 *
 * @param props - Component props containing loading configuration.
 * @param props.full - Whether to display the loading indicator in full-screen mode (default: false).
 * @param props.className - Additional CSS classes to apply to the loading container.
 * @param props.message - Custom message to display below the loading animation.
 * @param props.rest - Additional props to spread to the loading container.
 * @returns A React component displaying the loading animation with optional full-screen overlay.
 */
export function Loading({ full = false, className = '', message = 'Loading', ...rest }: I_LoadingProps) {
    useEffect(() => {
        if (full) {
            document.body.classList.add('noscroll');

            const handleContextMenu = (e: MouseEvent) => e.preventDefault();
            document.addEventListener('contextmenu', handleContextMenu);

            return () => {
                document.body.classList.remove('noscroll');
                document.removeEventListener('contextmenu', handleContextMenu);
            };
        }
    }, [full]);

    useEffect(() => {
        injectNoScrollStyle();
    }, []);

    /**
     * Renders the core loading animation with rings and message.
     * This function creates the animated loading rings and optional message
     * that are used in both full-screen and inline loading modes.
     *
     * @returns A React element containing the loading animation and message.
     */
    function _renderLoading() {
        return (
            <div
                role="status"
                aria-live="polite"
                aria-label={message}
                className={style['container']}
                {...rest}
            >
                <div className={style['ring']} aria-hidden="true"></div>
                <div className={style['ring']} aria-hidden="true"></div>
                <div className={style['ring']} aria-hidden="true"></div>
                <div className={style['ring']} aria-hidden="true"></div>
                {message && <div className={style['message']}>{message}</div>}
            </div>
        );
    }

    if (full) {
        return (
            <div className={clsx(style['full'], className)}>
                {_renderLoading()}
            </div>
        );
    }

    return (
        <div className={clsx(style['block'], className)}>
            {_renderLoading()}
        </div>
    );
}
