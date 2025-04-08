export const validate = {
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
};
