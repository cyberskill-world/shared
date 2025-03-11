import { T_ThrowResponseArgs } from '../typescript/log.cjs';

declare function throwResponse({ message, status, type, }: T_ThrowResponseArgs): never;

export { throwResponse };
