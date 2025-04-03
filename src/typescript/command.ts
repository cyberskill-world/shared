export enum E_ErrorType {
    Error = 'error',
    Warning = 'warning',
}

export interface I_ErrorEntry {
    type: E_ErrorType;
    file: string;
    message: string;
    position?: string;
    rule?: string;
}

export interface I_EslintError {
    filePath: string;
    messages: Array<{
        line: number;
        column: number;
        severity: number;
        message: string;
        ruleId: string;
    }>;
}

export interface I_BoxedLogOptions {
    color?: string;
    padding?: number;
    margin?: number;
    borderStyle?: 'round' | 'single' | 'double' | 'bold';
    titleColor?: string;
}

export interface I_CommandContext {
    isRemote: boolean;
    isCurrentProject: boolean;
}

export interface I_Command { raw: boolean; cmd: string }

export type T_CommandFunction = (context?: I_CommandContext) => string;

export type T_Command =
    | string
    | I_Command
    | T_CommandFunction;

export type T_CommandMap = Record<string, T_Command>;

export type T_CommandMapInput = T_CommandMap | ((ctx: I_CommandContext) => T_CommandMap);

export enum E_CommandType  {
    PNPM_ADD_AND_EXEC = 'pnpmAddAndExec',
    PNPM_EXEC = 'pnpmExec',
    RAW = 'raw',
}
