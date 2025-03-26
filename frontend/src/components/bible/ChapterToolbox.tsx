import React, { useEffect, useRef, useState } from "react";
import styles from "./ChapterToolbox.module.css";
import { FaCopy, FaEraser, FaStar } from "react-icons/fa";
import { MdPushPin } from "react-icons/md";
import { RxDragHandleDots2 } from "react-icons/rx";
import { useTranslation } from "react-i18next";
import { useHighlightContext } from "./ChapterContent";
import { createPortal } from "react-dom";
import { useDraggable } from "@/hooks/useDraggable";
import { BookKey, BookMap, formatNumber, Lang } from "@amen24/shared";
import {
  useGetUserLastReadBookmarkQuery,
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
    7,
    i18n.language === "ar" ? false : true,
    i18n.language === "ar" ? 11 : 13,
    headerRef,
  );

  const { data: user } = useGetMeQuery();
  const { data: bookmark } = useGetUserLastReadBookmarkQuery();

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  async function handleUpdateBookmark(
    bookmarkId?: number,
    profileEmail?: string,
  ) {
    const lastHighlighted = highlighted.at(-1);

    if (!lastHighlighted) {
      showToast("highlightVerse", "error");
      return;
    }

    if (!bookmarkId || !profileEmail) {
      showToast("unauthorizedAccess", "error");
      return;
    }

    try {
      await updateBookmark({
        id: bookmarkId,
        profileEmail,
        bookKey,
        chapterNo: Number(chapterNo),
        verseNo: lastHighlighted,
      });

      showToast(
        `(${t(bookKey)} ${formatNumber(+chapterNo, i18n.language as Lang)} : ${formatNumber(lastHighlighted, i18n.language as Lang)}) ${t("toolbox.lastReadSaved")}`,
        "success",
      );
    } catch (error) {
      if (error instanceof Error && error.message === "unauthorizedAccess") {
        showToast("unauthorizedAccess", "error");
      } else {
        showToast("unknownError", "error");
      }
    }
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

        {/* <button>
          <FaStar /> {t("toolbox.addToFavorites")}
        </button> */}
        {user && (
          <button
            className={styles.bookmark}
            onClick={handleUpdateBookmark.bind(this, bookmark?.id, user?.email)}
          >
            {isClient && <MdPushPin size="1.2rem" />}
            <div className={styles.bookmarkContent}>
              <p className={styles.bookmarkTitle}>{t("toolbox.bookmark")}</p>
              {bookmark && (
                <small className={styles.bookmarkRef}>
                  {t(bookmark.bookKey)} (
                  {formatNumber(bookmark.chapterNo, i18n.language as Lang)} :{" "}
                  {formatNumber(bookmark.verseNo, i18n.language as Lang)})
                </small>
              )}
            </div>
          </button>
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
