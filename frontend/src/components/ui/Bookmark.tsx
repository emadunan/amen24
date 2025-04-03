"use client";

import Link from "next/link";
import styles from "./Bookmark.module.css";
import { useGetUserLastReadBookmarkQuery } from "@/store/bookmarkApi";
import { useTranslation } from "react-i18next";
import { BookMap, formatNumber, Lang } from "@amen24/shared";
import { useGetMeQuery } from "@/store/userApi";
import { useEffect } from "react";
import useBreakpoint from "@/hooks/useBreakpoint";

const Bookmark = () => {
  const { t, i18n } = useTranslation("book");
  const { isLargePhone } = useBreakpoint();

  const { data: user } = useGetMeQuery();
  const { data: bookmark, refetch } = useGetUserLastReadBookmarkQuery(
    undefined,
    { skip: !user },
  );

  useEffect(() => {
    if (user) refetch();
  }, [user, refetch]);

  if (!user || !bookmark) return null;

  const chapterNo = formatNumber(bookmark.chapterNo, i18n.language as Lang);
  const verseNo = formatNumber(bookmark.verseNo, i18n.language as Lang);

  return (
    <Link
      className={styles.bookmark}
      href={`/${bookmark.bookKey}/${bookmark.chapterNo}/${BookMap[bookmark.bookKey].len}`}
    >
      {/* This MdPushPin cause hydration error, so I need to finds a solution first then add it */}
      {/* <MdPushPin /> */}
      <span>{t("bookmark.last_read")}</span>
      {!isLargePhone && (
        <span>
          {" "}
          | {t(bookmark.bookKey)} {chapterNo} : {verseNo}
        </span>
      )}
    </Link>
  );
};

export default Bookmark;
