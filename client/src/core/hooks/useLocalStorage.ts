'use client';

import { useCallback, useEffect, useState } from 'react';

export function useLocalStorage<T>(
  key: string,
  initialValue?: T
): [T, (value: T | ((prev: T) => T)) => void] {
  const readFromLocalStorage = useCallback((): T => {
    if (typeof window === 'undefined') {
      return initialValue as T;
    }

    try {
      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : (initialValue as T);
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue as T;
    }
  }, [key]);

  const [storedValue, setStoredValue] = useState<T>(() => readFromLocalStorage());

  useEffect(() => {
    setStoredValue(readFromLocalStorage());
  }, [key]);

  const setValue = (value: T | ((prev: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;

      setStoredValue(valueToStore);

      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue] as const;
}
