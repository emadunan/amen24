import React from "react";
import { Link, useParams } from "react-router-dom";
import styles from "./LibraryBook.module.css";
import LibraryChapterList from "../components/Library/LibraryChapterList";
import { useDeleteLibraryBookMutation, useGetLibraryBookQuery } from "../store/libraryApi";
import Button from "../components/ui/Button";
import BackLink from "../components/ui/BackLink";

const LibraryBook: React.FC = () => {
  const params = useParams<{ slug: string }>();
  const slug = params.slug;

  const skip = !params.slug;
  const { data } = useGetLibraryBookQuery(slug || '', { skip });
  const [deleteBook] = useDeleteLibraryBookMutation();

  async function handleDelete() {
    if (!data?.id) return;
    await deleteBook(data.id).unwrap();
  }

  if (!slug) return null;

  return (
    <div>
      <div className={styles.header}>
        <div className={styles.title}>
          <h3>{slug}</h3>
          <BackLink to={`/library`}></BackLink>
        </div>
        <Link className={styles.createChapterLink} to={`/library/${slug}/create`}>
          ➕ Add New Chapter
        </Link>
        <Button onClick={handleDelete}>Delete</Button>
      </div>
      <LibraryChapterList slug={slug} />
    </div>
  );
};

export default LibraryBook;
