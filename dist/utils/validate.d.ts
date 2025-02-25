declare const validate: {
    common: {
        /**
         * Check if a value is empty (null, undefined, empty string, empty array, or empty object).
         * @param {unknown} value - The value to check.
         * @returns {boolean} - True if the value is empty; otherwise, false.
         */
        isEmpty(value: unknown): boolean;
        /**
         * Validator to check if a value is not empty.
         * @returns {(value: unknown) => Promise<boolean>} - The validation function.
         */
        isEmptyValidator<T>(): (this: T, value: unknown) => Promise<boolean>;
        /**
         * Validator to check if a value is unique in specified fields.
         * @param {string[]} fields - Fields to check for uniqueness.
         * @returns {(value: unknown) => Promise<boolean>} - The validation function.
         */
        isUniqueValidator<T extends {
            constructor: {
                findOne: (query: Record<string, unknown>) => Promise<unknown>;
            };
        }>(fields: string[]): (this: T, value: unknown) => Promise<boolean>;
        /**
         * Validator to check if a value matches all regex patterns in an array.
         * @param {RegExp[]} regexArray - Array of regex patterns.
         * @returns {(value: string) => Promise<boolean>} - The validation function.
         */
        matchesRegexValidator(regexArray: RegExp[]): (value: string) => Promise<boolean>;
    };
};

export { validate };
