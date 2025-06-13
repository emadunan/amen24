"use client";

import { useGetLibraryBooksQuery } from "@/store/apis/libraryApi";
import React from "react";
import LibraryBookCard from "./LibraryBookCard";

const Library: React.FC = () => {
  const { data: books } = useGetLibraryBooksQuery();

  return (
    <div>
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
