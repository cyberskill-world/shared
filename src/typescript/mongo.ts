import type {
    DeleteResult,
    Filter,
    InsertManyResult,
    InsertOneResult,
    OptionalUnlessRequiredId,
    UpdateResult,
    WithId,
} from 'mongodb';

import { Db } from 'mongodb';

export class C_Db extends Db { }

export type T_Filter<T> = Filter<T>;

export type T_InsertOneResult<T> = InsertOneResult<T>;

export type T_InsertManyResult<T> = InsertManyResult<T>;

export type T_UpdateResult = UpdateResult;

export type T_DeleteResult = DeleteResult;

export type T_WithId<T> = WithId<T>;

export type T_OptionalUnlessRequiredId<T> = OptionalUnlessRequiredId<T>;
