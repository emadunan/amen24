import React from 'react';
import styles from './LibraryBookCard.module.css';

interface BookCardProps {
  title: string;
  author?: string;
  category?: string;
  coverImageTitle: string; // used for image path /img/library-book-cover/<bookTitle>.jpg
  onClick?: () => void;
}

const LibraryBookCard: React.FC<BookCardProps> = ({ title, author, category, coverImageTitle, onClick }) => {
  // const coverImageUrl = `/img/library-book-cover/${encodeURIComponent(coverImageTitle)}.jpg`;
  const coverImageUrl = `/img/lib-book-cover-fallback.jpg`;

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
