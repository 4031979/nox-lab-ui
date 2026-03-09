import React, { useState } from 'react';
import styles from './Calendar.module.css';

const DAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}
function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

export interface CalendarProps {
  value?: Date;
  onChange?: (date: Date) => void;
  minDate?: Date;
  maxDate?: Date;
}

export const Calendar: React.FC<CalendarProps> = ({ value, onChange, minDate, maxDate }) => {
  const today = new Date();
  const [viewDate, setViewDate] = useState(value ?? today);
  const year  = viewDate.getFullYear();
  const month = viewDate.getMonth();

  const daysInMonth  = getDaysInMonth(year, month);
  const firstDay     = getFirstDayOfMonth(year, month);
  const daysInPrev   = getDaysInMonth(year, month - 1);

  const prevMonth = () => setViewDate(new Date(year, month - 1, 1));
  const nextMonth = () => setViewDate(new Date(year, month + 1, 1));

  const isSelected = (d: number) =>
    value && value.getFullYear() === year && value.getMonth() === month && value.getDate() === d;
  const isToday = (d: number) =>
    today.getFullYear() === year && today.getMonth() === month && today.getDate() === d;
  const isDisabled = (d: number) => {
    const date = new Date(year, month, d);
    if (minDate && date < minDate) return true;
    if (maxDate && date > maxDate) return true;
    return false;
  };

  const cells: { day: number; type: 'prev' | 'curr' | 'next' }[] = [];
  for (let i = 0; i < firstDay; i++)
    cells.push({ day: daysInPrev - firstDay + 1 + i, type: 'prev' });
  for (let i = 1; i <= daysInMonth; i++)
    cells.push({ day: i, type: 'curr' });
  const remaining = 42 - cells.length;
  for (let i = 1; i <= remaining; i++)
    cells.push({ day: i, type: 'next' });

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <button className={styles.navBtn} onClick={prevMonth} aria-label="Previous month">
          <svg viewBox="0 0 16 16" fill="none" width="16" height="16">
            <path d="M10 4l-4 4 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <div className={styles.monthYear}>
          <span className={styles.month}>{MONTHS[month]}</span>
        </div>
        <button className={styles.navBtn} onClick={nextMonth} aria-label="Next month">
          <svg viewBox="0 0 16 16" fill="none" width="16" height="16">
            <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      <div className={styles.grid}>
        {DAYS.map(d => <div key={d} className={styles.dayName}>{d}</div>)}
        {cells.map((cell, i) => (
          <button
            key={i}
            disabled={cell.type !== 'curr' || isDisabled(cell.day)}
            className={[
              styles.cell,
              cell.type !== 'curr' ? styles.cellOtherMonth : '',
              cell.type === 'curr' && isSelected(cell.day) ? styles.cellSelected : '',
              cell.type === 'curr' && isToday(cell.day) && !isSelected(cell.day) ? styles.cellToday : '',
            ].filter(Boolean).join(' ')}
            onClick={() => cell.type === 'curr' && !isDisabled(cell.day) && onChange?.(new Date(year, month, cell.day))}
          >
            {cell.day}
          </button>
        ))}
      </div>
    </div>
  );
};

Calendar.displayName = 'Calendar';
