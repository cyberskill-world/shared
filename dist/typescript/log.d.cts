interface T_ThrowResponseArgs {
    message?: string;
    status?: {
        CODE: string | number;
        MESSAGE: string;
    };
    type?: 'graphql' | 'rest';
}

export type { T_ThrowResponseArgs };
