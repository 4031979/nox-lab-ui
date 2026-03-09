import React from 'react';
import styles from './Input.module.css';

export type InputSize = 'sm' | 'md' | 'lg';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  hint?: string;
  error?: string;
  size?: InputSize;
  leftElement?: React.ReactNode;
  rightElement?: React.ReactNode;
  fullWidth?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      hint,
      error,
      size = 'md',
      leftElement,
      rightElement,
      fullWidth = false,
      id,
      className,
      ...props
    },
    ref
  ) => {
    const inputId = id ?? `input-${Math.random().toString(36).slice(2, 9)}`;
    const errorId = `${inputId}-error`;

    const wrapperClasses = [styles.wrapper, fullWidth ? styles.fullWidth : ''].filter(Boolean).join(' ');
    const inputWrapClasses = [styles.inputWrap, styles[size], error ? styles.hasError : ''].filter(Boolean).join(' ');
    const inputClasses = [
      styles.input,
      leftElement ? styles.hasLeft : '',
      rightElement ? styles.hasRight : '',
      className ?? '',
    ].filter(Boolean).join(' ');

    return (
      <div className={wrapperClasses}>
        {label && (
          <label htmlFor={inputId} className={styles.label}>
            {label}
          </label>
        )}
        <div className={inputWrapClasses}>
          {leftElement && <span className={styles.leftEl}>{leftElement}</span>}
          <input
            ref={ref}
            id={inputId}
            className={inputClasses}
            aria-invalid={!!error}
            aria-describedby={error ? errorId : undefined}
            {...props}
          />
          {rightElement && <span className={styles.rightEl}>{rightElement}</span>}
        </div>
        {error && (
          <span id={errorId} className={styles.error} role="alert">
            {error}
          </span>
        )}
        {!error && hint && (
          <span className={styles.hint}>{hint}</span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
