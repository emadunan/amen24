"use client";

import { useGetLibraryBooksQuery } from "@/store/apis/libraryApi";
import React from "react";
import LibraryBookCard from "./LibraryBookCard";
import styles from "./Library.module.css";

const Library: React.FC = () => {
  const { data: books } = useGetLibraryBooksQuery();

  return (
    <div className={styles.container}>
      {books?.map((b) => (
        <LibraryBookCard
          key={b.id}
          slug={b.slug}
          title={b.title}
          author={b.author}
        />
      ))}
    </div>
  );
};

export default Library;
