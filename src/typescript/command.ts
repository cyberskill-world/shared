export enum E_SpinnerMessage {
    LintCheck = 'Running lint checks...',
    LintFix = 'Fixing issues...',
    LintStaged = 'Running lint-staged...',
    CommitLint = 'Running commitlint...',
    Setup = 'Setting up...',
    Reset = 'Resetting...',
    UnitTest = 'Running unit tests...',
    E2ETest = 'Running end-to-end tests...',
    Success = ' completed successfully!',
    Fail = ' failed.',
}

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


export interface I_SpinnerOptions {
    successMessage?: string;
    failureMessage?: string;
    errorList?: unknown[];
    exitOnError?: boolean;
}