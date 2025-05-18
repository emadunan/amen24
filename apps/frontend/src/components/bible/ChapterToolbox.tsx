import React, { Fragment, useEffect, useRef, useState } from "react";
import styles from "./ChapterToolbox.module.css";
import { FaCopy, FaEraser, FaStar, FaBookOpen } from "react-icons/fa";
import { MdPushPin } from "react-icons/md";
import { RxDragHandleDots2 } from "react-icons/rx";
import { HiSparkles } from "react-icons/hi2";
import { useTranslation } from "react-i18next";
import { useHighlightContext } from "./ChapterContent";
import { createPortal } from "react-dom";
import { isRtl, useDraggable, useFeedback } from "@amen24/ui";
import {
  ERROR_KEYS,
  Lang,
  MESSAGE_KEYS,
  Permission,
  formatNumber,
  hasPermission,
} from "@amen24/shared";
import {
  useGetUserLastReadProgressQuery,
  useUpdateProgressMutation,
} from "@/store/apis/progressApi";
import { useGetMeQuery } from "@/store/apis/authApi";
import { useAddFavoriteMutation } from "@/store/apis/favoriteApi";
import CloseDraggableBtn from "../ui/CloseDraggableBtn";
import { useAddToFeaturedMutation } from "@/store/apis/featuredApi";
import ToggleDraggableBtn from "../ui/ToggleDraggableBtn";
import GlossaryModal from "../chapter-toolbox/GlossaryModal";

const ChapterToolbox = () => {
  const { clearHighlighted, copyHighlighted, highlighted } =
    useHighlightContext();

  const lastHighlighted = highlighted.at(-1);

  const { t, i18n } = useTranslation();
  const isRTL = isRtl(i18n.language as Lang);

  const headerRef = useRef<HTMLDivElement | null>(null);
  const [updateProgress] = useUpdateProgressMutation();
  const { showApiError, showError, showMessage } = useFeedback(t);
  const { position, handleMouseDown, elementRef, handleTouchStart } =
    useDraggable(5, 7, !isRTL, i18n.language === "ar" ? 9 : 11, headerRef);

  const { data: user } = useGetMeQuery();
  const { data: progress } = useGetUserLastReadProgressQuery();
  const [addFavorite] = useAddFavoriteMutation();
  const [addFeatured] = useAddToFeaturedMutation();

  const [isGlossaryModalOpen, setIsGlossaryModalOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);

  function handleCloseGlossaryModal() {
    setIsGlossaryModalOpen(false);
  }

  useEffect(() => {
    setIsClient(true);
  }, []);

  function handleIsExpanded() {
    setIsExpanded((prev) => !prev);
  }

  async function handleUpdateProgress(
    progressId?: number,
    profileEmail?: string,
  ) {
    if (!lastHighlighted) {
      showError(ERROR_KEYS.HIGHLIGHT_VERSE);
      return;
    }

    if (!progressId || !profileEmail) {
      showError(ERROR_KEYS.UNAUTHORIZED_ACCESS);
      return;
    }

    try {
      const progress = await updateProgress({
        id: progressId,
        profileEmail,
        verseId: lastHighlighted,
      });

      const bookKey = progress.data?.verse.chapter.book.bookKey;
      const chapterNum = progress.data?.verse.chapter.num;
      const verseNum = progress.data?.verse.num;

      if (!bookKey || !chapterNum || !verseNum) {
        showError(ERROR_KEYS.UNKNOWN_ERROR);
        return;
      }

      showMessage(
        `(${t(`book:${bookKey}`)} ${formatNumber(chapterNum, i18n.language as Lang)} : ${formatNumber(verseNum, i18n.language as Lang)}) ${t("toolbox.lastReadSaved")}`,
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

  async function handleAddFeatured() {
    try {
      await addFeatured(highlighted).unwrap();
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
        width: i18n.language === "ar" ? "9rem" : "11rem",
      }}
    >
      {lastHighlighted && (
        <GlossaryModal
          isOpen={isGlossaryModalOpen}
          onClose={handleCloseGlossaryModal}
          verseId={lastHighlighted}
        />
      )}
      <div className={styles.toolboxHeader} ref={headerRef}>
        <RxDragHandleDots2 className={styles.dragIcon} />
        <h4>{t("toolbox.title")}</h4>
        <CloseDraggableBtn onClose={clearHighlighted} />
        <ToggleDraggableBtn
          onToggle={handleIsExpanded}
          isExpanded={isExpanded}
        />
      </div>
      {isExpanded && (
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
                className={styles.progress}
                onClick={handleUpdateProgress.bind(
                  this,
                  progress?.id,
                  user?.email,
                )}
              >
                {isClient && <MdPushPin size="1.2rem" />}
                <div className={styles.progressContent}>
                  <p className={styles.progressTitle}>
                    {t("toolbox.progress")}
                  </p>
                  {progress && (
                    <small className={styles.progressRef}>
                      {t(`book:${progress.verse.chapter.book.bookKey}`)} (
                      {formatNumber(
                        progress.verse.chapter.num,
                        i18n.language as Lang,
                      )}{" "}
                      :{" "}
                      {formatNumber(progress.verse.num, i18n.language as Lang)})
                    </small>
                  )}
                </div>
              </button>
            </Fragment>
          )}

          {user &&
            hasPermission(user.profile.roles, Permission.MANAGE_FEATURED) && (
              <button onClick={() => setIsGlossaryModalOpen(true)}>
                <FaBookOpen /> {t("toolbox.addToGlossary")}
              </button>
            )}

          {user &&
            hasPermission(user.profile.roles, Permission.MANAGE_FEATURED) && (
              <button onClick={handleAddFeatured}>
                <HiSparkles /> {t("toolbox.addToFeatured")}
              </button>
            )}

          <button onClick={clearHighlighted} className={styles.eraserBtn}>
            <FaEraser /> {t("toolbox.clearHighlighting")}
          </button>
        </div>
      )}
    </div>
  );

  return createPortal(toolboxComponent, document.body);
};

export default ChapterToolbox;
