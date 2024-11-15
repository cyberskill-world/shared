export const validate = {
    common: {
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

        isEmptyValidator() {
            return async function (this, value) {
                return !validate.common.isEmpty(value);
            };
        },

        isUniqueValidator(fields) {
            return async function (this, value) {
                const query = {
                    $or: fields.map(field => ({ [field]: value })),
                };

                const existingDocument = await this.constructor.findOne(query);

                return !existingDocument;
            };
        },

        matchesRegexValidator(regexArray) {
            return async function (this, value) {
                if (!Array.isArray(regexArray) || regexArray.some(r => !(r instanceof RegExp))) {
                    throw new Error('The provided regexArray must be an array of valid RegExp objects.');
                }

                return regexArray.every(regex => regex.test(value));
            };
        },
    },
};
