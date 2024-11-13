/* eslint-disable @typescript-eslint/no-explicit-any */
export const TOAST_LIMIT = 1;
export const TOAST_REMOVE_DELAY = 1000000;

export const actionTypes = {
  ADD_TOAST: 'ADD_TOAST',
  UPDATE_TOAST: 'UPDATE_TOAST',
  DISMISS_TOAST: 'DISMISS_TOAST',
  REMOVE_TOAST: 'REMOVE_TOAST',
} as const;

export function genId(count: number) {
  count = (count + 1) % Number.MAX_VALUE;
  return count.toString();
}

export const addToRemoveQueue = (
  toastId: string,
  toastTimeouts: Map<string, ReturnType<typeof setTimeout>>,
  dispatch: any
) => {
  if (toastTimeouts.has(toastId)) {
    return;
  }

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId);
    dispatch({
      type: 'REMOVE_TOAST',
      toastId: toastId,
    });
  }, TOAST_REMOVE_DELAY);

  toastTimeouts.set(toastId, timeout);
};
