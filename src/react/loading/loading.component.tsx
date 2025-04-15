import cn from 'classnames';
import React from 'react';

import type { I_LoadingProps } from './loading.type.js';

import styles from './loading.module.scss';

export function Loading({ full = false, block = false, className = '', message = 'Loading', ...rest }: I_LoadingProps) {
    function _renderLoading() {
        return (
            <div className={styles['container']} {...rest}>
                <div className={styles['ring']}></div>
                <div className={styles['ring']}></div>
                <div className={styles['ring']}></div>
                <div className={styles['ring']}></div>
                {message && <div className={styles['message']}>{message}</div>}
            </div>
        );
    }

    if (full) {
        return (
            <div className={cn(styles['fullscreen'], className)}>
                {_renderLoading()}
            </div>
        );
    }
    else if (block) {
        return (
            <div className={cn(styles['block'], className)}>
                {_renderLoading()}
            </div>
        );
    }

    return _renderLoading();
}
