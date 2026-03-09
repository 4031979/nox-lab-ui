import React, { createContext, useCallback, useContext, useReducer } from 'react';
import styles from './Toast.module.css';

export type ToastType = 'default' | 'success' | 'warning' | 'danger';

export interface Toast {
  id: string;
  message: string;
  type?: ToastType;
  duration?: number;
}

interface ToastState {
  toasts: Toast[];
}

type ToastAction =
  | { type: 'ADD'; toast: Toast }
  | { type: 'REMOVE'; id: string };

function toastReducer(state: ToastState, action: ToastAction): ToastState {
  switch (action.type) {
    case 'ADD':
      return { toasts: [...state.toasts, action.toast] };
    case 'REMOVE':
      return { toasts: state.toasts.filter((t) => t.id !== action.id) };
    default:
      return state;
  }
}

interface ToastContextValue {
  addToast: (message: string, options?: Partial<Omit<Toast, 'id' | 'message'>>) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(toastReducer, { toasts: [] });

  const addToast = useCallback(
    (message: string, options?: Partial<Omit<Toast, 'id' | 'message'>>) => {
      const id = Math.random().toString(36).slice(2);
      const duration = options?.duration ?? 4000;
      dispatch({ type: 'ADD', toast: { id, message, ...options } });
      setTimeout(() => dispatch({ type: 'REMOVE', id }), duration);
    },
    []
  );

  const removeToast = (id: string) => dispatch({ type: 'REMOVE', id });

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className={styles.region} role="region" aria-label="Notifications" aria-live="polite">
        {state.toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} onClose={() => removeToast(toast.id)} />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

const ICONS: Record<ToastType, string> = {
  default: 'ℹ',
  success: '✓',
  warning: '⚠',
  danger: '✕',
};

const ToastItem: React.FC<{ toast: Toast; onClose: () => void }> = ({ toast, onClose }) => {
  const type = toast.type ?? 'default';
  return (
    <div className={[styles.toast, styles[type]].join(' ')} role="alert">
      <span className={styles.icon} aria-hidden="true">{ICONS[type]}</span>
      <span className={styles.message}>{toast.message}</span>
      <button className={styles.close} onClick={onClose} aria-label="Dismiss">✕</button>
    </div>
  );
};

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used inside <ToastProvider>');
  return ctx;
}
