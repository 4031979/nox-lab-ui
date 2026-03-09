import React, { useState } from 'react';
import styles from './VenueCard.module.css';

export interface VenueCardProps {
  image: string;
  name: string;
  description?: string;
  rating?: number;
  reviewCount?: number;
  price?: number;
  priceUnit?: string;
  bookmarked?: boolean;
  onBookmark?: (bookmarked: boolean) => void;
  onClick?: () => void;
}

export const VenueCard: React.FC<VenueCardProps> = ({
  image, name, description, rating, reviewCount, price, priceUnit = '/day',
  bookmarked: initialBookmarked = false, onBookmark, onClick,
}) => {
  const [bookmarked, setBookmarked] = useState(initialBookmarked);

  const handleBookmark = (e: React.MouseEvent) => {
    e.stopPropagation();
    const next = !bookmarked;
    setBookmarked(next);
    onBookmark?.(next);
  };

  return (
    <div className={styles.card} onClick={onClick}>
      <div className={styles.imageWrap}>
        <img src={image} alt={name} className={styles.image} />
        <button
          className={[styles.bookmark, bookmarked ? styles.bookmarkActive : ''].filter(Boolean).join(' ')}
          onClick={handleBookmark}
          aria-label={bookmarked ? 'Remove bookmark' : 'Bookmark'}
        >
          <svg viewBox="0 0 16 20" fill="none" width="16" height="20">
            <path d="M1 1h14v18l-7-4-7 4V1z"
              stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
              fill={bookmarked ? 'currentColor' : 'none'} />
          </svg>
        </button>
      </div>

      <div className={styles.body}>
        <h3 className={styles.name}>{name}</h3>
        {description && <p className={styles.description}>{description}</p>}
        <div className={styles.footer}>
          {rating !== undefined && (
            <span className={styles.rating}>
              <svg viewBox="0 0 16 16" width="13" height="13" fill="#F4A01C">
                <path d="M8 1l1.8 3.6L14 5.3l-3 2.9.7 4.1L8 10.4l-3.7 1.9.7-4.1-3-2.9 4.2-.7L8 1z"/>
              </svg>
              {rating.toFixed(1)}
              {reviewCount !== undefined && <span className={styles.reviewCount}>/ {reviewCount}</span>}
            </span>
          )}
          {price !== undefined && (
            <span className={styles.price}>
              <strong>${price}</strong>
              <span className={styles.priceUnit}>{priceUnit}</span>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

VenueCard.displayName = 'VenueCard';
