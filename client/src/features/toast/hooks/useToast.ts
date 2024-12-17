import { useContext, useEffect, useState } from 'react';
import { ToastContext } from '../provider/ToastContainer';
import type { ToastContextType } from '../types/toastTypes';

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  const [isClient, setIsClient] = useState(false);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }

  useEffect(() => {
    setIsClient(true);
  }, []);
  return {
    showToast: isClient ? context.showToast : () => {},
    toasts: isClient ? context.toasts : [],
  };
};
