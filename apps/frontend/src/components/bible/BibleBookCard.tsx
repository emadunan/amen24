import React from "react";
import styles from "./BibleBookCard.module.css";
import Link from "next/link";
import initTranslations from "@/app/i18n";

interface Props {
  bookId: number;
  bookKey: string;
  bookLen: number;
  locale: string;
}

const BibleBookCard: React.FC<Props> = async ({
  bookId,
  bookKey,
  bookLen,
  locale,
}) => {
  const { t } = await initTranslations(locale, ["book", "writer"]);

  return (
    <Link
      className={styles.card}
      style={{
        backgroundImage: `url(/img/book-cover/${bookId}_${bookKey}.jpg)`,
      }}
      href={`/${bookKey}/1/${bookLen}`}
    >
      <div className={styles.overlay}>
        <div className={styles.content}>
          <h3 className={styles.title}>{t(`book:${bookKey}`)}</h3>
          {/* <p className={styles.author}>
            &mdash; {t(`writer:${BookMap[bookKey as BookKey].writer}`)}
          </p> */}
        </div>
      </div>
    </Link>
  );
};

export default BibleBookCard;
