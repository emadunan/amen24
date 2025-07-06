import React, { FC } from "react";
import { useLocalSearchParams } from "expo-router";
import { createDrawerNavigator } from "@react-navigation/drawer";
import BibleChapter from "@/components/bible/BibleChapter";
import BookDrawerContent from "@/components/book-drawer/BookDrawerContent";
import BackBtn from "@/components/ui/BackBtn";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants";

const Drawer = createDrawerNavigator();

const BookDrawer: FC = () => {
  const { bookKey, bookId, bookLen, chapterNum } = useLocalSearchParams<{
    bookKey: string;
    bookId: string;
    bookLen: string;
    chapterNum: string;
  }>();
  const chapters = Array.from({ length: parseInt(bookLen) }, (_, i) => i + 1);
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? "light"];

  return (
    <Drawer.Navigator
      key={bookKey}
      drawerContent={(props) => (
        <BookDrawerContent
          bookKey={bookKey}
          bookId={bookId}
          bookLen={bookLen}
          currentChapter={chapterNum}
          navigation={props.navigation}
        />
      )}
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.secondary,
        },
        headerTitleStyle: {
          fontFamily: "AmiriBold",
        },
        drawerStyle: {
          width: 128,
          backgroundColor: theme.background,
        },
        headerLeft: () => (
          <BackBtn color={theme.primary} />
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
