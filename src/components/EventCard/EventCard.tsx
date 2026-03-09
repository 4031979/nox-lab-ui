import React, { useState } from 'react';
import styles from './EventCard.module.css';
import { AvatarGroup, AvatarProps } from '../AvatarGroup/AvatarGroup';

export interface EventCardProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  attendees?: AvatarProps[];
  attendeeStatus?: string;
  attendeeOptions?: string[];
  date?: string;
  time?: string;
  onStatusChange?: (status: string) => void;
}

export const EventCard: React.FC<EventCardProps> = ({
  icon, title, description, attendees = [], attendeeStatus = 'Attending',
  attendeeOptions = ['Attending', 'Maybe', 'Not going'],
  date, time, onStatusChange,
}) => {
  const [status, setStatus] = useState(attendeeStatus);
  const [open, setOpen] = useState(false);

  const handleSelect = (opt: string) => {
    setStatus(opt);
    setOpen(false);
    onStatusChange?.(opt);
  };

  return (
    <div className={styles.card}>
      <div className={styles.top}>
        {icon && <div className={styles.icon}>{icon}</div>}
        <div className={styles.body}>
          <h3 className={styles.title}>{title}</h3>
          {description && <p className={styles.description}>{description}</p>}
        </div>
      </div>

      <div className={styles.footer}>
        <div className={styles.footerLeft}>
          {attendees.length > 0 && <AvatarGroup avatars={attendees} max={3} size="sm" />}
          <div className={styles.statusWrap}>
            <button className={styles.statusBtn} onClick={() => setOpen(o => !o)}>
              {status}
              <svg viewBox="0 0 16 16" fill="none" width="14" height="14">
                <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            {open && (
              <ul className={styles.dropdown}>
                {attendeeOptions.map(opt => (
                  <li key={opt} className={[styles.option, opt === status ? styles.optionActive : ''].join(' ')} onClick={() => handleSelect(opt)}>
                    {opt}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className={styles.footerRight}>
          {date && <span className={styles.meta}>{date}</span>}
          {time && <span className={styles.meta}>{time}</span>}
        </div>
      </div>
    </div>
  );
};

EventCard.displayName = 'EventCard';
