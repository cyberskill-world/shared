import * as react_jsx_runtime from 'react/jsx-runtime';

interface I_LoadingProps {
    full?: boolean;
    block?: boolean;
    className?: string;
    message?: string;
}
declare function Loading({ full, block, className, message, ...rest }: I_LoadingProps): react_jsx_runtime.JSX.Element;

export { type I_LoadingProps, Loading };
