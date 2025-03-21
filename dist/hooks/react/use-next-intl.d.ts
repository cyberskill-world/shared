import * as use_intl from 'use-intl';
import { I_NextIntlContextType } from '../../typescript/next-intl.js';
import 'date-fns';
import 'next-intl';

declare function useNextIntl(): I_NextIntlContextType;
declare const useTranslateNextIntl: typeof use_intl.useTranslations;

export { useNextIntl, useTranslateNextIntl };
