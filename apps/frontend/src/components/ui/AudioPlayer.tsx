"use client";

import { useRef, useState, useEffect } from "react";
import styles from "./AudioPlayer.module.css";
import {
  FaPlay,
  FaPause,
  FaVolumeUp,
  FaVolumeMute,
  FaStepForward,
  FaStepBackward,
} from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { useDraggable } from "@amen24/ui";

import { RxDragHandleDots2 } from "react-icons/rx";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { useParams, usePathname } from "next/navigation";
import { BookKey, BookMap, formatNumber, getDirection, isRtl, Lang } from "@amen24/shared";
import { ttsBooks } from "@/constants/ttsBooks";
import CloseDraggableBtn from "./CloseDraggableBtn";
import { close } from "../../store/slices/audioPlayerSlice";
import { ttsLangs } from "@/constants/ttsLangs";

const AudioPlayer: React.FC = () => {
  const { t, i18n } = useTranslation();
  const pathname = usePathname();
  const headerRef = useRef<HTMLDivElement | null>(null);
  const params = useParams<{ book: [BookKey, string, string] }>();
  const [bookKey, chapterNum] = params.book ?? [];
  const dispatch = useDispatch();

  const isRTL = isRtl(i18n.language as Lang);
  const isBookChapterPage = /^\/(?:[a-z]{2}\/)?bible\/([1-3]?[A-Z]{2,3})\/\d+\/\d+$/.test(pathname);

  const { isOpen } = useSelector((state: RootState) => state.audioPlayer);

  const { position, handleMouseDown, handleTouchStart, elementRef } =
    useDraggable(3, 0, isRTL, 10, headerRef);

  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !isOpen) return;

    const onTimeUpdate = () => {
      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100);
      }
    };

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onEnded = () => {
      setIsPlaying(false);
      setProgress(0);
      audio.currentTime = 0;
    };

    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.pause();
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("ended", onEnded);
      setIsPlaying(false);
      setIsMuted(false);
      setProgress(0);
    };
  }, [isOpen, bookKey, chapterNum]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      audio.play().catch((err) => console.error("Playback error:", err));
    } else {
      audio.pause();
    }
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = !audio.muted;
    setIsMuted(audio.muted);
  };

  const skip = (seconds: number) => {
    const audio = audioRef.current;
    if (audio && audio.duration) {
      const newTime = Math.min(
        Math.max(0, audio.currentTime + seconds),
        audio.duration,
      );
      audio.currentTime = newTime;
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    if (!audio || !audio.duration) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const ratio = isRTL ? 1 - clickX / rect.width : clickX / rect.width;
    const newTime = ratio * audio.duration;

    audio.currentTime = newTime;
    setProgress((newTime / audio.duration) * 100);
  };

  if (
    !isOpen ||
    !isBookChapterPage ||
    !ttsBooks.includes(bookKey) ||
    !ttsLangs.includes(i18n.language as Lang)
  )
    return null;

  const audioFileName = `${String(BookMap[bookKey].id).padStart(2, "0")}_${bookKey}__${String(chapterNum).padStart(3, "0")}`;
  const src = `/sound/chapters/${audioFileName}.mp3`;

  return (
    <div
      className={styles.player}
      dir={getDirection(i18n.language as Lang)}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      ref={elementRef}
      style={{ left: position.x, top: position.y }}
    >
      <div className={styles.header} ref={headerRef}>
        <RxDragHandleDots2 className={styles.dragIcon} />
        {`${t(`book:${bookKey}`)} ${formatNumber(+chapterNum, i18n.language as Lang)}` ||
          "Audio"}
        <CloseDraggableBtn absolute onClose={() => dispatch(close())} />
      </div>

      <audio key={audioFileName} ref={audioRef} src={src} preload="metadata" />

      <div className={styles.controls}>
        <button onClick={() => skip(-10)}>
          <FaStepBackward className={isRTL ? styles.iconRtl : ""} />
        </button>
        <button onClick={togglePlay} className={styles.play}>
          {isPlaying ? (
            <FaPause className={isRTL ? styles.iconRtl : ""} />
          ) : (
            <FaPlay className={isRTL ? styles.iconRtl : ""} />
          )}
        </button>
        <button onClick={() => skip(10)}>
          <FaStepForward className={isRTL ? styles.iconRtl : ""} />
        </button>
        <button onClick={toggleMute}>
          {isMuted ? (
            <FaVolumeMute className={isRTL ? styles.iconRtl : ""} />
          ) : (
            <FaVolumeUp className={isRTL ? styles.iconRtl : ""} />
          )}
        </button>
      </div>

      <div className={styles.progressBar} onClick={handleProgressClick}>
        <div className={styles.progress} style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
};

export default AudioPlayer;
