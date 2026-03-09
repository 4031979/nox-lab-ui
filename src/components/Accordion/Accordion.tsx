import React, { createContext, useContext, useRef, useState } from 'react';
import styles from './Accordion.module.css';

type AccordionType = 'single' | 'multiple';

interface AccordionContextValue {
  open: string[];
  toggle: (id: string) => void;
  type: AccordionType;
}

const AccordionContext = createContext<AccordionContextValue | null>(null);

function useAccordion() {
  const ctx = useContext(AccordionContext);
  if (!ctx) throw new Error('AccordionItem must be used inside <Accordion>');
  return ctx;
}

/* ---- Root ---- */
export interface AccordionProps {
  type?: AccordionType;
  defaultValue?: string | string[];
  children: React.ReactNode;
  divided?: boolean;
  bordered?: boolean;
}

export const Accordion: React.FC<AccordionProps> = ({
  type = 'single', defaultValue, children, divided = true, bordered = false,
}) => {
  const initial = defaultValue
    ? Array.isArray(defaultValue) ? defaultValue : [defaultValue]
    : [];
  const [open, setOpen] = useState<string[]>(initial);

  const toggle = (id: string) => {
    if (type === 'single') {
      setOpen(prev => prev.includes(id) ? [] : [id]);
    } else {
      setOpen(prev => prev.includes(id) ? prev.filter(v => v !== id) : [...prev, id]);
    }
  };

  return (
    <AccordionContext.Provider value={{ open, toggle, type }}>
      <div className={[
        styles.root,
        divided ? styles.divided : '',
        bordered ? styles.bordered : '',
      ].filter(Boolean).join(' ')}>
        {children}
      </div>
    </AccordionContext.Provider>
  );
};

/* ---- Item ---- */
export interface AccordionItemProps {
  value: string;
  title: string;
  children: React.ReactNode;
  disabled?: boolean;
  icon?: React.ReactNode;
}

export const AccordionItem: React.FC<AccordionItemProps> = ({
  value, title, children, disabled, icon,
}) => {
  const { open, toggle } = useAccordion();
  const isOpen = open.includes(value);
  const triggerId = `accordion-trigger-${value}`;
  const panelId  = `accordion-panel-${value}`;
  const innerRef = useRef<HTMLDivElement>(null);

  const panelStyle: React.CSSProperties = {
    height: isOpen ? (innerRef.current?.scrollHeight ?? 'auto') : 0,
  };

  return (
    <div className={[styles.item, isOpen ? styles.itemOpen : '', disabled ? styles.itemDisabled : ''].filter(Boolean).join(' ')}>
      <button
        id={triggerId}
        aria-expanded={isOpen}
        aria-controls={panelId}
        disabled={disabled}
        className={styles.trigger}
        onClick={() => !disabled && toggle(value)}
      >
        <span className={styles.triggerLeft}>
          {icon && <span className={styles.icon}>{icon}</span>}
          <span className={styles.title}>{title}</span>
        </span>
        <span className={[styles.chevron, isOpen ? styles.chevronOpen : ''].filter(Boolean).join(' ')} aria-hidden="true">
          <svg viewBox="0 0 16 16" fill="none">
            <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>
      </button>

      <div
        id={panelId}
        role="region"
        aria-labelledby={triggerId}
        className={styles.panel}
        style={panelStyle}
      >
        <div ref={innerRef} className={styles.panelInner}>
          {children}
        </div>
      </div>
    </div>
  );
};
