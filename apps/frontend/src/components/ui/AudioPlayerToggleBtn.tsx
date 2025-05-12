"use client";

import React, { FC } from "react";
import { RootState } from "@/store";
import { FaMusic, FaTimes } from "react-icons/fa";
import styles from "./AudioPlayerToggleBtn.module.css";
import { useDispatch, useSelector } from "react-redux";
import { toggle } from "../../store/slices/audioPlayerSlice";
import { ttsBooks } from "@/constants/ttsBooks";
import { BookKey, Lang } from "@amen24/shared";
import { ttsLangs } from "@/constants/ttsLangs";
import { useTranslation } from "react-i18next";

interface Props {
  bookKey: BookKey;
}

const AudioPlayerToggleBtn: FC<Props> = ({ bookKey }) => {
  const dispatch = useDispatch();
  const { i18n } = useTranslation();
  const isOpen = useSelector((state: RootState) => state.audioPlayer.isOpen);

  if (!ttsBooks.includes(bookKey) || !ttsLangs.includes(i18n.language as Lang))
    return null;

  return (
    <button className={styles.toggleButton} onClick={() => dispatch(toggle())}>
      {isOpen ? <FaTimes /> : <FaMusic />}
    </button>
  );
};

export default AudioPlayerToggleBtn;
