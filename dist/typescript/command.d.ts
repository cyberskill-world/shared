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
interface I_BoxedLogOptions {
    color?: string;
    padding?: number;
    margin?: number;
    borderStyle?: 'round' | 'single' | 'double' | 'bold';
    titleColor?: string;
}

export { E_ErrorType, type I_BoxedLogOptions, type I_ErrorEntry, type I_EslintError };
