import BookCover from "@/components/bible/BookCover";
import styles from "./page.module.css";
import { Book, BookKeys } from "@amen24/shared";
import { FC } from "react";

const apiUrl = process.env.API_URL;

interface Props {
  params: { locale: string };
}

const HomePage: FC<Props> = async ({ params }) => {
  const { locale } = await params;
  const response = await fetch(`${apiUrl}/books`);

  if (!response.ok) throw new Error("Failed to fetch data");

  const books = await response.json();

  return (
    <div className={styles.bibleIndex}>
      {books.map((b: Book) => (
        <BookCover
          key={b.id}
          bookId={b.id}
          bookLen={BookKeys[b.title].len}
          bookKey={b.title}
          locale={locale}
        />
      ))}
    </div>
  );
};

export default HomePage;
