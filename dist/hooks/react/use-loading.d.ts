import { I_LoadingContext } from '../../typescript/react.js';
import '@apollo/client';
import '@apollo/experimental-nextjs-app-support';
import 'react';

declare function useLoading(): I_LoadingContext;

export { useLoading };
