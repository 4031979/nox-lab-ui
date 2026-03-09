import React from 'react';
import styles from './Switch.module.css';

export type SwitchSize = 'sm' | 'md';

export interface SwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  label?: string;
  hint?: string;
  size?: SwitchSize;
  labelPlacement?: 'left' | 'right';
}

export const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  ({ label, hint, size = 'md', labelPlacement = 'right', id, disabled, className, ...props }, ref) => {
    const inputId = id ?? `switch-${Math.random().toString(36).slice(2, 9)}`;

    return (
      <div className={[styles.wrapper, disabled ? styles.disabled : ''].filter(Boolean).join(' ')}>
        <div className={[styles.row, labelPlacement === 'left' ? styles.labelLeft : ''].filter(Boolean).join(' ')}>
          {label && labelPlacement === 'left' && (
            <label htmlFor={inputId} className={styles.label}>{label}</label>
          )}
          <div className={[styles.track, styles[size], className ?? ''].filter(Boolean).join(' ')}>
            <input
              ref={ref}
              id={inputId}
              type="checkbox"
              role="switch"
              className={styles.input}
              disabled={disabled}
              {...props}
            />
            <span className={styles.thumb} aria-hidden="true" />
          </div>
          {label && labelPlacement === 'right' && (
            <label htmlFor={inputId} className={styles.label}>{label}</label>
          )}
        </div>
        {hint && <span className={styles.hint}>{hint}</span>}
      </div>
    );
  }
);

Switch.displayName = 'Switch';
