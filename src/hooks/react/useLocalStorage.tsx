import { useCallback, useEffect, useState } from 'react';

import type { Serializer } from '../../typescript/index.js';

import { serializer as defaultSerializer, localStorage } from '../../utils/index.js';

export function useLocalStorage<T>(
    key: string,
    initialValue: T,
    serializer: Serializer<T> = defaultSerializer,
) {
    const [storedValue, setStoredValue] = useState<T>(initialValue);
    const [isLoaded, setIsLoaded] = useState(false);

    const setValue = useCallback(async (value: T | ((val: T) => T)) => {
        if (typeof value === 'function') {
            const valueToStore = (value as (val: T) => T)(storedValue);
            setStoredValue(valueToStore);
        }
        else {
            setStoredValue(value);
        }
    }, [storedValue]);

    useEffect(() => {
        let isMounted = true;

        const loadValue = async () => {
            try {
                const serializedValue = await localStorage.get<string>(key);

                if (!isMounted) {
                    return;
                }

                if (serializedValue !== null) {
                    const parsedValue = serializer.deserialize(serializedValue);
                    setStoredValue(parsedValue);
                }
                else {
                    const initialSerialized = serializer.serialize(initialValue);
                    await localStorage.set(key, initialSerialized);
                    setStoredValue(initialValue);
                }
            }
            catch (error) {
                console.error('Error loading value:', error);

                if (isMounted) {
                    setStoredValue(initialValue);
                }
            }
            setIsLoaded(true);
        };

        loadValue();

        return () => {
            isMounted = false;
            setIsLoaded(false);
        };
    }, [key, initialValue, serializer]);

    useEffect(() => {
        if (!isLoaded) {
            return;
        }

        const saveValue = async () => {
            try {
                const serializedValue = serializer.serialize(storedValue);
                await localStorage.set(key, serializedValue);
            }
            catch (error) {
                console.error('Error saving value:', error);
            }
        };

        saveValue();
    }, [storedValue, key, serializer, isLoaded]);

    return [storedValue, setValue] as const;
}
