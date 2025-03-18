import type { Locale } from 'date-fns';
import type { AbstractIntlMessages, Timezone } from 'next-intl';

export interface I_NextIntlLanguage {
    label: string;
    value: string;
    flag: string;
    adapterLocale: Locale;
    icon: string;
    numberFormat: {
        code: string;
        currency: string;
    };
    timezone: Timezone;
}

export interface I_NextIntlContextType {
    languages: I_NextIntlLanguage[];
    currentLanguage: I_NextIntlLanguage;
    setCurrentLanguage: (newLang: I_NextIntlLanguage) => void;
}

export type T_NextIntlMessageList = Record<string, AbstractIntlMessages>;
