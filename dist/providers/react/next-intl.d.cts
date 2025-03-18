import * as react_jsx_runtime from 'react/jsx-runtime';
import { I_NextIntlLanguage, T_NextIntlMessageList } from '../../typescript/next-intl.cjs';
import { T_Children } from '../../typescript/react.cjs';
import 'date-fns';
import 'next-intl';
import '@apollo/client';
import 'react';

declare function NextIntlProvider({ children, languages, messages, }: {
    children: T_Children;
    languages: I_NextIntlLanguage[];
    messages: T_NextIntlMessageList;
}): react_jsx_runtime.JSX.Element;

export { NextIntlProvider };
