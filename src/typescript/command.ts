export enum E_SpinnerMessage {
    LintCheck = 'Running lint checks...',
    LintFix = 'Fixing issues...',
    Setup = 'Setting up...',
    Reset = 'Resetting...',
    Success = ' completed successfully!',
    Fail = ' failed.',
}

export enum E_ErrorType {
    Error = 'error',
    Warning = 'warning',
}

export interface I_ErrorEntry {
    file: string;
    position: string;
    message: string;
    type: E_ErrorType;
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
