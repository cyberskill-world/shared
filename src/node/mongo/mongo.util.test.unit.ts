import { describe, expect, it } from 'vitest';

import { mongo } from './mongo.util.js';

describe('mongo', () => {
    describe('createGenericFields', () => {
        it('should create generic fields with id, isDel, createdAt, updatedAt', () => {
            const fields = mongo.createGenericFields();
            expect(fields).toHaveProperty('id');
            expect(fields).toHaveProperty('isDel', false);
            expect(fields).toHaveProperty('createdAt');
            expect(fields).toHaveProperty('updatedAt');
            expect(fields.createdAt).toBeInstanceOf(Date);
            expect(fields.updatedAt).toBeInstanceOf(Date);
        });
    });

    describe('regexify', () => {
        it('should convert string values to regex', () => {
            const filter = { name: 'test' };
            const result = mongo.regexify(filter, ['name']) as any;
            expect(result.name).toEqual({
                $regex: expect.stringContaining('t(e|è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ)st'),
                $options: 'i',
            });
        });

        it('should handle special characters in regex', () => {
            const filter = { name: 'test.1' };
            const result = mongo.regexify(filter, ['name']) as any;
            expect(result.name).toEqual({
                $regex: expect.stringContaining('t(e|è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ)st.1'),
                $options: 'i',
            });
        });

        it('should ignore fields not in the list', () => {
            const filter = { name: 'test', age: 10 };
            const result = mongo.regexify(filter, ['name']) as any;
            expect(result.age).toBe(10);
        });
    });
});
