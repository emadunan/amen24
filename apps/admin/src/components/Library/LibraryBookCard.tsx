import React from "react";
import styles from "./LibraryBookCard.module.css";
import { Link } from "react-router-dom";
import { baseUrl } from "../../constants";

interface LibraryBookCardProps {
  slug: string;
  title: string;
  author?: string;
}

const LibraryBookCard: React.FC<LibraryBookCardProps> = ({
  slug,
  title,
  author,
}) => {
  const imageBaseUrl = baseUrl || "http://localhost";

  return (
    <Link
      className={styles.card}
      style={{
        backgroundImage: `url(${imageBaseUrl}/img/library-book-covers/${encodeURIComponent(slug)}.webp)`,
      }}
      to={`/library/${slug}`}
    >
      <div className={styles.overlay}>
        <div className={styles.content}>
          <h3 className={styles.title}>{title}</h3>
          {author && <p className={styles.author}>&mdash; {author}</p>}
        </div>
      </div>
    </Link>
  );
};

export default LibraryBookCard;
