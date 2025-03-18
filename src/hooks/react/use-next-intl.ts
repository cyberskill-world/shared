import { useContext } from 'react';

import type { I_NextIntlContextType } from '../../typescript/next-intl.js';

import { NextIntlContext } from '../../contexts/react/next-intl.js';

export { useTranslations as useTranslateNextIntl } from 'next-intl';

export function useNextIntl(): I_NextIntlContextType {
    const context = useContext(NextIntlContext);

    if (!context) {
        throw new Error('useNextIntl must be used within a NextIntlProvider');
    }

    return context;
}
