import React from "react";
import styles from "./LibraryBookList.module.css";
import { useGetLibraryBooksQuery } from "../../store/libraryApi";
import LibraryBookCard from "./LibraryBookCard";

const LibraryBookList: React.FC = () => {
  const { data: books } = useGetLibraryBooksQuery();
  if (!books) return null;

  return (
    <div className={styles.grid}>
      {books.map((book) => (
        <LibraryBookCard
          key={book.id}
          slug={book.slug}
          title={book.title}
          author={book.author}
        />
      ))}
    </div>
  );
};

export default LibraryBookList;
