"use client";

import { useGetLibraryBookQuery } from "@/store/apis/libraryApi";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import styles from "./LibraryBook.module.css";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { useBreakpoint } from "@amen24/ui";
import { useTranslation } from "react-i18next";
import { getDirection } from "@amen24/shared";

const LibraryBook: React.FC = () => {
  const { t } = useTranslation();
  const params = useParams<{ slug: string }>();
  const slug = params.slug;

  const { isTablet } = useBreakpoint();

  const skip = !slug;
  const { data } = useGetLibraryBookQuery(slug || "", { skip });

  const [selectedId, setSelectedId] = useState<string | undefined>(undefined);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    setSelectedId(data?.chapters.find((ch) => ch.order === 1)?.id);
  }, [data]);

  const renderChapterList = () => (
    <ul>
      {data?.chapters.map((ch) => (
        <li
          key={ch.id}
          className={ch.id === selectedId ? styles.selected : ""}
          onClick={() => {
            setSelectedId(ch.id);
            setDrawerOpen(false);
          }}
        >
          {ch.title}
        </li>
      ))}
    </ul>
  );

  const dir = data?.lang ? getDirection(data.lang) : undefined;

  if (!dir) return <span>Loading ...</span>;

  return (
    <div className={styles.container} dir={dir}>
      {hasMounted && isTablet ? (
        <>
          <button
            className={styles.toggleButton}
            onClick={() => setDrawerOpen(true)}
          >
            {t("library.index")} ▾
          </button>
          {drawerOpen && (
            <div className={styles.drawer}>
              <div className={styles.drawerHeader}>
                <h2>{data?.title}</h2>
                <button
                  className={styles.closeButton}
                  onClick={() => setDrawerOpen(false)}
                >
                  ✕
                </button>
              </div>
              {renderChapterList()}
            </div>
          )}
        </>
      ) : (
        <aside className={styles.aside}>
          <h2>{data?.title}</h2>
          {renderChapterList()}
        </aside>
      )}

      <article className={styles.content}>
        <Markdown rehypePlugins={[rehypeRaw]}>
          {`# ${data?.chapters.find((ch) => ch.id === selectedId)?.title}`}
        </Markdown>
        <Markdown rehypePlugins={[rehypeRaw]}>
          {data?.chapters.find((ch) => ch.id === selectedId)?.content}
        </Markdown>
      </article>
    </div>
  );
};

export default LibraryBook;
