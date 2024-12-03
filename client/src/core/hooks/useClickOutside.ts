import { type RefObject, useEffect } from 'react';

const useClickOutside = (
  ref: RefObject<HTMLElement>,
  handler: () => void,
  ignoreRef?: RefObject<HTMLElement>
) => {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      event.stopPropagation();

      const element = event.target as Node;
      const isClickedOutsideRef = ref.current && !ref.current.contains(element);
      const isClickedOutsideIgnoreRef =
        !ignoreRef || !ignoreRef.current || !ignoreRef.current.contains(element);
      if (isClickedOutsideRef && isClickedOutsideIgnoreRef) handler();
    };

    document.addEventListener('pointerdown', listener);
    return () => {
      document.removeEventListener('pointerdown', listener);
    };
  }, [ref, ignoreRef, handler]);
};

export default useClickOutside;
