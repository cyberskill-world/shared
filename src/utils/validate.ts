export const validate = {
    common: {
        isEmpty(value: unknown): boolean {
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
        isEmptyValidator<T>(): (this: T, value: unknown) => Promise<boolean> {
            return async function (this: T, value: unknown): Promise<boolean> {
                return !validate.common.isEmpty(value);
            };
        },
        isUniqueValidator<T extends { constructor: { findOne: (query: Record<string, unknown>) => Promise<unknown> } }>(fields: string[]) {
            return async function (this: T, value: unknown): Promise<boolean> {
                if (!Array.isArray(fields) || fields.length === 0) {
                    throw new Error('Fields must be a non-empty array of strings.');
                }

                const query = { $or: fields.map(field => ({ [field]: value })) };
                const existingDocument = await this.constructor.findOne(query);

                return !existingDocument;
            };
        },
        matchesRegexValidator(regexArray: RegExp[]): (value: string) => Promise<boolean> {
            return async function (value: string): Promise<boolean> {
                if (!Array.isArray(regexArray) || regexArray.some(r => !(r instanceof RegExp))) {
                    throw new Error('regexArray must be an array of valid RegExp objects.');
                }

                return regexArray.every(regex => regex.test(value));
            };
        },
    },
};
