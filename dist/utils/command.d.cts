import { I_ErrorEntry, I_BoxedLogOptions } from '../typescript/command.cjs';

declare function printBoxedLog<T extends string | I_ErrorEntry[]>(title: string, content: T, { color, padding, margin, borderStyle, titleColor, }?: I_BoxedLogOptions): void;
declare const commandLog: {
    success: (message: string) => void;
    error: (message: string) => void;
    warning: (message: string) => void;
    info: (message: string) => void;
    printBoxedLog: typeof printBoxedLog;
};
declare function saveErrorListToStorage(errorList: I_ErrorEntry[]): Promise<void>;
declare function getStoredErrorLists(): Promise<I_ErrorEntry[]>;
declare function clearAllErrorLists(): Promise<void>;
declare function parseCommandOutput(output: string): void;
declare function executeCommand(command: string, parser?: typeof parseCommandOutput): Promise<void>;

export { clearAllErrorLists, commandLog, executeCommand, getStoredErrorLists, saveErrorListToStorage };
