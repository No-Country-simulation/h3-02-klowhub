/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback } from 'react';
import useToggle from './useTogle';

export const useEmojis = (insertCallback: (emojiData: any) => void) => {
  const [showEmoji, toggle] = useToggle(false);

  const addEmoji = useCallback(
    (emojiData: any) => {
      insertCallback(emojiData.emoji);
      toggle();
    },
    [insertCallback, showEmoji]
  );

  return [showEmoji, toggle, addEmoji] as const;
};
