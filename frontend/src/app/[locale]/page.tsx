import BookCover from "@/components/bible/BookCover";
import styles from "./page.module.css";
import { Book, BookKeys } from "@amen24/shared";
import { FC } from "react";

interface Props {
  params: { locale: string };
}

const HomePage: FC<Props> = async ({ params }) => {
  const { locale } = await params;
  const response = await fetch("http://localhost:5000/books");

  if (!response.ok) throw new Error("Failed to fetch data");

  const books = await response.json();

  return (
    <div className={styles.home}>
      <div className={styles.container}>
        {books.map((b: Book) => <BookCover key={b.id} bookId={b.id} bookLen={BookKeys[b.title].len as number} bookKey={b.title} locale={locale} />)}
      </div>
    </div>
  );
}

export default HomePage;