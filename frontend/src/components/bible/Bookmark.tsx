"use client";

import Link from "next/link";
import React, { useEffect, useState, useMemo } from "react";
import styles from "./Bookmark.module.css";
import { useGetUserBookmarksQuery } from "@/store/bookmarkApi";
import { useTranslation } from "react-i18next";
import { formatNumber, Lang } from "@amen24/shared";
import { useGetMeQuery } from "@/store/userApi";

const Bookmark = () => {
  const { data: bookmarks = [] } = useGetUserBookmarksQuery();
  const { data: user } = useGetMeQuery();
  const { t, i18n } = useTranslation("book");

  // Fix hydration issue: prevent rendering until after mount
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const bookmarkDetails = useMemo(() => {
    console.log(bookmarks[0]);
    
    if (!bookmarks.length) return "";
    const { title, bookKey, chapterNo, verseNo } = bookmarks[0];
    return `${t('bookmark.last_read')} | ${t(bookKey)} ${formatNumber(chapterNo, i18n.language as Lang)} : ${formatNumber(verseNo, i18n.language as Lang)}`;
  }, [bookmarks, t, i18n.language]);

  if (!user || !isClient) return null; // Ensure we render only on the client

  return (
    // TODO: Fix hydriation error, and retrieve total chapters of the target book
    <Link className={styles.bookmark} href={`/${bookmarks[0].bookKey}/${bookmarks[0].chapterNo}/${50}`}>
      {bookmarkDetails}
    </Link>
  );
};

export default Bookmark;
