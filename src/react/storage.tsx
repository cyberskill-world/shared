import { useCallback, useEffect, useState } from 'react';

import type { I_Serializer } from '#typescript/serializer.js';

import { log } from '#utils/log.js';
import { serializer as defaultSerializer } from '#utils/serializer.js';
import { storageClient } from '#utils/storage-client.js';

export function useStorage<T>(
    key: string,
    initialValue?: T,
    serializer: I_Serializer<T> = defaultSerializer as I_Serializer<T>,
) {
    const [value, setValue] = useState<T | undefined>(initialValue);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        let isMounted = true;

        const loadValue = async () => {
            try {
                const valueFound = await storageClient.get<string>(key);

                if (isMounted) {
                    if (valueFound !== null) {
                        const parsedValue = serializer.deserialize(valueFound);
                        setValue(parsedValue);
                    }
                    else if (initialValue !== undefined) {
                        const serialized = serializer.serialize(initialValue);
                        await storageClient.set(key, serialized);
                        setValue(initialValue);
                    }
                    else {
                        setValue(undefined);
                    }
                }
            }
            catch (error) {
                log.error(`Error loading value for key "${key}":`, error);

                if (isMounted) {
                    setValue(initialValue);
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
        if (!isLoaded)
            return;

        const saveValue = async () => {
            try {
                if (value !== undefined) {
                    const serialized = serializer.serialize(value);
                    await storageClient.set(key, serialized);
                }
            }
            catch (error) {
                log.error(`Error saving value for key "${key}":`, error);
            }
        };

        saveValue();
    }, [value, key, serializer, isLoaded]);

    const set = useCallback(
        (newValue: T | ((val: T | undefined) => T)) => {
            setValue(prev =>
                typeof newValue === 'function' ? (newValue as (val: T | undefined) => T)(prev) : newValue,
            );
        },
        [],
    );

    const remove = useCallback(async () => {
        try {
            await storageClient.remove(key);
            setValue(undefined);
        }
        catch (error) {
            log.error(`Error removing key "${key}":`, error);
        }
    }, [key]);

    return { value, set, remove };
}
