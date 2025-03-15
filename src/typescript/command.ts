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
