import React, { useState } from "react";
import { useGetLibraryBookQuery } from "../../store/libraryApi";
import styles from "./LibraryChapterList.module.css";
import Button from "../ui/Button";

interface Props {
  slug: string;
}

const LibraryChapterList: React.FC<Props> = ({ slug }) => {
  const { data } = useGetLibraryBookQuery(slug);
  const [selected, setSelected] = useState<string | undefined>(
    data?.chapters.find((ch) => ch.order === 1)?.id
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
        <Button className={styles.editBtn}>Edit</Button>
        <h3 className={styles.chapterTitle}>{selectedChapter?.title}</h3>
        <article className={styles.chapterBody}>
          {selectedChapter?.content}
        </article>
      </main>
    </div>
  );
};

export default LibraryChapterList;
