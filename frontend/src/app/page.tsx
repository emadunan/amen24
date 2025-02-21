import BookCover from "@/components/bible/BookCover";
import styles from "./page.module.css";
import { Book } from "@amen24/shared";

const HomePage = async () => {
  const response = await fetch("http://localhost:5000/books");

  if (!response.ok) throw new Error("Failed to fetch data");

  const books = await response.json();

  return (
    <div className={styles.home}>
      {books.map((b: Book) => <BookCover key={b.id} id={b.id} bookKey={b.title} />)}
    </div>
  );
}

export default HomePage;