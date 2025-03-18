import { useMemo } from 'react';

import type { I_NextIntlLanguage, T_NextIntlMessageList } from '../../typescript/next-intl.js';
import type { T_Children } from '../../typescript/react.js';

import { NextIntlContext } from '../../contexts/react/next-intl.js';
import { withNextIntl } from '../../hocs/react/next-intl.js';
import { useStorage } from '../../hooks/react/use-storage.js';

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
