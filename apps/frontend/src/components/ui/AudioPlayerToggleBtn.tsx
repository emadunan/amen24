"use client"

import React, { FC } from 'react';
import { RootState } from '@/store';
import { FaMusic, FaTimes } from 'react-icons/fa';
import styles from "./AudioPlayerToggleBtn.module.css";
import { useDispatch, useSelector } from 'react-redux';
import { toggle } from "../../store/slices/audioPlayerSlice";
import { ttsBooks } from '@/constants/ttsBooks';
import { BookKey } from '@amen24/shared';

interface Props {
  bookKey: BookKey;
}

const AudioPlayerToggleBtn: FC<Props> = ({ bookKey }) => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state: RootState) => state.audioPlayer.isOpen);

  if (!ttsBooks.includes(bookKey)) return null;

  return (
    <button className={styles.toggleButton} onClick={() => dispatch(toggle())}>
      {isOpen ? <FaTimes /> : <FaMusic />}
    </button>
  )
}

export default AudioPlayerToggleBtn