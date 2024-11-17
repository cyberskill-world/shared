export const validate = {
    common: {
        /**
         * Check if a value is empty (null, undefined, empty string, empty array, or empty object).
         * @param {any} value - The value to check.
         * @returns {boolean} - True if the value is empty; otherwise, false.
         */
        isEmpty(value) {
            if (value === null || value === undefined) {
                return true;
            }

            if (Array.isArray(value)) {
                return value.length === 0;
            }

            if (typeof value === 'object') {
                if (value instanceof Date) {
                    return false;
                }
                return Object.keys(value).length === 0;
            }

            if (typeof value === 'string') {
                return value.trim().length === 0;
            }
            return false;
        },

        /**
         * Validator to check if a value is not empty.
         * @returns {Function} - The validation function.
         */
        isEmptyValidator() {
            return async function (this, value) {
                return !validate.common.isEmpty(value);
            };
        },

        /**
         * Validator to check if a value is unique in specified fields.
         * @param {string[]} fields - Fields to check for uniqueness.
         * @returns {Function} - The validation function.
         */
        isUniqueValidator(fields) {
            return async function (this, value) {
                if (!Array.isArray(fields) || fields.length === 0) {
                    throw new Error('Fields must be a non-empty array of strings.');
                }

                const query = { $or: fields.map(field => ({ [field]: value })) };
                const existingDocument = await this.constructor.findOne(query);

                return !existingDocument;
            };
        },

        /**
         * Validator to check if a value matches all regex patterns in an array.
         * @param {RegExp[]} regexArray - Array of regex patterns.
         * @returns {Function} - The validation function.
         */
        matchesRegexValidator(regexArray) {
            return async function (value) {
                if (!Array.isArray(regexArray) || regexArray.some(r => !(r instanceof RegExp))) {
                    throw new Error('regexArray must be an array of valid RegExp objects.');
                }

                return regexArray.every(regex => regex.test(value));
            };
        },
    },
};
