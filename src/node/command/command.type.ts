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

export interface I_CommandContext {
    isCurrentProject: boolean;
}

export interface I_Command { raw: boolean; cmd: string }

export type T_CommandFunction = (context?: I_CommandContext) => string;

export type T_Command
    = | string
        | I_Command
        | T_CommandFunction;

export type T_CommandMap = Record<string, T_Command>;

export type T_CommandMapInput = T_CommandMap | ((ctx: I_CommandContext) => T_CommandMap);

export enum E_CommandType {
    CLI = 'CLI',
    STRING = 'STRING',
    FUNCTION = 'FUNCTION',
}
