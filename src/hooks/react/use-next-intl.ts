import { useTranslations } from 'next-intl';
import { useContext } from 'react';

import type { I_NextIntlContextType } from '../../typescript/next-intl.js';

import { NextIntlContext } from '../../contexts/react/next-intl.js';

export function useNextIntl(): I_NextIntlContextType {
    const context = useContext(NextIntlContext);

    if (!context) {
        throw new Error('useNextIntl must be used within a NextIntlProvider');
    }

    return context;
}

export const useTranslateNextIntl = useTranslations;
