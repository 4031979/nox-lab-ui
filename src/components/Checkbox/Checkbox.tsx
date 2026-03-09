import React from 'react';
import styles from './Checkbox.module.css';

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  label?: string;
  hint?: string;
  error?: string;
  indeterminate?: boolean;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, hint, error, indeterminate, id, className, disabled, ...props }, ref) => {
    const inputId = id ?? `checkbox-${Math.random().toString(36).slice(2, 9)}`;
    const errorId = `${inputId}-error`;

    const internalRef = React.useRef<HTMLInputElement>(null);
    const resolvedRef = (ref as React.RefObject<HTMLInputElement>) ?? internalRef;

    React.useEffect(() => {
      if (resolvedRef.current) {
        resolvedRef.current.indeterminate = indeterminate ?? false;
      }
    }, [indeterminate, resolvedRef]);

    return (
      <div className={[styles.wrapper, disabled ? styles.disabled : ''].filter(Boolean).join(' ')}>
        <div className={styles.row}>
          <div className={styles.control}>
            <input
              ref={resolvedRef}
              id={inputId}
              type="checkbox"
              className={[styles.input, error ? styles.hasError : '', className ?? ''].filter(Boolean).join(' ')}
              disabled={disabled}
              aria-invalid={!!error}
              aria-describedby={error ? errorId : undefined}
              {...props}
            />
            <span className={styles.checkmark} aria-hidden="true">
              {indeterminate ? (
                <svg viewBox="0 0 12 12" fill="none"><line x1="2" y1="6" x2="10" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
              ) : (
                <svg viewBox="0 0 12 12" fill="none"><polyline points="1.5,6 4.5,9.5 10.5,2.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              )}
            </span>
          </div>
          {label && (
            <label htmlFor={inputId} className={styles.label}>{label}</label>
          )}
        </div>
        {error && <span id={errorId} className={styles.error} role="alert">{error}</span>}
        {!error && hint && <span className={styles.hint}>{hint}</span>}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';
