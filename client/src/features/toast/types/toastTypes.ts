type ToastDirection = 'up' | 'down' | 'left' | 'right';

export interface ToastState {
  id: string;
  title?: string;
  description?: string;
  dir?: ToastDirection;
  duration?: number;
}

export interface ToastContextType {
  showToast: (state: ToastState) => void;
}
