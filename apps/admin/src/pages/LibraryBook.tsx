import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import styles from "./LibraryBook.module.css";
import CreateLibraryChapterForm from "../components/Library/CreateLibraryChapterForm";
import LibraryChapterList from "../components/Library/LibraryChapterList";

const LibraryBook: React.FC = () => {
  const params = useParams<{ slug: string }>();
  const slug = params.slug;

  const [isCreateMode, setIsCreateMode] = useState(false);

  const toggleMode = () => setIsCreateMode((prev) => !prev);

  if (!slug) return null;

  return (
    <div>
      <div className={styles.header}>
        <div></div>
        <h3 className={styles.title}>{slug}</h3>
        <div className={styles.toggleWrapper}>
          <Link className={styles.toggleButton} to={`/library/${slug}/create`}>
            ➕ Add New Chapter
          </Link>
        </div>
      </div>
      {isCreateMode ? (
        <CreateLibraryChapterForm slug={slug} onToggle={toggleMode} />
      ) : (
        <LibraryChapterList slug={slug} />
      )}
    </div>
  );
};

export default LibraryBook;
