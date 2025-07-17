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
  // const imageBaseUrl =
  //   process.env.NEXT_PUBLIC_IMAGE_BASE_URL || "http://localhost";

  return (
    <Link
      className={styles.card}
      // style={{
      //   backgroundImage: `url(${imageBaseUrl}/img/library-book-covers/${encodeURIComponent(slug)}.webp)`,
      // }}
      href={`/library/${slug}`}
    >
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        {author && <p className={styles.author}>&mdash; {author}</p>}
      </div>
    </Link>
  );
};

export default LibraryBookCard;
