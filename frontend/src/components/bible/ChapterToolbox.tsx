import React, { useEffect, useState } from "react";
import styles from "./ChapterToolbox.module.css";
import { FaCopy, FaStar, FaEraser } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { useHighlightContext } from "./ChapterContent";

const ChapterToolbox = () => {
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const { clearHighlighted } = useHighlightContext();

  const { t } = useTranslation();

  function handleMouseDown(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    setDragging(true);

    setOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  }

  function handleMouseUp() {
    setDragging(false);
  }

  function handleMouseMove(e: MouseEvent) {
    if (dragging) {
      setPosition({
        x: e.clientX - offset.x,
        y: e.clientY - offset.y,
      });
    }
  }

  useEffect(() => {
    if (dragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    } else {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [dragging]);

  return (
    <div
      className={styles.toolbox}
      onMouseDown={handleMouseDown}
      style={{
        left: position.x,
        top: position.y,
      }}
    >
      <h4>{t("toolbox.title")}</h4>
      <div className={styles.toolboxContainer}>
        <button>
          <FaCopy /> {t("toolbox.copy")}
        </button>
        {/* <button><FaStar /> {t('toolbox.addToFavorites')}</button> */}
        <button onClick={clearHighlighted}>
          <FaEraser /> {t("toolbox.clearHighlighting")}
        </button>
      </div>
    </div>
  );
};

export default ChapterToolbox;
