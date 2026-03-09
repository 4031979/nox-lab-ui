import React from 'react';
import styles from './Radio.module.css';

export interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  hint?: string;
  error?: string;
}

export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  ({ label, hint, error, id, disabled, className, ...props }, ref) => {
    const inputId = id ?? `radio-${Math.random().toString(36).slice(2, 9)}`;
    const errorId = `${inputId}-error`;

    return (
      <div className={[styles.wrapper, disabled ? styles.disabled : ''].filter(Boolean).join(' ')}>
        <div className={styles.row}>
          <div className={styles.control}>
            <input
              ref={ref}
              id={inputId}
              type="radio"
              className={[styles.input, error ? styles.hasError : '', className ?? ''].filter(Boolean).join(' ')}
              disabled={disabled}
              aria-invalid={!!error}
              aria-describedby={error ? errorId : undefined}
              {...props}
            />
            <span className={styles.dot} aria-hidden="true" />
          </div>
          {label && <label htmlFor={inputId} className={styles.label}>{label}</label>}
        </div>
        {error && <span id={errorId} className={styles.error} role="alert">{error}</span>}
        {!error && hint && <span className={styles.hint}>{hint}</span>}
      </div>
    );
  }
);

Radio.displayName = 'Radio';

/* ---- RadioGroup ---- */
export interface RadioOption {
  value: string;
  label: string;
  hint?: string;
  disabled?: boolean;
}

export interface RadioGroupProps {
  name: string;
  options: RadioOption[];
  value?: string;
  onChange?: (value: string) => void;
  label?: string;
  error?: string;
  orientation?: 'vertical' | 'horizontal';
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
  name, options, value, onChange, label, error, orientation = 'vertical',
}) => {
  return (
    <fieldset className={styles.fieldset}>
      {label && <legend className={styles.legend}>{label}</legend>}
      <div className={[styles.group, styles[orientation]].join(' ')}>
        {options.map(opt => (
          <Radio
            key={opt.value}
            name={name}
            value={opt.value}
            label={opt.label}
            hint={opt.hint}
            disabled={opt.disabled}
            checked={value === opt.value}
            onChange={() => onChange?.(opt.value)}
          />
        ))}
      </div>
      {error && <span className={styles.groupError} role="alert">{error}</span>}
    </fieldset>
  );
};
