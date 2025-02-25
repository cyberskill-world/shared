import cn from 'classnames';

import styles from './loading.module.scss';

export interface I_LoadingProps {
    full?: boolean;
    block?: boolean;
    className?: string;
    message?: string;
}

export function Loading({ full = false, block = false, className = '', message = 'Loading', ...rest }: I_LoadingProps) {
    function _renderLoading() {
        return (
            <div className={styles.container} {...rest}>
                <div className={styles.ring}></div>
                <div className={styles.ring}></div>
                <div className={styles.ring}></div>
                <div className={styles.ring}></div>
                {message && <div className={styles.message}>{message}</div>}
            </div>
        );
    }

    if (full) {
        return (
            <div className={cn(styles.fullscreen, className)}>
                {_renderLoading()}
            </div>
        );
    }
    else if (block) {
        return (
            <div className={cn(styles.block, className)}>
                {_renderLoading()}
            </div>
        );
    }

    return _renderLoading();
}
