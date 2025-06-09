import React from 'react';
import styles from './LibraryBookCard.module.css';

interface BookCardProps {
  title: string;
  author?: string;
  category?: string;
  coverImageTitle: string;
  onClick?: () => void;
}

const LibraryBookCard: React.FC<BookCardProps> = ({ title, author, category, coverImageTitle, onClick }) => {
  const coverImageUrl = `http://localhost/img/library-book-covers/${encodeURIComponent(coverImageTitle)}.webp`;

  return (
    <div
      className={styles.card}
      style={{ backgroundImage: `url(${coverImageUrl})` }}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={e => { if (e.key === 'Enter' && onClick) onClick(); }}
    >
      <div className={styles.overlay}>
        <div className={styles.info}>
          <h3 className={styles.title} title={title}>{title}</h3>
          {author && <p className={styles.author}>{author}</p>}
          {category && <p className={styles.category}>{category}</p>}
        </div>
      </div>
    </div>
  );
};

export default LibraryBookCard;
