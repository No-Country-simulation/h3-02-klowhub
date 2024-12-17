import { atom, type WritableAtom } from 'jotai';

function getFromLocalStorage<T>(key: string, defaultValue: T): T {
  if (typeof window === 'undefined') {
    return defaultValue;
  }

  try {
    const storedValue = localStorage.getItem(key);
    return storedValue !== null ? (JSON.parse(storedValue) as T) : defaultValue;
  } catch (error) {
    console.error(`Error reading from localStorage (key: ${key}):`, error);
    return defaultValue;
  }
}

function setToLocalStorage<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error writing to localStorage (key: ${key}):`, error);
  }
}

export function atomWithPersistence<T = unknown>(
  key: string,
  defaultValue: T
): WritableAtom<T, [T | ((prev: T) => T)], void> {
  const baseAtom = atom<{ value: T; initialized: boolean }>({
    value: defaultValue,
    initialized: false,
  });

  const persistentAtom = atom(
    get => {
      const state = get(baseAtom);
      if (!state.initialized && typeof window !== 'undefined') {
        const stored = getFromLocalStorage(key, defaultValue);
        return { ...state, value: stored, initialized: true };
      }
      return state;
    },
    (get, set, update: T | ((prev: T) => T)) => {
      const current = get(baseAtom).value;
      const newValue = typeof update === 'function' ? (update as (prev: T) => T)(current) : update;

      set(baseAtom, { value: newValue, initialized: true });
      setToLocalStorage(key, newValue);
    }
  );

  return atom(
    get => get(persistentAtom).value,
    (get, set, update) => set(persistentAtom, update)
  );
}
