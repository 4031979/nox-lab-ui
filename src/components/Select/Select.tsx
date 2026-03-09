import React, { useEffect, useRef, useState } from 'react';
import styles from './Select.module.css';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectGroup {
  group: string;
  options: SelectOption[];
}

export type SelectOptions = (SelectOption | SelectGroup)[];

function isGroup(o: SelectOption | SelectGroup): o is SelectGroup {
  return 'group' in o;
}

export interface SelectProps {
  options: SelectOptions;
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  label?: string;
  hint?: string;
  error?: string;
  disabled?: boolean;
  fullWidth?: boolean;
  id?: string;
}

export const Select: React.FC<SelectProps> = ({
  options, value, onChange, placeholder = 'Choose option…',
  label, hint, error, disabled, fullWidth, id,
}) => {
  const inputId = id ?? `select-${Math.random().toString(36).slice(2, 9)}`;
  const errorId = `${inputId}-error`;
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const allOptions = options.flatMap(o => isGroup(o) ? o.options : [o]);
  const selected = allOptions.find(o => o.value === value);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') setOpen(false);
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setOpen(o => !o); }
  };

  const handleSelect = (opt: SelectOption) => {
    if (opt.disabled) return;
    onChange?.(opt.value);
    setOpen(false);
  };

  return (
    <div
      className={[styles.wrapper, fullWidth ? styles.fullWidth : '', disabled ? styles.disabled : ''].filter(Boolean).join(' ')}
      ref={ref}
    >
      {label && <label id={`${inputId}-label`} className={styles.label}>{label}</label>}

      <div className={styles.triggerWrap}>
      <button
        type="button"
        className={[styles.trigger, open ? styles.open : '', error ? styles.hasError : ''].filter(Boolean).join(' ')}
        onClick={() => !disabled && setOpen(o => !o)}
        onKeyDown={handleKey}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-labelledby={label ? `${inputId}-label` : undefined}
        aria-describedby={error ? errorId : undefined}
        aria-invalid={!!error}
        disabled={disabled}
      >
        <span className={selected ? styles.selectedLabel : styles.placeholder}>
          {selected ? selected.label : placeholder}
        </span>
        <span className={[styles.chevron, open ? styles.chevronUp : ''].filter(Boolean).join(' ')} aria-hidden="true">
          <svg viewBox="0 0 16 16" fill="none">
            <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>
      </button>

      {open && (
        <ul className={styles.dropdown} role="listbox" aria-label={label}>
          {options.map((item, i) =>
            isGroup(item) ? (
              <li key={i} className={styles.group}>
                <span className={styles.groupLabel}>{item.group}</span>
                <ul>
                  {item.options.map(opt => (
                    <li
                      key={opt.value}
                      role="option"
                      aria-selected={opt.value === value}
                      aria-disabled={opt.disabled}
                      className={[
                        styles.option,
                        opt.value === value ? styles.selected : '',
                        opt.disabled ? styles.optionDisabled : '',
                      ].filter(Boolean).join(' ')}
                      onClick={() => handleSelect(opt)}
                    >
                      {opt.label}
                      {opt.value === value && (
                        <svg className={styles.check} viewBox="0 0 12 12" fill="none">
                          <polyline points="1.5,6 4.5,9.5 10.5,2.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )}
                    </li>
                  ))}
                </ul>
              </li>
            ) : (
              <li
                key={item.value}
                role="option"
                aria-selected={item.value === value}
                aria-disabled={item.disabled}
                className={[
                  styles.option,
                  item.value === value ? styles.selected : '',
                  item.disabled ? styles.optionDisabled : '',
                ].filter(Boolean).join(' ')}
                onClick={() => handleSelect(item)}
              >
                {item.label}
                {item.value === value && (
                  <svg className={styles.check} viewBox="0 0 12 12" fill="none">
                    <polyline points="1.5,6 4.5,9.5 10.5,2.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </li>
            )
          )}
        </ul>
      )}
      </div>

      {error && <span id={errorId} className={styles.error} role="alert">{error}</span>}
      {!error && hint && <span className={styles.hint}>{hint}</span>}
    </div>
  );
};

Select.displayName = 'Select';
