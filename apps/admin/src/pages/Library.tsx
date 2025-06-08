import React, { useState } from "react";
import LibraryBookList from "../components/Library/LibraryBookList";
import styles from "./Library.module.css";
import CreateLibraryBookForm from "../components/Library/CreateLibraryBookFrom";

const Library: React.FC = () => {
  const [isCreateMode, setIsCreateMode] = useState(false);

  const toggleMode = () => setIsCreateMode(prev => !prev);

  return (
    <div className={styles.libraryContainer}>
      <div className={styles.toggleWrapper}>
        <button className={styles.toggleButton} onClick={toggleMode}>
          {isCreateMode ? "📚 View Book List" : "➕ Add New Book"}
        </button>
      </div>

      <div className={styles.content}>
        {isCreateMode ? <CreateLibraryBookForm /> : <LibraryBookList books={[]} />}
      </div>
    </div>
  );
};

export default Library;
