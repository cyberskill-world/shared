import * as react_jsx_runtime from 'react/jsx-runtime';
import * as use_intl from 'use-intl';
import * as react from 'react';
import { ComponentType } from 'react';
import { I_NextIntlContextType, I_NextIntlLanguage, T_NextIntlMessageList } from '../typescript/next-intl.js';
import { T_Children } from '../typescript/react.js';
import 'date-fns';
import 'next-intl';

declare const NextIntlContext: react.Context<I_NextIntlContextType | undefined>;
declare function useNextIntl(): I_NextIntlContextType;
declare const useTranslateNextIntl: typeof use_intl.useTranslations;
declare function withNextIntl<T extends {
    children: T_Children;
}>(Component: ComponentType<T>): {
    (props: T & {
        languages: I_NextIntlLanguage[];
        messages: T_NextIntlMessageList;
    }): react_jsx_runtime.JSX.Element | null;
    displayName: string;
};
declare function NextIntlProvider({ children, languages, messages, }: {
    children: T_Children;
    languages: I_NextIntlLanguage[];
    messages: T_NextIntlMessageList;
}): react_jsx_runtime.JSX.Element;

export { NextIntlContext, NextIntlProvider, useNextIntl, useTranslateNextIntl, withNextIntl };
