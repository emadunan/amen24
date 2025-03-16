import React, { useCallback, useEffect, useRef, useState } from "react";
import styles from "./ChapterToolbox.module.css";
import { FaCopy, FaEraser } from "react-icons/fa";
import { RxDragHandleDots2 } from "react-icons/rx";
import { useTranslation } from "react-i18next";
import { useHighlightContext } from "./ChapterContent";
import { createPortal } from "react-dom";

const ChapterToolbox = () => {
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [dragging, setDragging] = useState(false);
  const offsetRef = useRef({ x: 0, y: 0 });

  const { clearHighlighted, copyHighlighted } = useHighlightContext();

  const { t } = useTranslation();

  const handleMouseDown = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      if ((e.target as HTMLElement).tagName === "BUTTON") return;
      e.preventDefault();
      setDragging(true);
      offsetRef.current = {
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      };
    },
    [position.x, position.y],
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!dragging) return;

      const newX = Math.max(
        0,
        Math.min(window.innerWidth - 200, e.clientX - offsetRef.current.x),
      );
      const newY = Math.max(
        0,
        Math.min(window.innerHeight - 100, e.clientY - offsetRef.current.y),
      );

      setPosition({ x: newX, y: newY });
    },
    [dragging],
  );

  const handleMouseUp = useCallback(() => setDragging(false), []);

  useEffect(() => {
    if (!dragging) return; // Only add listeners when dragging is true

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [dragging]);

  useEffect(() => {
    if (dragging) {
      document.body.style.userSelect = "none";
    } else {
      document.body.style.userSelect = "";
    }
  }, [dragging]);

  const toolboxComponent = (
    <div
      className={styles.toolbox}
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
