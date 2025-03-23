import { I_Serializer } from '../typescript/serializer.js';

declare function useStorage<T>(key: string, initialValue: T, serializer?: I_Serializer<T>): readonly [T, (value: T | ((val: T) => T)) => void];

export { useStorage };
