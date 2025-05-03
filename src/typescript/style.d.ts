declare module '*.module.css' {
    const style: { [className: string]: string };

    export default style;
}
declare module '*.css' { };

declare module '*.module.scss' {
    const style: { [className: string]: string };

    export default style;
}
declare module '*.scss' { };
