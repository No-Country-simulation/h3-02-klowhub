import { useCallback, useState } from 'react';

const useToggle = (initialValue: boolean) => {
  const [value, setValue] = useState<boolean>(initialValue);

  const toggle = useCallback(
    (nextValue?: boolean) => {
      if (typeof nextValue !== 'undefined') {
        setValue(!!nextValue);
        return;
      }

      setValue(newValue => !newValue);
    },
    [setValue]
  );

  return [value, toggle] as const;
};

export default useToggle;
