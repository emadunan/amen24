import React from "react";
import { Colors } from "@/constants";
import { MaterialIcons } from "@expo/vector-icons";
import { useColorScheme } from "react-native";
import { useGetUserLastReadProgressQuery } from "@/store/apis/progressApi";
import { useGetMeQuery } from "@/store/apis/authApi";
import { Link } from "expo-router";
import { BookMap } from "@amen24/shared";

const ReadingProgress = () => {
  const colorScheme = useColorScheme();
  const pushPinColor = Colors[colorScheme ?? "light"].primary;

  const { data: user } = useGetMeQuery();
  const { data: progress, refetch } = useGetUserLastReadProgressQuery(
    undefined,
    { skip: !user },
  );

  if (!user || !progress) return null;

  const bookId = progress.verse.chapter.book.id;
  const bookKey = progress.verse.chapter.book.bookKey;
  const chapterNum = progress.verse.chapter.num;
  const verseNum = progress.verse.num;

  return (
    <Link
      href={`/(tabs)/bible/${bookKey}?bookId=${bookId}&bookLen=${BookMap[bookKey].len}&chapterNum=${chapterNum}`}
    >
      <MaterialIcons name="push-pin" size={22} color={pushPinColor} />
    </Link>
  );
};

export default ReadingProgress;
