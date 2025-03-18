import { I_NextIntlContextType } from '../../typescript/next-intl.cjs';
export { useTranslations as useTranslateNextIntl } from 'next-intl';
import 'date-fns';

declare function useNextIntl(): I_NextIntlContextType;

export { useNextIntl };
