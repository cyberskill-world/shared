import type { ComponentType } from 'react';

import { NextIntlClientProvider } from 'next-intl';

import type { I_NextIntlLanguage, T_NextIntlMessageList } from '../../typescript/next-intl.js';
import type { T_Children } from '../../typescript/react.js';

import { useNextIntl } from '../../hooks/react/use-next-intl.js';

export function withNextIntl<T extends { children: T_Children }>(Component: ComponentType<T>) {
    const PageWithI18n = (props: T & { languages: I_NextIntlLanguage[]; messages: T_NextIntlMessageList }) => {
        const { currentLanguage } = useNextIntl();
        const { messages, languages } = props;
        const defaultLang = 'en';

        const defaultMessages = messages[currentLanguage?.value || defaultLang];
        const timeZone = languages.find(lang => lang.value === currentLanguage?.value)?.timezone;

        if (!messages) {
            console.warn(`Missing messages for language: ${currentLanguage?.value || defaultLang}`);
            return null;
        }

        return (
            <NextIntlClientProvider
                locale={currentLanguage?.value || defaultLang}
                messages={defaultMessages}
                timeZone={timeZone}
            >
                <Component {...(props as T)} />
            </NextIntlClientProvider>
        );
    };

    PageWithI18n.displayName = `withNextIntl(${Component.displayName || Component.name || 'Component'})`;

    return PageWithI18n;
}
