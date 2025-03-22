import React, { useEffect, useRef, useState } from "react";
import styles from "./ChapterToolbox.module.css";
import { FaCopy, FaEraser, FaStar, FaBookmark } from "react-icons/fa";
import { RxDragHandleDots2 } from "react-icons/rx";
import { useTranslation } from "react-i18next";
import { useHighlightContext } from "./ChapterContent";
import { createPortal } from "react-dom";
import { useDraggable } from "@/hooks/useDraggable";
import { Bookmark } from "@amen24/shared";
import { useGetUserBookmarksQuery } from "@/store/bookmarkApi";

const ChapterToolbox = () => {
  const { clearHighlighted, copyHighlighted } = useHighlightContext();
  const { t, i18n } = useTranslation();
  const headerRef = useRef<HTMLDivElement | null>(null);

  const { position, handleMouseDown, elementRef } = useDraggable(
    5,
    5,
    i18n.language === "ar" ? false : true,
    i18n.language === "ar" ? 11 : 13,
    headerRef,
  );

  const [isOpen, setIsOpen] = useState(false);

  const { data: bookmarks } = useGetUserBookmarksQuery();

  function toggleBook() {
    setIsOpen((prev) => !prev);
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
        <button onClick={toggleBook}>
          <FaBookmark />
          وضع علامة كتاب
        </button>
        {isOpen && (
          <div className={styles.bookmarks}>
            {bookmarks?.map((bookmark) => (
              <button key={bookmark.id}>{bookmark.title}</button>
            ))}
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
