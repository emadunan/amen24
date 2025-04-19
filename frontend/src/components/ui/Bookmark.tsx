"use client";

import Link from "next/link";
import styles from "./Bookmark.module.css";
import { useGetUserLastReadBookmarkQuery } from "@/store/bookmarkApi";
import { useTranslation } from "react-i18next";
import { BookMap, formatNumber, Lang } from "@amen24/shared";
import { useGetMeQuery } from "@/store/authApi";
import { useEffect } from "react";
import {useBreakpoint} from "@amen24/ui";

const Bookmark = () => {
  const { t, i18n } = useTranslation(["book"]);
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

  const bookKey = bookmark.verse.chapter.book.bookKey;
  const chapterNum = bookmark.verse.chapter.num;
  const verseNum = bookmark.verse.num;

  const chapterNumFormatted = formatNumber(chapterNum, i18n.language as Lang);
  const verseNumFormatted = formatNumber(verseNum, i18n.language as Lang);

  return (
    <Link
      className={styles.bookmark}
      href={`/${bookKey}/${chapterNum}/${BookMap[bookKey].len}`}
    >
      {/* This MdPushPin cause hydration error, so I need to finds a solution first then add it */}
      {/* <MdPushPin /> */}
      <span>{t("bookmark.last_read")}</span>
      {!isLargePhone && (
        <span>
          {" "}
          | {t(`book:${bookKey}`)} {chapterNumFormatted} : {verseNumFormatted}
        </span>
      )}
    </Link>
  );
};

export default Bookmark;
