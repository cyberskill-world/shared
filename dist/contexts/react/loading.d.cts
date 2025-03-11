import * as react from 'react';
import { I_LoadingContext } from '../../typescript/react.cjs';
import '@apollo/client';

declare const LoadingContext: react.Context<I_LoadingContext | undefined>;

export { LoadingContext };
