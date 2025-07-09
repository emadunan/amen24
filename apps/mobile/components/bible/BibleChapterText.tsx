import React, { FC, useEffect, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { useSQLiteContext } from "expo-sqlite";
import { BookKey } from "@amen24/shared";
import { useHighlightContext } from "@amen24/store";
import BibleChapterToolbox from "../chapter-toolbox/BibleChapterToolbox";
import ChapterTextTranslation from "./ChapterTextTranslation";
import ChapterTextWithTranslation from "./ChapterTextWithTranslation";
import { Verse, VerseWithTranslation } from "@/interfaces/verse";
import { type Verse as SharedVerse } from "@amen24/shared";
import { ThemedView } from "../ThemedView";

export type BibleLang = "en" | "ar" | "na";

function isVerseWithTranslationArray(
  arr: Verse[] | VerseWithTranslation[]
): arr is VerseWithTranslation[] {
  return arr.length > 0 && "text2Diacritized" in arr[0];
}

interface Props {
  uiLang: BibleLang;
  translationLang?: BibleLang;
  bookKey: BookKey;
  bookId: string;
  chapterNum: string;
  verseNum?: string;
}

const BibleChapterText: FC<Props> = ({
  uiLang,
  translationLang,
  bookKey,
  bookId,
  chapterNum,
  verseNum,
}) => {
  const db = useSQLiteContext();
  const { highlighted, toggleHighlight } = useHighlightContext();

  const [verses, setVerses] = useState<Verse[] | VerseWithTranslation[]>([]);

  const formattedVerses = verses.map((v) => {
    if ("text2Diacritized" in v) {
      // v is VerseWithTranslation
      return {
        id: v.id,
        num: v.num,
        verseTranslations: [
          { text: v.textDiacritized ?? "" },
          { text: v.text2Diacritized ?? "" },
        ],
      };
    }

    // v is Verse
    return {
      id: v.id,
      num: v.num,
      verseTranslations: [{ text: v.textDiacritized ?? "" }],
    };
  });

  useEffect(() => {
    const fetchChapter = async () => {
      console.log("QUERY PARAMS", {
        uiLang,
        translationLang,
        chapterNum,
        bookId,
      });

      if (translationLang) {
        const data = await db.getAllAsync<VerseWithTranslation>(
          `
            SELECT 
              v.id,
              v.num,
              vt1.text AS text,
              vt1.textDiacritized AS textDiacritized,
              vt2.text AS text2,
              vt2.textDiacritized AS text2Diacritized
            FROM verse v
            JOIN chapter c ON v.chapterId = c.id
            JOIN book b ON c.bookId = b.id
            LEFT JOIN verse_translation vt1 ON vt1.verseId = v.id AND vt1.lang = ?
            LEFT JOIN verse_translation vt2 ON vt2.verseId = v.id AND vt2.lang = ?
            WHERE c.num = ? AND b.id = ?
            ORDER BY v.num ASC
          `,
          [
            uiLang.trim().toLowerCase(),
            translationLang.trim().toLowerCase(),
            Number(chapterNum),
            Number(bookId)
          ]
        );
        console.log(data);

        setVerses(data);
      } else {
        const data = await db.getAllAsync<Verse>(
          `
          SELECT v.id, v.num, vt.text, vt.textDiacritized
          FROM verse v
          JOIN chapter c ON v.chapterId = c.id
          JOIN book b ON c.bookId = b.id
          JOIN verse_translation vt ON vt.verseId = v.id
          WHERE c.num = ? AND b.id = ? AND vt.lang = ?
          ORDER BY v.num ASC
        `,
          [chapterNum, bookId, uiLang]
        );
        setVerses(data);
      }

      // Highlight specific verse if requested
      if (verseNum) {
        const verseId = verses.find((v) => v.num === +verseNum)?.id;
        if (verseId) toggleHighlight(verseId);
      }
    };

    fetchChapter();
  }, [uiLang, translationLang, chapterNum, bookId]);

  function handleHighlight(verseId: number) {
    toggleHighlight(verseId);
  }

  return (
    <>
      <ScrollView>
        <ThemedView style={styles.translationsContainer}>
          {isVerseWithTranslationArray(verses) ? (
            <ChapterTextWithTranslation
              uiLang={uiLang}
              translationLang={translationLang!}
              verses={verses}
              highlighted={highlighted}
              onHighlight={handleHighlight}
            />
          ) : (
            <ChapterTextTranslation
              lang={uiLang}
              verses={verses}
              highlighted={highlighted}
              onHighlight={handleHighlight}
            />
          )}
        </ThemedView>
      </ScrollView>

      <BibleChapterToolbox
        bookKey={bookKey}
        chapterNum={+chapterNum}
        verses={formattedVerses as SharedVerse[]}
      />
    </>
  );
};

const styles = StyleSheet.create({
  translationsContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 32,
  },
});

export default BibleChapterText;
