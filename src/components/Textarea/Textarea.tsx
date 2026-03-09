import React from 'react';
import styles from './Textarea.module.css';

export type TextareaResize = 'none' | 'vertical' | 'auto';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  hint?: string;
  error?: string;
  resize?: TextareaResize;
  showCount?: boolean;
  fullWidth?: boolean;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label, hint, error, resize = 'vertical', showCount = false,
      fullWidth = false, id, maxLength, className, onChange, ...props
    },
    ref
  ) => {
    const inputId = id ?? `textarea-${Math.random().toString(36).slice(2, 9)}`;
    const errorId = `${inputId}-error`;
    const [count, setCount] = React.useState(
      typeof props.value === 'string' ? props.value.length :
      typeof props.defaultValue === 'string' ? props.defaultValue.length : 0
    );

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setCount(e.target.value.length);
      onChange?.(e);
    };

    return (
      <div className={[styles.wrapper, fullWidth ? styles.fullWidth : ''].filter(Boolean).join(' ')}>
        {label && <label htmlFor={inputId} className={styles.label}>{label}</label>}
        <textarea
          ref={ref}
          id={inputId}
          className={[
            styles.textarea,
            styles[`resize-${resize}`],
            error ? styles.hasError : '',
            className ?? '',
          ].filter(Boolean).join(' ')}
          maxLength={maxLength}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          onChange={handleChange}
          {...props}
        />
        <div className={styles.footer}>
          <div>
            {error && <span id={errorId} className={styles.error} role="alert">{error}</span>}
            {!error && hint && <span className={styles.hint}>{hint}</span>}
          </div>
          {showCount && maxLength && (
            <span className={[styles.count, count >= maxLength ? styles.countMax : ''].filter(Boolean).join(' ')}>
              {count}/{maxLength}
            </span>
          )}
        </div>
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
