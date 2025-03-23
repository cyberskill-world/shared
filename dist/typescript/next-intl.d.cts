import { Locale } from 'date-fns';
import { Timezone, AbstractIntlMessages } from 'next-intl';

interface I_NextIntlLanguage {
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
interface I_NextIntlContextType {
    languages: I_NextIntlLanguage[];
    currentLanguage: I_NextIntlLanguage;
    setCurrentLanguage: (newLang: I_NextIntlLanguage) => void;
}
type T_NextIntlMessageList = Record<string, AbstractIntlMessages>;

export type { I_NextIntlContextType, I_NextIntlLanguage, T_NextIntlMessageList };
