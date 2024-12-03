import { useCallback, useEffect, useRef } from 'react';

type AcceptCallback = () => void;

const useTimeout = (callback: AcceptCallback, delay: number) => {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const savedCallback = useRef<AcceptCallback>(callback);
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  const clear = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, [timeoutRef.current]);

  const notify = useCallback(() => {
    clear();
    timeoutRef.current = setTimeout(() => savedCallback.current(), delay);
  }, [clear, delay]);

  useEffect(() => {
    return clear;
  }, [clear]);

  return { clear, notify };
};
export default useTimeout;
