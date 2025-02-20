import Image from "next/image";
import styles from "./page.module.css";

const HomePage = async () => {
  const response = await fetch("http://localhost:5000/books");

  if (!response.ok) throw new Error("Failed to fetch data");

  const books = await response.json();


  return (
    <div className={styles.home}>
      {books.map(b => <div key={b.id}>{b.title}</div>)}

    </div>
  );
}

export default HomePage;