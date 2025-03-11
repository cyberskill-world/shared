import { I_ErrorEntry } from '../typescript/command.cjs';

/**
 * Save the entire error list to local storage.
 * @param errorList Array of I_ErrorEntry objects.
 */
declare function saveErrorListToStorage(errorList: I_ErrorEntry[]): Promise<void>;
/**
 * Get all stored error lists.
 * @returns An array of stored error objects.
 */
declare function getStoredErrorLists(): Promise<I_ErrorEntry[]>;
/**
 * Clear expired error lists from storage.
 */
declare function clearExpiredErrorLists(): Promise<void>;

export { clearExpiredErrorLists, getStoredErrorLists, saveErrorListToStorage };
