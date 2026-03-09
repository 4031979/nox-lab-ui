import React from 'react';
import styles from './AvatarGroup.module.css';

export type AvatarSize = 'sm' | 'md' | 'lg';

export interface AvatarProps {
  src?: string;
  name: string;
  size?: AvatarSize;
}

export const Avatar: React.FC<AvatarProps> = ({ src, name, size = 'md' }) => {
  const initials = name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
  return (
    <span className={[styles.avatar, styles[size]].join(' ')} title={name}>
      {src
        ? <img src={src} alt={name} className={styles.img} />
        : <span className={styles.initials}>{initials}</span>
      }
    </span>
  );
};

export interface AvatarGroupProps {
  avatars: AvatarProps[];
  max?: number;
  size?: AvatarSize;
}

export const AvatarGroup: React.FC<AvatarGroupProps> = ({ avatars, max = 4, size = 'sm' }) => {
  const visible = avatars.slice(0, max);
  const extra = avatars.length - max;

  return (
    <div className={styles.group}>
      {visible.map((a, i) => (
        <span key={i} className={styles.item} style={{ zIndex: visible.length - i }}>
          <Avatar {...a} size={size} />
        </span>
      ))}
      {extra > 0 && (
        <span className={[styles.avatar, styles[size], styles.extra].join(' ')}>
          +{extra}
        </span>
      )}
    </div>
  );
};

AvatarGroup.displayName = 'AvatarGroup';
