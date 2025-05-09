"use client"

import React from 'react';
import { RootState } from '@/store';
import { FaMusic, FaTimes } from 'react-icons/fa';
import styles from "./AudioPlayerToggleBtn.module.css";
import { useDispatch, useSelector } from 'react-redux';
import { toggle } from "../../store/slices/audioPlayerSlice";

const AudioPlayerToggleBtn = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state: RootState) => state.audioPlayer.isOpen);

  return (
    <button className={styles.toggleButton} onClick={() => dispatch(toggle())}>
      {isOpen ? <FaTimes /> : <FaMusic />}
    </button>
  )
}

export default AudioPlayerToggleBtn