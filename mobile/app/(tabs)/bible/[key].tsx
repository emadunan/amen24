import React, { FC } from "react";
import { useLocalSearchParams } from "expo-router";
import { createDrawerNavigator } from "@react-navigation/drawer";
import BibleChapter from "@/components/bible/BibleChapter";
import BookDrawerContent from "@/components/book-drawer/BookDrawerContent";
import BackBtn from "@/components/ui/BackBtn";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";

const Drawer = createDrawerNavigator();

const BookDrawer: FC = () => {
  const { key, bookId, bookLen, chapterNum } = useLocalSearchParams<{
    key: string;
    bookId: string;
    bookLen: string;
    chapterNum: string;
  }>();
  const chapters = Array.from({ length: parseInt(bookLen) }, (_, i) => i + 1);

  const colorScheme = useColorScheme();

  return (
    <Drawer.Navigator
      drawerContent={(props) => (
        <BookDrawerContent
          bookKey={key}
          bookId={bookId}
          bookLen={bookLen}
          currentChapter={chapterNum}
          navigation={props.navigation}
        />
      )}
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors[colorScheme ?? "light"].secondary,
        },
        drawerStyle: { width: 128 },
        headerLeft: () => (
          <BackBtn color={Colors[colorScheme ?? "light"].primary} />
        ),
      }}
    >
      {chapters.map((chapter) => (
        <Drawer.Screen
          key={chapter}
          name={`Chapter ${chapter}`}
          // initialParams={{ chapter }}
        >
          {() => <BibleChapter />}
        </Drawer.Screen>
      ))}
    </Drawer.Navigator>
  );
};

export default BookDrawer;
