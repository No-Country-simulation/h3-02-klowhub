import { useContext } from 'react';
import { ToastContext } from '../provider/ToastContainer';
import type { ToastContextType } from '../types/toastTypes';

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
