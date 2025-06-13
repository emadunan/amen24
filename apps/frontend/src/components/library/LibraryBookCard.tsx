import React from "react";
import styles from "./LibraryBookCard.module.css";
import Link from "next/link";

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
  return (
    <Link
      className={styles.card}
      style={{
        backgroundImage: `url(http://localhost/img/library-book-covers/${slug}.webp)`,
      }}
      href={`/library/${slug}`}
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
