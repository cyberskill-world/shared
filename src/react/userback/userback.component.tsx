import UserbackWidget from '@userback/widget';
import { useEffect } from 'react';

import type { I_UserBackProps } from './userback.type.js';

export function Userback({ token, options }: I_UserBackProps) {
    useEffect(() => {
        if (!token) {
            return;
        }

        let observer: MutationObserver;

        const loadUserback = async () => {
            const { hide, ...rest } = options || {};

            await UserbackWidget(token, rest);

            if (hide && hide.length > 0) {
                hide.forEach((selector: string) => {
                    document.querySelectorAll(selector).forEach(el => el.remove());
                });
            }

            observer = new MutationObserver(() => {
                if (hide && hide.length > 0) {
                    hide.forEach((selector: string) => {
                        document.querySelectorAll(selector).forEach(el => el.remove());
                    });
                }
            });

            observer.observe(document.body, {
                childList: true,
                subtree: true,
            });
        };

        loadUserback();

        return () => {
            observer?.disconnect();
        };
    }, [token, options]);

    return null;
}
