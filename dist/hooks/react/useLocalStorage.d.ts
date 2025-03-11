import { Serializer } from '../../typescript/serializer.js';

declare function useLocalStorage<T>(key: string, initialValue: T, serializer?: Serializer<T>): readonly [T, (value: T | ((val: T) => T)) => Promise<void>];

export { useLocalStorage };
