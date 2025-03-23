declare const validate: {
    common: {
        isEmpty(value: unknown): boolean;
        isEmptyValidator<T>(): (this: T, value: unknown) => Promise<boolean>;
        isUniqueValidator<T extends {
            constructor: {
                findOne: (query: Record<string, unknown>) => Promise<unknown>;
            };
        }>(fields: string[]): (this: T, value: unknown) => Promise<boolean>;
        matchesRegexValidator(regexArray: RegExp[]): (value: string) => Promise<boolean>;
    };
};

export { validate };
