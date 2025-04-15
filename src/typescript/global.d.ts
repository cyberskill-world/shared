declare module '*.module.css' {
    const classes: { [key: string]: string };

    export default classes;
}
declare module '*.css';

declare module '*.module.scss' {
    const classes: { [key: string]: string };

    export default classes;
}
declare module '*.scss';

declare namespace NodeJS {
    interface ProcessEnv {
        INIT_CWD: string;
        DEBUG: string;
        CYBERSKILL_STORAGE_DIR: string;
    }
}
