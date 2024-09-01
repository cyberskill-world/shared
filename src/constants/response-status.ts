export const RESPONSE_STATUS = {
    GRAPHQL_PARSE_FAILED: {
        CODE: 'GRAPHQL_PARSE_FAILED',
        MESSAGE: 'The GraphQL operation string contains a syntax error.',
    },
    GRAPHQL_VALIDATION_FAILED: {
        CODE: 'GRAPHQL_VALIDATION_FAILED',
        MESSAGE: `The GraphQL operation is not valid against the server's schema.`,
    },
    BAD_USER_INPUT: {
        CODE: 'BAD_USER_INPUT',
        MESSAGE:
            'The GraphQL operation includes an invalid value for a field argument.',
    },
    PERSISTED_QUERY_NOT_FOUND: {
        CODE: 'PERSISTED_QUERY_NOT_FOUND',
        MESSAGE:
            'A client sent the hash of a query string to execute via automatic persisted queries, but the query was not in the APQ cache.',
    },
    PERSISTED_QUERY_NOT_SUPPORTED: {
        CODE: 'PERSISTED_QUERY_NOT_SUPPORTED',
        MESSAGE:
            'A client sent the hash of a query string to execute via automatic persisted queries, but the server has disabled APQ.',
    },
    OPERATION_RESOLUTION_FAILURE: {
        CODE: 'OPERATION_RESOLUTION_FAILURE',
        MESSAGE: `The request was parsed successfully and is valid against the server's schema, but the server couldn't resolve which operation to run. This occurs when a request containing multiple named operations doesn't specify which operation to run (i.e.,operationName), or if the named operation isn't included in the request.`,
    },
    CONTINUE: {
        CODE: 100,
        MESSAGE: 'Continue',
    },
    SWITCHING_PROTOCOLS: {
        CODE: 101,
        MESSAGE: 'Switching Protocols',
    },
    PROCESSING: {
        CODE: 102,
        MESSAGE: 'Processing',
    },
    OK: {
        CODE: 200,
        MESSAGE: 'OK',
    },
    CREATED: {
        CODE: 201,
        MESSAGE: 'Created',
    },
    ACCEPTED: {
        CODE: 202,
        MESSAGE: 'Accepted',
    },
    NON_AUTHORITATIVE_INFORMATION: {
        CODE: 203,
        MESSAGE: 'Non Authoritative Information',
    },
    NO_CONTENT: {
        CODE: 204,
        MESSAGE: 'No Content',
    },
    RESET_CONTENT: {
        CODE: 205,
        MESSAGE: 'Reset Content',
    },
    PARTIAL_CONTENT: {
        CODE: 206,
        MESSAGE: 'Partial Content',
    },
    MULTI_STATUS: {
        CODE: 207,
        MESSAGE: 'Multi-Status',
    },
    MULTIPLE_CHOICES: {
        CODE: 300,
        MESSAGE: 'Multiple Choices',
    },
    MOVED_PERMANENTLY: {
        CODE: 301,
        MESSAGE: 'Moved Permanently',
    },
    MOVED_TEMPORARILY: {
        CODE: 302,
        MESSAGE: 'Moved Temporarily',
    },
    SEE_OTHER: {
        CODE: 303,
        MESSAGE: 'See Other',
    },
    NOT_MODIFIED: {
        CODE: 304,
        MESSAGE: 'Not Modified',
    },
    USE_PROXY: {
        CODE: 305,
        MESSAGE: 'Use Proxy',
    },
    TEMPORARY_REDIRECT: {
        CODE: 307,
        MESSAGE: 'Temporary Redirect',
    },
    PERMANENT_REDIRECT: {
        CODE: 308,
        MESSAGE: 'Permanent Redirect',
    },
    BAD_REQUEST: {
        CODE: 400,
        MESSAGE: 'Bad Request',
    },
    UNAUTHORIZED: {
        CODE: 401,
        MESSAGE: 'Unauthorized',
    },
    PAYMENT_REQUIRED: {
        CODE: 402,
        MESSAGE: 'Payment Required',
    },
    FORBIDDEN: {
        CODE: 403,
        MESSAGE: 'Forbidden',
    },
    NOT_FOUND: {
        CODE: 404,
        MESSAGE: 'Not Found',
    },
    METHOD_NOT_ALLOWED: {
        CODE: 405,
        MESSAGE: 'Method Not Allowed',
    },
    NOT_ACCEPTABLE: {
        CODE: 406,
        MESSAGE: 'Not Acceptable',
    },
    PROXY_AUTHENTICATION_REQUIRED: {
        CODE: 407,
        MESSAGE: 'Proxy Authentication Required',
    },
    REQUEST_TIMEOUT: {
        CODE: 408,
        MESSAGE: 'Request Timeout',
    },
    CONFLICT: {
        CODE: 409,
        MESSAGE: 'Conflict',
    },
    GONE: {
        CODE: 410,
        MESSAGE: 'Gone',
    },
    LENGTH_REQUIRED: {
        CODE: 411,
        MESSAGE: 'Length Required',
    },
    PRECONDITION_FAILED: {
        CODE: 412,
        MESSAGE: 'Precondition Failed',
    },
    REQUEST_TOO_LONG: {
        CODE: 413,
        MESSAGE: 'Request Entity Too Large',
    },
    REQUEST_URI_TOO_LONG: {
        CODE: 414,
        MESSAGE: 'Request-URI Too Long',
    },
    UNSUPPORTED_MEDIA_TYPE: {
        CODE: 415,
        MESSAGE: 'Unsupported Media Type',
    },
    REQUESTED_RANGE_NOT_SATISFIABLE: {
        CODE: 416,
        MESSAGE: 'Requested Range Not Satisfiable',
    },
    EXPECTATION_FAILED: {
        CODE: 417,
        MESSAGE: 'Expectation Failed',
    },
    IM_A_TEAPOT: {
        CODE: 418,
        MESSAGE: "I'm a teapot",
    },
    INSUFFICIENT_SPACE_ON_RESOURCE: {
        CODE: 419,
        MESSAGE: 'Insufficient Space on Resource',
    },
    METHOD_FAILURE: {
        CODE: 420,
        MESSAGE: 'Method Failure',
    },
    MISDIRECTED_REQUEST: {
        CODE: 421,
        MESSAGE: 'Misdirected Request',
    },
    UNPROCESSABLE_ENTITY: {
        CODE: 422,
        MESSAGE: 'Unprocessable Entity',
    },
    LOCKED: {
        CODE: 423,
        MESSAGE: 'Locked',
    },
    FAILED_DEPENDENCY: {
        CODE: 424,
        MESSAGE: 'Failed Dependency',
    },
    PRECONDITION_REQUIRED: {
        CODE: 428,
        MESSAGE: 'Precondition Required',
    },
    TOO_MANY_REQUESTS: {
        CODE: 429,
        MESSAGE: 'Too Many Requests',
    },
    REQUEST_HEADER_FIELDS_TOO_LARGE: {
        CODE: 431,
        MESSAGE: 'Request Header Fields Too Large',
    },
    UNAVAILABLE_FOR_LEGAL_REASONS: {
        CODE: 451,
        MESSAGE: 'Unavailable For Legal Reasons',
    },
    INTERNAL_SERVER_ERROR: {
        CODE: 500,
        MESSAGE: 'Internal Server Error',
    },
    NOT_IMPLEMENTED: {
        CODE: 501,
        MESSAGE: 'Not Implemented',
    },
    BAD_GATEWAY: {
        CODE: 502,
        MESSAGE: 'Bad Gateway',
    },
    SERVICE_UNAVAILABLE: {
        CODE: 503,
        MESSAGE: 'Service Unavailable',
    },
    GATEWAY_TIMEOUT: {
        CODE: 504,
        MESSAGE: 'Gateway Timeout',
    },
    HTTP_VERSION_NOT_SUPPORTED: {
        CODE: 505,
        MESSAGE: 'HTTP Version Not Supported',
    },
    INSUFFICIENT_STORAGE: {
        CODE: 507,
        MESSAGE: 'Insufficient Storage',
    },
    NETWORK_AUTHENTICATION_REQUIRED: {
        CODE: 511,
        MESSAGE: 'Network Authentication Required',
    },
};
