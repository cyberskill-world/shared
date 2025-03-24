import { useCallback, useEffect, useState } from 'react';

import type { I_Serializer } from '#typescript/serializer.js';

import { serializer as defaultSerializer } from '#utils/serializer.js';
import { storageClient } from '#utils/storage-client.js';

export function useStorage<T>(
    key: string,
    initialValue: T,
    serializer: I_Serializer<T> = defaultSerializer as I_Serializer<T>,
) {
    const [storedValue, setStoredValue] = useState<T>(initialValue);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        let isMounted = true;

        const loadValue = async () => {
            try {
                const value = await storageClient.get<string>(key);

                if (isMounted) {
                    if (value !== null) {
                        const parsedValue = serializer.deserialize(value);
                        setStoredValue(parsedValue);
                    }
                    else {
                        const serialized = serializer.serialize(initialValue);
                        await storageClient.set(key, serialized);
                        setStoredValue(initialValue);
                    }
                }
            }
            catch (error) {
                console.error(`Error loading value for key "${key}":`, error);

                if (isMounted) {
                    setStoredValue(initialValue);
                }
            }
            finally {
                if (isMounted)
                    setIsLoaded(true);
            }
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
                const serialized = serializer.serialize(storedValue);
                await storageClient.set(key, serialized);
            }
            catch (error) {
                console.error(`Error saving value for key "${key}":`, error);
            }
        };

        saveValue();
    }, [storedValue, key, serializer, isLoaded]);

    const setValue = useCallback(
        (value: T | ((val: T) => T)) => {
            setStoredValue(prev =>
                typeof value === 'function' ? (value as (val: T) => T)(prev) : value,
            );
        },
        [],
    );

    return [storedValue, setValue] as const;
}
