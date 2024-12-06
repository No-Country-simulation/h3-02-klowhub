import { useCallback, useEffect, useRef } from 'react';

type AcceptCallback = () => void;

const useTimeout = (callback: AcceptCallback, delay: number) => {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const clear = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = undefined;
  }, [timeoutRef]);

  const notify = useCallback(() => {
    clear();
    if (timeoutRef.current === undefined) {
      timeoutRef.current = setTimeout(() => callback(), delay);
    }
  }, [timeoutRef, callback, delay]);

  useEffect(() => {
    return clear;
  }, [clear]);

  return { clear, notify };
};
export default useTimeout;
