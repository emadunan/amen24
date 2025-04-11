import React, { Fragment, useEffect, useRef, useState } from "react";
import styles from "./ChapterToolbox.module.css";
import { FaCopy, FaEraser, FaStar } from "react-icons/fa";
import { MdPushPin } from "react-icons/md";
import { RxDragHandleDots2 } from "react-icons/rx";
import { useTranslation } from "react-i18next";
import { useHighlightContext } from "./ChapterContent";
import { createPortal } from "react-dom";
import { useDraggable } from "@/hooks/useDraggable";
import { ERROR_KEYS, Lang, MESSAGE_KEYS, formatNumber } from "@amen24/shared";
import {
  useGetUserLastReadBookmarkQuery,
  useUpdateBookmarkMutation,
} from "@/store/bookmarkApi";
import { useGetMeQuery } from "@/store/userApi";
import { useShowError } from "@/hooks/useShowError";
import { useShowMessage } from "@/hooks/useShowMessage";
import { useAddFavoriteMutation } from "@/store/favoriteApi";

const ChapterToolbox = () => {
  const { clearHighlighted, copyHighlighted, highlighted } =
    useHighlightContext();
  const { t, i18n } = useTranslation(["book", "error"]);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const [updateBookmark] = useUpdateBookmarkMutation();
  const { showApiError, showError } = useShowError();
  const { showMessage } = useShowMessage();
  const { position, handleMouseDown, elementRef, handleTouchStart } =
    useDraggable(
      5,
      7,
      i18n.language === "ar" ? false : true,
      i18n.language === "ar" ? 11 : 13,
      headerRef,
    );

  const { data: user } = useGetMeQuery();
  const { data: bookmark } = useGetUserLastReadBookmarkQuery();
  const [addFavorite] = useAddFavoriteMutation();

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
      showError(ERROR_KEYS.HIGHLIGHT_VERSE);
      return;
    }

    if (!bookmarkId || !profileEmail) {
      showError(ERROR_KEYS.UNAUTHORIZED_ACCESS);
      return;
    }

    try {
      const bookmark = await updateBookmark({
        id: bookmarkId,
        profileEmail,
        verseId: lastHighlighted,
      });

      const bookKey = bookmark.data?.verse.chapter.book.bookKey;
      const chapterNum = bookmark.data?.verse.chapter.num;
      const verseNum = bookmark.data?.verse.num;

      if (!bookKey || !chapterNum || !verseNum) {
        showError(ERROR_KEYS.UNKNOWN_ERROR);
        return;
      }

      showMessage(
        `(${t(bookKey)} ${formatNumber(chapterNum, i18n.language as Lang)} : ${formatNumber(verseNum, i18n.language as Lang)}) ${t("toolbox.lastReadSaved")}`,
        "success",
      );
    } catch (error) {
      console.error(error);
      showApiError(error);
    }
  }

  async function handleAddFavorite() {
    try {
      await addFavorite(highlighted).unwrap();
      showMessage(MESSAGE_KEYS.ADDED_TO_FAVORITES);
    } catch (error) {
      showApiError(error);
    }
  }

  const toolboxComponent = (
    <div
      className={styles.toolbox}
      ref={elementRef}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
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

        {user && (
          <Fragment>
            <button onClick={handleAddFavorite}>
              <FaStar /> {t("toolbox.addToFavorites")}
            </button>

            <button
              className={styles.bookmark}
              onClick={handleUpdateBookmark.bind(
                this,
                bookmark?.id,
                user?.email,
              )}
            >
              {isClient && <MdPushPin size="1.2rem" />}
              <div className={styles.bookmarkContent}>
                <p className={styles.bookmarkTitle}>{t("toolbox.bookmark")}</p>
                {bookmark && (
                  <small className={styles.bookmarkRef}>
                    {t(bookmark.verse.chapter.book.bookKey)} (
                    {formatNumber(
                      bookmark.verse.chapter.num,
                      i18n.language as Lang,
                    )}{" "}
                    : {formatNumber(bookmark.verse.num, i18n.language as Lang)})
                  </small>
                )}
              </div>
            </button>
          </Fragment>
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
