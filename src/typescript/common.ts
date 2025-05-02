export type T_Object<T = unknown> = Record<string, T>;

export interface I_ReturnSuccess<T, E = unknown> {
    success: true;
    result: T & E;
    message?: string;
    code?: number | string;
}

export interface I_ReturnFailure {
    success: false;
    message: string;
    code: number | string;
}

export type I_Return<T = void, E = unknown> = I_ReturnSuccess<T, E> | I_ReturnFailure;
