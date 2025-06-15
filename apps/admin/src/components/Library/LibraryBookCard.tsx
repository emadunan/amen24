import React, { useState } from "react";
import styles from "./LibraryBookCard.module.css";

interface BookCardProps {
  title: string;
  author?: string;
  category?: string;
  coverImageTitle: string;
  onClick?: () => void;
}

const fallbackUrl = "/img/lib-book-cover-fallback.webp"; // adjust to your actual fallback path

const LibraryBookCard: React.FC<BookCardProps> = ({
  title,
  author,
  category,
  coverImageTitle,
  onClick,
}) => {
  const initialUrl = `http://localhost/img/library-book-covers/${encodeURIComponent(coverImageTitle)}.webp`;
  const [imgSrc, setImgSrc] = useState(initialUrl);

  return (
    <div
      className={styles.card}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={(e) => {
        if (e.key === "Enter" && onClick) onClick();
      }}
    >
      <img
        src={imgSrc}
        alt={title}
        className={styles.coverImage}
        onError={() => setImgSrc(fallbackUrl)}
      />
      <div className={styles.overlay}>
        <div className={styles.info}>
          <h3 className={styles.title} title={title}>
            {title}
          </h3>
          {author && <p className={styles.author}>{author}</p>}
          {category && <p className={styles.category}>{category}</p>}
        </div>
      </div>
    </div>
  );
};

export default LibraryBookCard;
