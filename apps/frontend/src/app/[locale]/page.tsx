import BookCover from "@/components/bible/BookCover";
import styles from "./page.module.css";
import { Book, BookMap } from "@amen24/shared";
import { FC } from "react";
import initTranslations from "../i18n";
import { apiPrivateUrl } from "@/constants";

const i18nNamespaces = ["common", "book"];

interface Props {
  params: Promise<{ locale: string }>;
}

const HomePage: FC<Props> = async ({ params }) => {
  const { locale } = await params;
  const { t } = await initTranslations(locale, i18nNamespaces);
  const response = await fetch(`${apiPrivateUrl}/books`);

  if (!response.ok) throw new Error("Failed to fetch data");

  const books = await response.json();

  return (
    <div className={styles.bible}>
      <h1>{t("main.bible")}</h1>
      <div className={styles.bibleIndex}>
        {books.map((b: Book) => (
          <BookCover
            key={b.id}
            bookId={b.id}
            bookLen={BookMap[b.bookKey].len}
            bookKey={b.bookKey}
            locale={locale}
          />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
