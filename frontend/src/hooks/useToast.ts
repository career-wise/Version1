import { useState, useCallback } from 'react';

export interface Toast {
  id: string;
  title: string;
  message?: string;
  type: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
}

export const useToast = () => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((toast: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newToast = { ...toast, id };

    setToasts(prev => [...prev, newToast]);

    // Auto remove after duration
    const duration = toast.duration || 5000;
    setTimeout(() => {
      removeToast(id);
    }, duration);

    return id;
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  const success = useCallback((title: string, message?: string) => {
    return addToast({ title, message, type: 'success' });
  }, [addToast]);

  const error = useCallback((title: string, message?: string) => {
    return addToast({ title, message, type: 'error' });
  }, [addToast]);

  const warning = useCallback((title: string, message?: string) => {
    return addToast({ title, message, type: 'warning' });
  }, [addToast]);

  const info = useCallback((title: string, message?: string) => {
    return addToast({ title, message, type: 'info' });
  }, [addToast]);

  return {
    toasts,
    addToast,
    removeToast,
    success,
    error,
    warning,
    info
  };
};