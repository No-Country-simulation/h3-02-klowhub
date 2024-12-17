'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { createContext, type ReactNode, useState } from 'react';
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from '../components/Toast';
import { TOAST_REMOVE_DELAY } from '../services/actions';
import type { ToastContextType, ToastState } from '../types/toastTypes';

export const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastContainer({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastState[]>([]);

  const showToast = ({
    id = `toast-${Date.now()}`,
    title = '',
    description = '',
    duration = TOAST_REMOVE_DELAY,
    dir = 'right',
  }: ToastState) => {
    const newToast = { id, title, description, duration, dir };

    setToasts(currentToasts => {
      const updatedToasts = [...currentToasts, newToast];
      return updatedToasts.length > 3 ? updatedToasts.slice(-3) : updatedToasts;
    });

    // Automatically remove toast after duration
    setTimeout(() => {
      setToasts(currentToasts => currentToasts.filter(toast => toast.id !== id));
    }, duration);
  };

  const removeToast = (id: string) => {
    setToasts(currentToasts => currentToasts.filter(toast => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast, toasts }}>
      {children}
      <ToastProvider>
        {toasts.map((toast: ToastState, i: number) => (
          <AnimatePresence key={`${toast.id}${i}`}>
            <Toast
              asChild
              open={true}
              duration={toast?.duration}
              onSwipeEnd={() => removeToast(toast.id)}
              onSwipeCancel={() => removeToast(toast.id)}
              className="flex flex-col items-start justify-center gap-3 border-none bg-neutral-100 text-white shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px]">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                {toast?.title && <ToastTitle>{toast.title}</ToastTitle>}
                {toast?.description && <ToastDescription>{toast.description}</ToastDescription>}
                <div>
                  <ToastClose onClick={() => removeToast(toast.id)} />
                </div>
              </motion.div>
            </Toast>
          </AnimatePresence>
        ))}
        <ToastViewport className="gap-y-3" />
      </ToastProvider>
    </ToastContext.Provider>
  );
}
