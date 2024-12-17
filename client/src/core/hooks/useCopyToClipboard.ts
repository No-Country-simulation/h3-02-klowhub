import { useCallback } from 'react';
import { fallbackCopyTextToClipboard } from '@core/services/fallbackCopyTextToClipboard';
import { NODE_ENV } from "@/env.config";
import useRefMounted from './useRefMounted';
import useTimeout from './useTimeout';
import useToggle from './useTogle';

export const useCopyToClipboard = () => {
  const [success, toggleSuccess] = useToggle(false);
  const mounted = useRefMounted();
  const [error, toggleError] = useToggle(false);
  const { notify: notifySuccess } = useTimeout(() => toggleSuccess(), 2000);
  const { notify: notifyError } = useTimeout(() => toggleError(), 2000);

  const copyToClipboard = useCallback(
    (value: string) => {
      if (!value || typeof window === 'undefined') {
        console.warn('No value provided to copy');
        return false;
      }
      if (NODE_ENV === 'development' && typeof value !== 'string') {
        console.error(`Cannot copy typeof ${typeof value} to clipboard, must be a string`);
        return;
      }
      if (!navigator?.clipboard?.writeText) {
        console.warn('Clipboard not supported');
        fallbackCopyTextToClipboard(value)
          .then(() => {
            if (!mounted.current) return;
            toggleSuccess();
            notifySuccess();
          })
          .catch(() => {
            if (!mounted.current) return;
            toggleError();
            notifyError();
          });

        return;
      }

      navigator.clipboard
        .writeText(value)
        .then(() => {
          if (!mounted.current) return;
          toggleSuccess();
          notifySuccess();
        })
        .catch(() => {
          if (!mounted.current) return;
          toggleError();
          notifyError();
        });
    },
    [toggleSuccess, toggleError, mounted]
  );

  return [copyToClipboard, { error, success }] as const;
};
