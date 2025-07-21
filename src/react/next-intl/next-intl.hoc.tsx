import type { ComponentType } from 'react';

import { NextIntlClientProvider } from 'next-intl';
import React from 'react';

import type { I_Children } from '#typescript/index.js';

import type { I_NextIntlLanguage, T_NextIntlMessageList } from './next-intl.type.js';

import { log } from '../log/index.js';
import { NEXT_INTL_DEFAULT_LANGUAGE } from './next-intl.constant.js';
import { useNextIntl } from './next-intl.hook.js';

/**
 * Higher-Order Component (HOC) that wraps components with Next.js internationalization support.
 * This HOC provides internationalization capabilities to React components by wrapping them
 * with the NextIntlClientProvider. It automatically handles language detection, message
 * loading, and timezone configuration based on the current language settings.
 *
 * Features:
 * - Automatic language detection and message loading
 * - Timezone configuration based on language settings
 * - Fallback to default language when messages are missing
 * - Warning logging for missing message configurations
 * - Proper display name preservation for debugging
 *
 * @param Component - The React component to wrap with internationalization support.
 * @returns A new component with internationalization capabilities and additional props for languages and messages.
 */
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
