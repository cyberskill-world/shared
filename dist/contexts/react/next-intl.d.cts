import * as react from 'react';
import { I_NextIntlContextType } from '../../typescript/next-intl.cjs';
import 'date-fns';
import 'next-intl';

declare const NextIntlContext: react.Context<I_NextIntlContextType | undefined>;

export { NextIntlContext };
