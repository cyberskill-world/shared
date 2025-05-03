export interface I_CatchErrorOptions {
    shouldLog?: boolean;
    returnValue?: unknown;
    callback?: (error: Error) => void;
}
