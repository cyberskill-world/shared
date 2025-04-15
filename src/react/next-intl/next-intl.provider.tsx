import { useMemo } from 'react';

import type { I_Children } from '#typescript/react.js';

import type { I_NextIntlLanguage, I_NextIntlProviderProps } from './next-intl.type.js';

import { useStorage } from '../storage/index.js';
import { NEXT_INTL_DEFAULT_LANGUAGE } from './next-intl.constant.js';
import { NextIntlContext } from './next-intl.context.js';
import { withNextIntl } from './next-intl.hoc.js';

function LanguageWrapperBase({ children }: I_Children) {
    return <>{children}</>;
}

const LanguageWrapper = withNextIntl(LanguageWrapperBase);

export function NextIntlProvider({
    children,
    languages,
    messages,
}: I_NextIntlProviderProps) {
    const { value, set } = useStorage<I_NextIntlLanguage>('lang', languages[0]);

    const contextValue = useMemo(
        () => ({ languages, currentLanguage: value ?? NEXT_INTL_DEFAULT_LANGUAGE, setCurrentLanguage: set }),
        [languages, set, value],
    );

    return (
        <NextIntlContext value={contextValue}>
            <LanguageWrapper languages={languages} messages={messages}>
                {children}
            </LanguageWrapper>
        </NextIntlContext>
    );
}
