import React, { useState } from "react";
import { useGetLibraryBookQuery } from "../../store/libraryApi";
import styles from "./LibraryChapterList.module.css";
import { Link } from "react-router-dom";
import Markdown from "react-markdown";

interface Props {
  slug: string;
}

const LibraryChapterList: React.FC<Props> = ({ slug }) => {
  const { data } = useGetLibraryBookQuery(slug);
  const [selected, setSelected] = useState<string | undefined>(
    data?.chapters.find((ch) => ch.order === 1)?.id,
  );

  const handleChangeSelected = (id: string) => {
    setSelected(id);
  };

  const selectedChapter = data?.chapters.find((ch) => ch.id === selected);

  return (
    <div className={styles.container} dir="rtl">
      <aside className={styles.sidebar}>
        <h3 className={styles.sidebarHeading}>Chapters</h3>
        <ul className={styles.chapterList}>
          {data?.chapters.map((ch) => (
            <li
              key={ch.id}
              className={`${styles.chapterItem} ${
                selected === ch.id ? styles.active : ""
              }`}
              onClick={() => handleChangeSelected(ch.id)}
            >
              {ch.title}
            </li>
          ))}
        </ul>
      </aside>

      <main className={styles.content}>
        {selected && (
          <Link to={`/library/${slug}/${selected}`} className={styles.editBtn}>
            Edit
          </Link>
        )}
        <article className={styles.chapterBody}>
          <Markdown>{selectedChapter?.content}</Markdown>
        </article>
      </main>
    </div>
  );
};

export default LibraryChapterList;
