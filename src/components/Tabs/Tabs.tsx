import React, { createContext, useContext, useState } from 'react';
import styles from './Tabs.module.css';

export type TabsVariant = 'line' | 'pill';

interface TabsContextValue {
  active: string;
  setActive: (id: string) => void;
  variant: TabsVariant;
}

const TabsContext = createContext<TabsContextValue | null>(null);

function useTabsContext() {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error('Tab components must be used inside <Tabs>');
  return ctx;
}

/* ---- Root ---- */
export interface TabsProps {
  defaultValue: string;
  value?: string;
  onChange?: (value: string) => void;
  variant?: TabsVariant;
  children: React.ReactNode;
}

export const Tabs: React.FC<TabsProps> = ({
  defaultValue, value, onChange, variant = 'line', children,
}) => {
  const [internal, setInternal] = useState(defaultValue);
  const active = value ?? internal;

  const setActive = (id: string) => {
    setInternal(id);
    onChange?.(id);
  };

  return (
    <TabsContext.Provider value={{ active, setActive, variant }}>
      <div className={styles.root}>{children}</div>
    </TabsContext.Provider>
  );
};

/* ---- List ---- */
export interface TabsListProps {
  children: React.ReactNode;
  fullWidth?: boolean;
}

export const TabsList: React.FC<TabsListProps> = ({ children, fullWidth }) => {
  const { variant } = useTabsContext();
  return (
    <div
      className={[styles.list, styles[variant], fullWidth ? styles.fullWidth : ''].filter(Boolean).join(' ')}
      role="tablist"
    >
      {children}
    </div>
  );
};

/* ---- Trigger ---- */
export interface TabsTriggerProps {
  value: string;
  children: React.ReactNode;
  disabled?: boolean;
  icon?: React.ReactNode;
  badge?: string | number;
}

export const TabsTrigger: React.FC<TabsTriggerProps> = ({
  value, children, disabled, icon, badge,
}) => {
  const { active, setActive, variant } = useTabsContext();
  const isActive = active === value;

  return (
    <button
      role="tab"
      aria-selected={isActive}
      aria-disabled={disabled}
      disabled={disabled}
      className={[
        styles.trigger,
        styles[`trigger-${variant}`],
        isActive ? styles.triggerActive : '',
        disabled ? styles.triggerDisabled : '',
      ].filter(Boolean).join(' ')}
      onClick={() => !disabled && setActive(value)}
      tabIndex={isActive ? 0 : -1}
    >
      {icon && <span className={styles.triggerIcon}>{icon}</span>}
      {children}
      {badge !== undefined && <span className={styles.badge}>{badge}</span>}
    </button>
  );
};

/* ---- Content ---- */
export interface TabsContentProps {
  value: string;
  children: React.ReactNode;
}

export const TabsContent: React.FC<TabsContentProps> = ({ value, children }) => {
  const { active } = useTabsContext();
  if (active !== value) return null;
  return (
    <div role="tabpanel" className={styles.content}>
      {children}
    </div>
  );
};
