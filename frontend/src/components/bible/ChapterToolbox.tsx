import React from "react";
import styles from "./ChapterToolbox.module.css";
import { FaCopy, FaEraser } from "react-icons/fa";
import { RxDragHandleDots2 } from "react-icons/rx";
import { useTranslation } from "react-i18next";
import { useHighlightContext } from "./ChapterContent";
import { createPortal } from "react-dom";
import { useDraggable } from "@/hooks/useDraggable";

const ChapterToolbox = () => {
  const { clearHighlighted, copyHighlighted } = useHighlightContext();
  const { t } = useTranslation();

  const { position, handleMouseDown, elementRef } = useDraggable(100, 100);

  const toolboxComponent = (
    <div
      className={styles.toolbox}
      ref={elementRef}
      onMouseDown={handleMouseDown}
      style={{
        left: position.x,
        top: position.y,
      }}
    >
      <div className={styles.toolboxHeader}>
        <RxDragHandleDots2 />
        <h4>{t("toolbox.title")}</h4>
      </div>
      <div className={styles.toolboxContainer}>
        <button onClick={copyHighlighted}>
          <FaCopy /> {t("toolbox.copy")}
        </button>
        {/* <button><FaStar /> {t('toolbox.addToFavorites')}</button> */}
        <button onClick={clearHighlighted}>
          <FaEraser /> {t("toolbox.clearHighlighting")}
        </button>
      </div>
    </div>
  );

  return createPortal(toolboxComponent, document.body);
};

export default ChapterToolbox;
