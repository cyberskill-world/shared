import * as react_jsx_runtime from 'react/jsx-runtime';
import { ComponentType } from 'react';
import { I_NextIntlLanguage, T_NextIntlMessageList } from '../../typescript/next-intl.js';
import { T_Children } from '../../typescript/react.js';
import 'date-fns';
import 'next-intl';
import '@apollo/client';

declare function withNextIntl<T extends {
    children: T_Children;
}>(Component: ComponentType<T>): {
    (props: T & {
        languages: I_NextIntlLanguage[];
        messages: T_NextIntlMessageList;
    }): react_jsx_runtime.JSX.Element | null;
    displayName: string;
};

export { withNextIntl };
