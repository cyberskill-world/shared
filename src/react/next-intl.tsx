import type { ComponentType } from 'react';

import { NextIntlClientProvider, useTranslations } from 'next-intl';
import { createContext, use, useMemo } from 'react';

import type { I_NextIntlContextType, I_NextIntlLanguage, T_NextIntlMessageList } from '../typescript/next-intl.js';
import type { T_Children } from '../typescript/react.js';

import { useStorage } from './storage.js';

// #region -------------- NextIntlContext --------------
export const NextIntlContext = createContext<I_NextIntlContextType | undefined>(undefined);
// #endregion

// #region -------------- useNextIntl --------------
export function useNextIntl(): I_NextIntlContextType {
    const context = use(NextIntlContext);

    if (!context) {
        throw new Error('useNextIntl must be used within a NextIntlProvider');
    }

    return context;
}

export const useTranslateNextIntl = useTranslations;
// #endregion

// #region -------------- withNextIntl --------------
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
// #endregion

// #region -------------- NextIntlProvider --------------
function LanguageWrapperBase({ children }: { children: T_Children }) {
    return <>{children}</>;
}

const LanguageWrapper = withNextIntl(LanguageWrapperBase);

export function NextIntlProvider({
    children,
    languages,
    messages,
}: {
    children: T_Children;
    languages: I_NextIntlLanguage[];
    messages: T_NextIntlMessageList;
}) {
    const [currentLanguage, setCurrentLanguage] = useStorage<I_NextIntlLanguage>('lang', languages?.[0] ?? {});

    const contextValue = useMemo(
        () => ({ languages, currentLanguage, setCurrentLanguage }),
        [languages, currentLanguage, setCurrentLanguage],
    );

    return (
        <NextIntlContext value={contextValue}>
            <LanguageWrapper languages={languages} messages={messages}>
                {children}
            </LanguageWrapper>
        </NextIntlContext>
    );
}
// #endregion
