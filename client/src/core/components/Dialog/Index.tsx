import * as DialogPrimitive from '@radix-ui/react-dialog';
import type { ReactNode } from 'react';
import css from './dialog.module.css';

interface DialogProps {
  children: ReactNode;
  modal: ReactNode;
}

export default function Dialog({ children, modal }: DialogProps) {
  return (
    <DialogPrimitive.Root>
      <DialogPrimitive.Trigger asChild>{children}</DialogPrimitive.Trigger>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className={css.dialogOverlay} />
        <DialogPrimitive.Content className={css.dialogModal}>{modal}</DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
