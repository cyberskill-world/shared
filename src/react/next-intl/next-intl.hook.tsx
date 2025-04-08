import { useTranslations } from 'next-intl';
import { use } from 'react';

import type { I_NextIntlContext } from './next-intl.type.js';

import { NextIntlContext } from './next-intl.context.js';

export function useNextIntl(): I_NextIntlContext {
    const context = use(NextIntlContext);

    if (!context) {
        throw new Error('useNextIntl must be used within a NextIntlProvider');
    }

    return context;
}

export const useTranslateNextIntl: typeof useTranslations = useTranslations;
