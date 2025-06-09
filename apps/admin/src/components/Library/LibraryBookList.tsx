import React from "react";
import styles from "./LibraryBookList.module.css";
import LibraryBookCard from "./LibraryBookCard";
import { useGetLibraryBooksQuery } from "../../store/libraryApi";
import { useNavigate } from "react-router-dom";

const LibraryBookList: React.FC = () => {
  const navigate = useNavigate();
  const { data: books } = useGetLibraryBooksQuery();
  if (!books) return null;

  return (
    <div className={styles.grid}>
      {books.map((book) => (
        <LibraryBookCard
          key={book.id}
          title={book.title}
          author={book.author}
          category={book.category}
          coverImageTitle={book.slug}
          onClick={() => {
            navigate(`/library/${book.slug}`);
          }}
        />
      ))}
    </div>
  );
};

export default LibraryBookList;
