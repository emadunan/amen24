import React, { useRef, useState } from "react";
import styles from "./ChapterToolbox.module.css";
import {
  FaCopy,
  FaEraser,
  FaStar,
  FaBookmark,
  FaTrash,
  FaPen,
} from "react-icons/fa";
import { RxDragHandleDots2 } from "react-icons/rx";
import { useTranslation } from "react-i18next";
import { useHighlightContext } from "./ChapterContent";
import { createPortal } from "react-dom";
import { useDraggable } from "@/hooks/useDraggable";
import { BookKey, formatNumber, Lang } from "@amen24/shared";
import {
  useGetUserBookmarksQuery,
  useUpdateBookmarkMutation,
} from "@/store/bookmarkApi";
import { useGetMeQuery } from "@/store/userApi";
import { showToast } from "@/utils/toast";
import { useParams } from "next/navigation";

const ChapterToolbox = () => {
  const { clearHighlighted, copyHighlighted, highlighted } =
    useHighlightContext();
  const { t, i18n } = useTranslation(["book"]);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const [updateBookmark, { isSuccess }] = useUpdateBookmarkMutation();
  const params = useParams<{ book: [BookKey, string, string] }>();
  const [bookKey, chapterNo] = params.book;

  const { position, handleMouseDown, elementRef } = useDraggable(
    5,
    5,
    i18n.language === "ar" ? false : true,
    i18n.language === "ar" ? 11 : 13,
    headerRef,
  );

  const [isOpen, setIsOpen] = useState(false);

  const { data: user } = useGetMeQuery();
  const { data: bookmarks } = useGetUserBookmarksQuery();

  function toggleBook() {
    setIsOpen((prev) => !prev);
  }

  function handleUpdateBookmark(bookmarkId: number, profileEmail: string) {
    if (highlighted.length > 1) {
      showToast(t("error.highlightSingleVerseOnly"), "error");
    }

    updateBookmark({
      id: bookmarkId,
      profileEmail,
      bookKey,
      chapterNo: +chapterNo,
      verseNo: highlighted[0],
    });
  }

  const toolboxComponent = (
    <div
      className={styles.toolbox}
      ref={elementRef}
      onMouseDown={handleMouseDown}
      style={{
        left: position.x,
        top: position.y,
        width: i18n.language === "ar" ? "11rem" : "13rem",
      }}
    >
      <div className={styles.toolboxHeader} ref={headerRef}>
        <RxDragHandleDots2 />
        <h4>{t("toolbox.title")}</h4>
      </div>
      <div className={styles.toolboxContainer}>
        <button onClick={copyHighlighted}>
          <FaCopy /> {t("toolbox.copy")}
        </button>
        <button>
          <FaStar /> {t("toolbox.addToFavorites")}
        </button>
        {user && (
          <button onClick={toggleBook}>
            <FaBookmark /> {t("toolbox.bookmark")}
          </button>
        )}

        {isOpen && (
          <div className={styles.bookmarks}>
            {bookmarks
              ?.slice() // Avoid mutating the original array
              .sort(
                (a, b) =>
                  new Date(b.updatedAt).getTime() -
                  new Date(a.updatedAt).getTime(),
              )
              .map((bookmark) => {
                const formattedChapterNo = formatNumber(
                  bookmark.chapterNo,
                  i18n.language as Lang,
                );
                const formattedVerseNo = formatNumber(
                  bookmark.verseNo,
                  i18n.language as Lang,
                );
                return (
                  <button
                    key={bookmark.id}
                    className={styles.bookmarkButton}
                    onClick={handleUpdateBookmark.bind(
                      this,
                      bookmark.id,
                      bookmark.profileEmail,
                    )}
                  >
                    <div className={styles.bookmarkContent}>
                      <span className={styles.bookmarkTitle}>
                        {bookmark.title}
                      </span>
                      <span className={styles.bookmarkRef}>
                        {t(bookmark.bookKey)} {formattedChapterNo} :{" "}
                        {formattedVerseNo}
                      </span>
                    </div>
                  </button>
                );
              })}
            {bookmarks?.length! <= 2 && <button>إنشاء علامة جديدة</button>}
          </div>
        )}
        <button onClick={clearHighlighted}>
          <FaEraser /> {t("toolbox.clearHighlighting")}
        </button>
      </div>
    </div>
  );

  return createPortal(toolboxComponent, document.body);
};

export default ChapterToolbox;
