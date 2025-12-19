import { describe, expect, it, vi } from 'vitest';

import type { I_ExtendedModel } from './mongo.type.js';

import { MongooseController } from './mongo.util.js';

describe('MongooseController', () => {
    describe('createUniqueSlug', () => {
        it('should append incremental number if slug exists', async () => {
            const mockExists = vi.fn()
                .mockResolvedValueOnce({ _id: '1' }) // base exists
                .mockResolvedValueOnce({ _id: '2' }) // -1 exists
                .mockResolvedValue(null); // -2 available

            const mockModel = {
                modelName: 'TestModel',
                exists: mockExists,
            } as unknown as I_ExtendedModel<any>;

            const controller = new MongooseController(mockModel);

            const result = await controller.createUniqueSlug({
                slug: 'hello-world',
                field: 'slug',
                isObject: false,
            });

            expect(result).toBe('hello-world-2');
            expect(mockExists).toHaveBeenCalledTimes(3);
        });
    });
});
