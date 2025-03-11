import { I_ErrorEntry } from '../typescript/command.js';

/**
 * Save the entire error list to storage.
 * @param errorList Array of I_ErrorEntry objects.
 */
declare function saveErrorListToStorage(errorList: I_ErrorEntry[]): Promise<void>;
/**
 * Get all stored error lists.
 * @returns An array of stored error objects.
 */
declare function getStoredErrorLists(): Promise<I_ErrorEntry[]>;
declare function clearAllErrorLists(): Promise<void>;

export { clearAllErrorLists, getStoredErrorLists, saveErrorListToStorage };
