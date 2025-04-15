import type { ComponentType } from 'react';

import { NextIntlClientProvider } from 'next-intl';

import type { I_Children } from '#typescript/react.js';

import type { I_NextIntlLanguage, T_NextIntlMessageList } from './next-intl.type.js';

import { log } from '../log/index.js';
import { NEXT_INTL_DEFAULT_LANGUAGE } from './next-intl.constant.js';
import { useNextIntl } from './next-intl.hook.js';

export function withNextIntl<T extends I_Children>(Component: ComponentType<T>) {
    const PageWithI18n = (props: T & { languages: I_NextIntlLanguage[]; messages: T_NextIntlMessageList }) => {
        const { currentLanguage } = useNextIntl();
        const { messages, languages } = props;
        const defaultLang = 'en';

        const defaultMessages = messages[currentLanguage?.value || defaultLang];
        const timeZone = languages.find(lang => lang.value === currentLanguage?.value)?.timezone ?? NEXT_INTL_DEFAULT_LANGUAGE.timezone;

        if (!messages) {
            log.warn(`Missing messages for language: ${currentLanguage?.value || defaultLang}`);
            return null;
        }

        return (
            <NextIntlClientProvider
                locale={currentLanguage?.value || defaultLang}
                messages={defaultMessages || null}
                timeZone={timeZone}
            >
                <Component {...(props as T)} />
            </NextIntlClientProvider>
        );
    };

    PageWithI18n.displayName = `withNextIntl(${Component.displayName || Component.name || 'Component'})`;

    return PageWithI18n;
}
