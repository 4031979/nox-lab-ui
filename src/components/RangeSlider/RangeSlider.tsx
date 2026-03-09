import React, { useCallback, useRef, useState } from 'react';
import styles from './RangeSlider.module.css';

export interface RangeSliderProps {
  min: number;
  max: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
  label?: string;
  prefix?: string;
  suffix?: string;
  histogram?: number[];
  onReset?: () => void;
}

export const RangeSlider: React.FC<RangeSliderProps> = ({
  min, max, value, onChange, label, prefix = '', suffix = '', histogram, onReset,
}) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState<'low' | 'high' | null>(null);

  const toPercent = (v: number) => ((v - min) / (max - min)) * 100;

  const fromClientX = useCallback((clientX: number): number => {
    const rect = trackRef.current?.getBoundingClientRect();
    if (!rect) return min;
    const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    return Math.round(min + ratio * (max - min));
  }, [min, max]);

  const handleMouseDown = (handle: 'low' | 'high') => (e: React.MouseEvent) => {
    e.preventDefault();
    setDragging(handle);

    const onMove = (ev: MouseEvent) => {
      const newVal = fromClientX(ev.clientX);
      if (handle === 'low')  onChange([Math.min(newVal, value[1] - 1), value[1]]);
      if (handle === 'high') onChange([value[0], Math.max(newVal, value[0] + 1)]);
    };
    const onUp = () => {
      setDragging(null);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
  };

  const lowPct  = toPercent(value[0]);
  const highPct = toPercent(value[1]);

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        {label && <span className={styles.label}>{label}</span>}
        {onReset && <button className={styles.reset} onClick={onReset}>Reset</button>}
      </div>

      {histogram && (
        <div className={styles.histogram}>
          {histogram.map((h, i) => {
            const barPct = (i / histogram.length) * 100;
            const inRange = barPct >= lowPct && barPct <= highPct;
            return (
              <div
                key={i}
                className={[styles.bar, inRange ? styles.barActive : ''].filter(Boolean).join(' ')}
                style={{ height: `${Math.max(8, h * 100)}%` }}
              />
            );
          })}
        </div>
      )}

      <div className={styles.trackWrap} ref={trackRef}>
        <div className={styles.track}>
          <div
            className={styles.fill}
            style={{ left: `${lowPct}%`, width: `${highPct - lowPct}%` }}
          />
        </div>

        {/* Low handle */}
        <div
          className={[styles.handle, dragging === 'low' ? styles.handleActive : ''].filter(Boolean).join(' ')}
          style={{ left: `${lowPct}%` }}
          onMouseDown={handleMouseDown('low')}
          role="slider"
          aria-valuemin={min}
          aria-valuemax={value[1]}
          aria-valuenow={value[0]}
          tabIndex={0}
        >
          <div className={styles.tooltip}>{prefix}{value[0].toLocaleString()}{suffix}</div>
        </div>

        {/* High handle */}
        <div
          className={[styles.handle, dragging === 'high' ? styles.handleActive : ''].filter(Boolean).join(' ')}
          style={{ left: `${highPct}%` }}
          onMouseDown={handleMouseDown('high')}
          role="slider"
          aria-valuemin={value[0]}
          aria-valuemax={max}
          aria-valuenow={value[1]}
          tabIndex={0}
        >
          <div className={styles.tooltip}>{prefix}{value[1].toLocaleString()}{suffix}</div>
        </div>
      </div>

      <div className={styles.ticks}>
        <span>{prefix}{min.toLocaleString()}{suffix}</span>
        <span>{prefix}{max.toLocaleString()}{suffix}</span>
      </div>
    </div>
  );
};

RangeSlider.displayName = 'RangeSlider';
