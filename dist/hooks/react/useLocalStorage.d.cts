import { Serializer } from '../../typescript/serializer.cjs';

declare function useLocalStorage<T>(key: string, initialValue: T, serializer?: Serializer<T>): readonly [T, (value: T | ((val: T) => T)) => Promise<void>];

export { useLocalStorage };
