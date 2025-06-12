import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import styles from "./LibraryBook.module.css";
import CreateLibraryChapterForm from "../components/Library/CreateLibraryChapterForm";
import LibraryChapterList from "../components/Library/LibraryChapterList";
import { useDeleteLibraryBookMutation, useGetLibraryBookQuery } from "../store/libraryApi";
import Button from "../components/ui/Button";

const LibraryBook: React.FC = () => {
  const params = useParams<{ slug: string }>();
  const slug = params.slug;

  const skip = !params.slug;
  const { data } = useGetLibraryBookQuery(slug || '', { skip });
  const [deleteBook] = useDeleteLibraryBookMutation();

  const [isCreateMode, setIsCreateMode] = useState(false);

  const toggleMode = () => setIsCreateMode((prev) => !prev);

  async function handleDelete() {
    if (!data?.id) return;

    await deleteBook(data.id).unwrap();
  }

  if (!slug) return null;

  return (
    <div>
      <div className={styles.header}>
        <h3 className={styles.title}>{slug}</h3>
        <Link className={styles.toggleButton} to={`/library/${slug}/create`}>
          ➕ Add New Chapter
        </Link>
        <Button onClick={handleDelete}>Delete</Button>
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
