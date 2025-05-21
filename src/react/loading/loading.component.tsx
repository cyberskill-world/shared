import clsx from 'clsx';
import React from 'react';

import type { I_LoadingProps } from './loading.type.js';

import style from './loading.module.scss';

export function Loading({ full = false, block = false, className = '', message = 'Loading', ...rest }: I_LoadingProps) {
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
            <div className={clsx(style['fullscreen'], className)}>
                {_renderLoading()}
            </div>
        );
    }
    else if (block) {
        return (
            <div className={clsx(style['block'], className)}>
                {_renderLoading()}
            </div>
        );
    }

    return _renderLoading();
}
