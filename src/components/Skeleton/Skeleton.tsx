import React from 'react';
import styles from './Skeleton.module.css';

export type SkeletonVariant = 'text' | 'circular' | 'rectangular' | 'rounded';

export interface SkeletonProps {
  variant?: SkeletonVariant;
  width?: number | string;
  height?: number | string;
  lines?: number;
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  variant = 'text', width, height, lines = 1, className,
}) => {
  if (variant === 'text' && lines > 1) {
    return (
      <div className={styles.textGroup} style={{ width }}>
        {Array.from({ length: lines }).map((_, i) => (
          <span
            key={i}
            className={[styles.skeleton, styles.text, className ?? ''].filter(Boolean).join(' ')}
            style={{ width: i === lines - 1 ? '70%' : '100%', height }}
            aria-hidden="true"
          />
        ))}
      </div>
    );
  }

  return (
    <span
      className={[styles.skeleton, styles[variant], className ?? ''].filter(Boolean).join(' ')}
      style={{ width, height }}
      aria-hidden="true"
    />
  );
};

/* ---- Preset compositions ---- */
export const SkeletonCard: React.FC = () => (
  <div className={styles.card}>
    <Skeleton variant="rectangular" width="100%" height={160} />
    <div className={styles.cardBody}>
      <div className={styles.cardHeader}>
        <Skeleton variant="circular" width={40} height={40} />
        <div className={styles.cardMeta}>
          <Skeleton variant="text" width={140} height={14} />
          <Skeleton variant="text" width={90} height={12} />
        </div>
      </div>
      <Skeleton variant="text" lines={3} height={13} />
    </div>
  </div>
);

export const SkeletonRow: React.FC = () => (
  <div className={styles.row}>
    <Skeleton variant="circular" width={36} height={36} />
    <div className={styles.rowContent}>
      <Skeleton variant="text" width={180} height={14} />
      <Skeleton variant="text" width={120} height={12} />
    </div>
    <Skeleton variant="rounded" width={60} height={22} />
  </div>
);
