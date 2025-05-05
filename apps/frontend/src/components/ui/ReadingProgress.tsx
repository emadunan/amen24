"use client";

import Link from "next/link";
import styles from "./ReadingProgress.module.css";
import { useGetUserLastReadProgressQuery } from "@/store/apis/progressApi";
import { useTranslation } from "react-i18next";
import { BookMap, formatNumber, Lang } from "@amen24/shared";
import { useGetMeQuery } from "@/store/apis/authApi";
import { useEffect } from "react";
import { useBreakpoint } from "@amen24/ui";

const ReadingProgress = () => {
  const { t, i18n } = useTranslation(["book"]);
  const { isLargePhone } = useBreakpoint();

  const { data: user } = useGetMeQuery();
  const { data: progress, refetch } = useGetUserLastReadProgressQuery(
    undefined,
    { skip: !user },
  );

  useEffect(() => {
    if (user) refetch();
  }, [user, refetch]);

  if (!user || !progress) return null;

  const bookKey = progress.verse.chapter.book.bookKey;
  const chapterNum = progress.verse.chapter.num;
  const verseNum = progress.verse.num;

  const chapterNumFormatted = formatNumber(chapterNum, i18n.language as Lang);
  const verseNumFormatted = formatNumber(verseNum, i18n.language as Lang);

  return (
    <Link
      className={styles.progress}
      href={`/${bookKey}/${chapterNum}/${BookMap[bookKey].len}`}
    >
      {/* This MdPushPin cause hydration error, so I need to finds a solution first then add it */}
      {/* <MdPushPin /> */}
      <span>{t("progress.lastRead")}</span>
      {!isLargePhone && (
        <span>
          {" "}
          | {t(`book:${bookKey}`)} {chapterNumFormatted} : {verseNumFormatted}
        </span>
      )}
    </Link>
  );
};

export default ReadingProgress;
