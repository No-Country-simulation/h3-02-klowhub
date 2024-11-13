'use client';

import { createContext, type ReactNode, useState } from 'react';
import {
  Toast,
  ToastAction,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from '../components/Toast/Index';
import { TOAST_REMOVE_DELAY } from '../services/actions';
import type { ToastContextType, ToastState } from '../types/toastTypes';

export const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastContainer({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [toastData, setToastData] = useState<ToastState>({
    title: '',
    description: '',
    id: '',
    duration: TOAST_REMOVE_DELAY,
    dir: 'right',
  });

  const showToast = ({
    id = 'toast-id',
    title = '',
    description = '',
    duration = TOAST_REMOVE_DELAY,
    dir = 'right',
  }: ToastState) => {
    setToastData({ id, title, description, duration, dir });
    setOpen(true);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      <>
        {children}
        <ToastProvider duration={toastData.duration} swipeDirection={toastData.dir || 'right'}>
          <Toast
            className="gap-4 bg-secondary-A-850 text-white shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px]"
            key={toastData.id}
            open={open}
            duration={toastData.duration}
            onOpenChange={setOpen}>
            {toastData.title && <ToastTitle>{toastData.title}</ToastTitle>}
            {toastData.description && <ToastDescription>{toastData.description}</ToastDescription>}
            <ToastAction altText="Close">
              <ToastClose />
            </ToastAction>
          </Toast>
          <ToastViewport />
        </ToastProvider>
      </>
    </ToastContext.Provider>
  );
}
