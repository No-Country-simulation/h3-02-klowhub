/* eslint-disable @typescript-eslint/no-explicit-any */
import { atom, type WritableAtom } from 'jotai';

export function getFromLocalStorage<T = unknown>(key: string, defaultValue: T): T {
  try {
    const storedValue = localStorage.getItem(key);
    return storedValue !== null ? (JSON.parse(storedValue) as T) : defaultValue;
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return defaultValue;
  }
}

export function setToLocalStorage<T = unknown>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Error writing to localStorage:', error);
  }
}

const baseAtom = atom<any>(null);

export function atomWithPersistence<T = unknown>(
  key: string,
  defaultValue: T
): WritableAtom<T, [Partial<T> | ((prev: T) => T)], void> {
  return atom(
    get => {
      const stored = getFromLocalStorage(key, defaultValue);
      return stored;
    },
    (get, set, update: Partial<T> | ((prev: T) => T)) => {
      const currentValue = get(baseAtom);

      const newValue =
        typeof update === 'function'
          ? (update as (prev: T) => T)(currentValue)
          : { ...currentValue, ...update };

      set(baseAtom, newValue);
      setToLocalStorage(key, newValue);
    }
  );
}
