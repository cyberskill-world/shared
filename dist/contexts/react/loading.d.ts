import * as react from 'react';
import { I_LoadingContext } from '../../typescript/react.js';
import '@apollo/client';
import '@apollo/experimental-nextjs-app-support';

declare const LoadingContext: react.Context<I_LoadingContext | undefined>;

export { LoadingContext };
