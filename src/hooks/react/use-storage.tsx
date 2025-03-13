import { useCallback, useEffect, useState } from 'react';

import type { I_Serializer } from '../../typescript/serializer.js';

import { storage } from '../../utils/index.js';
import { serializer as defaultSerializer } from '../../utils/serializer.js';

export function useStorage<T>(
    key: string,
    initialValue: T,
    serializer: I_Serializer<T> = defaultSerializer, // ✅ Accept custom serializer
) {
    const [storedValue, setStoredValue] = useState<T>(initialValue);
    const [isLoaded, setIsLoaded] = useState(false);

    // ✅ Load initial value from storage
    useEffect(() => {
        let isMounted = true;

        const loadValue = async () => {
            try {
                const value = await storage.get<string>(key);

                if (isMounted) {
                    if (value !== null) {
                        // ✅ Use custom serializer if provided
                        const parsedValue = serializer.deserialize(value);
                        setStoredValue(parsedValue);
                    }
                    else {
                        // ✅ If no stored value, store initial value using serializer
                        const serialized = serializer.serialize(initialValue);
                        await storage.set(key, serialized);
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
    }, [key, initialValue, serializer]); // ✅ Include serializer in dependency array

    // ✅ Save value to storage when it changes
    useEffect(() => {
        if (!isLoaded) {
            return;
        }

        const saveValue = async () => {
            try {
                // ✅ Use custom serializer when saving
                const serialized = serializer.serialize(storedValue);
                await storage.set(key, serialized);
            }
            catch (error) {
                console.error(`Error saving value for key "${key}":`, error);
            }
        };

        saveValue();
    }, [storedValue, key, serializer, isLoaded]);

    // ✅ Set value with functional update support
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
