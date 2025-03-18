import { createContext } from 'react';

import type { I_NextIntlContextType } from '../../typescript/next-intl.js';

export const NextIntlContext = createContext<I_NextIntlContextType | undefined>(undefined);
