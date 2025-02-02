export interface T_Config {
    [key: string]: string | number | boolean | T_Config | T_Config[];
}