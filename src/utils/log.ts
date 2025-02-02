import { GraphQLError } from 'graphql';

import type { T_ThrowResponseArgs } from '../typescript/index.js';

import { RESPONSE_STATUS } from '../constants/index.js';

export function throwResponse({
    message,
    status = RESPONSE_STATUS.INTERNAL_SERVER_ERROR,
    type = 'graphql',
}: T_ThrowResponseArgs): never {
    const responseMessage
        = message ?? status.MESSAGE ?? 'Internal server error';

    if (type === 'graphql') {
        throw new GraphQLError(responseMessage, {
            extensions: { code: status.CODE },
        });
    }

    else {
        throw new Error(responseMessage);
    }
}
