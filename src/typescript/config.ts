export interface I_Config {
    [key: string]: string | number | boolean | I_Config | I_Config[];
}
