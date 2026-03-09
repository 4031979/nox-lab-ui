import React from 'react';
import styles from './PersonCard.module.css';
import { Avatar } from '../AvatarGroup/AvatarGroup';

export interface PersonTag {
  label: string;
  emoji?: string;
}

export interface PersonCardProps {
  name: string;
  avatarSrc?: string;
  subtitle?: string;
  tags?: PersonTag[];
  action?: { label: string; onClick: () => void };
}

export const PersonCard: React.FC<PersonCardProps> = ({
  name, avatarSrc, subtitle, tags = [], action,
}) => {
  return (
    <div className={styles.card}>
      <Avatar src={avatarSrc} name={name} size="lg" />
      <div className={styles.body}>
        <div className={styles.top}>
          <span className={styles.name}>{name}</span>
          {subtitle && <span className={styles.subtitle}>{subtitle}</span>}
        </div>
        {tags.length > 0 && (
          <div className={styles.tags}>
            {tags.map((tag, i) => (
              <span key={i} className={styles.tag}>
                {tag.emoji && <span>{tag.emoji}</span>}
                {tag.label}
              </span>
            ))}
          </div>
        )}
      </div>
      {action && (
        <button className={styles.action} onClick={action.onClick}>{action.label}</button>
      )}
    </div>
  );
};

PersonCard.displayName = 'PersonCard';
