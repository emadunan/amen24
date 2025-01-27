import React, { FC } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { createDrawerNavigator } from "@react-navigation/drawer";
import BibleChapter from '@/components/bible/BibleChapter';
import BookDrawerContent from '@/components/book-drawer/BookDrawerContent';
import { Pressable } from 'react-native';
import { IconSymbol } from '@/components/ui/IconSymbol';

const Drawer = createDrawerNavigator();

const BookDrawer: FC = () => {
  const { key, bookId, bookLen, chapterNum } = useLocalSearchParams<{ key: string, bookId: string, bookLen: string, chapterNum: string }>();
  const chapters = Array.from({ length: parseInt(bookLen) }, (_, i) => i + 1);

  return (
    <Drawer.Navigator
      drawerContent={(props) => <BookDrawerContent bookKey={key} bookId={bookId} bookLen={bookLen} currentChapter={chapterNum} navigation={props.navigation} />}
      screenOptions={{
        headerStyle: { backgroundColor: "#f4f4f4" },
        drawerStyle: { width: 160 },
        headerLeft: () => <Pressable><IconSymbol name='chevron.right' color={`#000`} /></Pressable>
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
}

export default BookDrawer;