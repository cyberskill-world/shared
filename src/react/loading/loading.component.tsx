import cn from 'classnames';
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
            <div className={cn(style['fullscreen'], className)}>
                {_renderLoading()}
            </div>
        );
    }
    else if (block) {
        return (
            <div className={cn(style['block'], className)}>
                {_renderLoading()}
            </div>
        );
    }

    return _renderLoading();
}
