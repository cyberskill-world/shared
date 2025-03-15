import { format } from 'date-fns';

export function getMongoDateTime(): string {
    const now = new Date();

    return format(now, 'yyyy-MM-dd HH:mm:ss.SSS');
}
