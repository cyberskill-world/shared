declare module '*.scss' {
    const classes: { [key: string]: string };

    export default classes;
}

declare namespace NodeJS {
    interface ProcessEnv {
        INIT_CWD: string;
        DEBUG: string;
        CYBERSKILL_STORAGE_DIR: string;
    }
}
