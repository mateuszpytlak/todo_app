import { useState, useEffect } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((val: T) => T)) => void] {
    // Funkcja do pobrania wartości z localStorage z obsługą błędów
    const readValue = (): T => {
        if (typeof window === 'undefined') {
            return initialValue;
        }

        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.warn(`Błąd podczas odczytu localStorage klucza "${key}":`, error);
            return initialValue;
        }
    };

    // Stan i zapisywanie w localStorage
    const [storedValue, setStoredValue] = useState<T>(readValue);

    // Funkcja do aktualizacji wartości i zapisu do localStorage
    const setValue = (value: T | ((val: T) => T)): void => {
        try {
            // Pozwala na użycie funkcji jak w useState
            const valueToStore = value instanceof Function ? value(storedValue) : value;

            // Zapisujemy do stanu React
            setStoredValue(valueToStore);

            // Zapisujemy do localStorage
            if (typeof window !== 'undefined') {
                window.localStorage.setItem(key, JSON.stringify(valueToStore));
            }
        } catch (error) {
            console.warn(`Błąd podczas zapisu do localStorage klucza "${key}":`, error);
        }
    };

    // Synchornizacja między różnymi instancjami komponentu
    useEffect(() => {
        const handleStorageChange = (event: StorageEvent) => {
            if (event.key === key && event.newValue) {
                setStoredValue(JSON.parse(event.newValue));
            }
        };

        // Nasłuchujemy zmian localStorage
        window.addEventListener('storage', handleStorageChange);

        // Czyszczenie
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, [key]);

    return [storedValue, setValue];
}
