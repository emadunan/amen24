"use client";

import Link from "next/link";
import styles from "./Bookmark.module.css";
import { useGetUserLastReadBookmarkQuery } from "@/store/bookmarkApi";
import { useTranslation } from "react-i18next";
import { BookMap, formatNumber, Lang } from "@amen24/shared";
import { useGetMeQuery } from "@/store/userApi";
import { MdPushPin } from "react-icons/md";


const Bookmark = () => {
  const { data: bookmark } = useGetUserLastReadBookmarkQuery();
  const { data: user } = useGetMeQuery();
  const { t, i18n } = useTranslation("book");

  if (!user || !bookmark) return null;

  const chapterNo = formatNumber(bookmark.chapterNo, i18n.language as Lang);
  const verseNo = formatNumber(bookmark.verseNo, i18n.language as Lang);
    
  return (
    <Link className={styles.bookmark} href={`/${bookmark.bookKey}/${bookmark.chapterNo}/${BookMap[bookmark.bookKey].len}`}>
      {/* This MdPushPin cause hydration error, so I need to finds a solution first then add it */}
      {/* <MdPushPin /> */}
      {t("bookmark.last_read")} | {t(bookmark.bookKey)} {chapterNo} : {verseNo}
    </Link>
  );
};

export default Bookmark;
