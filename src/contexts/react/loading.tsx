import { createContext } from 'react';

import type { I_LoadingContext } from '../../typescript/react.js';

export const LoadingContext = createContext<I_LoadingContext | undefined>(undefined);
