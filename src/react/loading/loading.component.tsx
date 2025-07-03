import clsx from 'clsx';
import React, { useEffect } from 'react';

import type { I_LoadingProps } from './loading.type.js';

import style from './loading.module.scss';

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

    function _renderLoading() {
        return (
            <div className={style['container']} {...rest}>
                <div className={style['ring']}></div>
                <div className={style['ring']}></div>
                <div className={style['ring']}></div>
                <div className={style['ring']}></div>
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
