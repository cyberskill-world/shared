declare enum E_SpinnerMessage {
    LintCheck = "Running lint checks...",
    LintFix = "Fixing issues...",
    LintStaged = "Running lint-staged...",
    CommitLint = "Running commitlint...",
    GitHook = "Setting up git hook...",
    Setup = "Setting up...",
    Reset = "Resetting...",
    UnitTest = "Running unit tests...",
    E2ETest = "Running end-to-end tests..."
}
declare enum E_ErrorType {
    Error = "error",
    Warning = "warning"
}
interface I_ErrorEntry {
    type: E_ErrorType;
    file: string;
    message: string;
    position?: string;
    rule?: string;
}
interface I_EslintError {
    filePath: string;
    messages: Array<{
        line: number;
        column: number;
        severity: number;
        message: string;
        ruleId: string;
    }>;
}

export { E_ErrorType, E_SpinnerMessage, type I_ErrorEntry, type I_EslintError };
