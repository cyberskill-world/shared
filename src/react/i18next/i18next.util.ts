import type { InitOptions } from 'i18next';

import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

export function initI18next(options: InitOptions) {
    return i18next.use(initReactI18next).init(options);
}
