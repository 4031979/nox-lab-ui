import React from 'react';
import styles from './ActionCard.module.css';

export interface ActionCardProps {
  eyebrow?: string;
  title: string;
  description?: string;
  primaryAction: { label: string; onClick: () => void };
  secondaryAction?: { label: string; onClick: () => void };
  variant?: 'primary' | 'dark';
  icon?: React.ReactNode;
}

export const ActionCard: React.FC<ActionCardProps> = ({
  eyebrow, title, description, primaryAction, secondaryAction,
  variant = 'dark', icon,
}) => {
  return (
    <div className={[styles.card, styles[variant]].join(' ')}>
      {icon && <div className={styles.icon}>{icon}</div>}
      <div className={styles.body}>
        {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
        <h3 className={styles.title}>{title}</h3>
        {description && <p className={styles.description}>{description}</p>}
      </div>
      <div className={styles.actions}>
        {secondaryAction && (
          <button className={styles.secondary} onClick={secondaryAction.onClick}>
            {secondaryAction.label}
          </button>
        )}
        <button className={styles.primary} onClick={primaryAction.onClick}>
          {primaryAction.label}
          <svg viewBox="0 0 16 16" fill="none" width="14" height="14">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  );
};

ActionCard.displayName = 'ActionCard';
