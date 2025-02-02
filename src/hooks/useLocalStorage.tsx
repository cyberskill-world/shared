import { useEffect, useState } from 'react';

import { localStorage } from '../utils/index.js';

export function useLocalStorage<T>(key: string, initialValue: T) {
    const [storedValue, setStoredValue] = useState<T>(initialValue);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        let isMounted = true;

        const loadValue = async () => {
            const value = await localStorage.get<T>(key);

            if (!isMounted)
                return;

            if (value !== null) {
                setStoredValue(value);
            }
            else {
                await localStorage.set(key, initialValue);
                setStoredValue(initialValue);
            }
            setIsLoaded(true);
        };

        loadValue();

        return () => {
            isMounted = false;
            setIsLoaded(false);
        };
    }, [key, initialValue]);

    useEffect(() => {
        if (!isLoaded)
            return;

        const saveValue = async () => {
            await localStorage.set(key, storedValue);
        };

        saveValue();
    }, [storedValue, key, isLoaded]);

    return [storedValue, setStoredValue] as const;
}
