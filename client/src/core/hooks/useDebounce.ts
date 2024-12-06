import { useEffect, useMemo, useRef } from 'react';
import { debounce } from '@core/services/debounce';

export function useDebounce<Callback extends (...args: Array<unknown>) => unknown>(
  callback: Callback,
  delay: number
) {
  const ref = useRef<Callback>();

  useEffect(() => {
    ref.current = callback;
  }, [callback]);

  return useMemo(() => {
    const func = (...args: Array<unknown>) => ref.current?.(...args);

    return debounce(func, delay);
  }, [delay]);
}
