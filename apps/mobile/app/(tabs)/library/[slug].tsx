import React, { FC } from "react";
import { useLocalSearchParams } from "expo-router";
import { createDrawerNavigator } from "@react-navigation/drawer";
import BackBtn from "@/components/ui/BackBtn";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants";
import LibraryBookDrawerContent from "@/components/library/LibraryDrawerContent";
import { useGetLibraryBookQuery } from "@/store/apis/libraryApi";
import LibraryChapter from "@/components/library/LibraryChapter";

const Drawer = createDrawerNavigator();

const LibraryBookDrawer: FC = () => {
  const { slug, current } = useLocalSearchParams<{
    slug: string;
    current: string;
  }>();

  const { data: libBook } = useGetLibraryBookQuery(slug);
  const chapters = libBook?.chapters;

  const colorScheme = useColorScheme();

  if (!chapters) return null;

  return (
    <Drawer.Navigator
      key={slug}
      drawerContent={(props) => (
        <LibraryBookDrawerContent
          slug={slug}
          current={current}
          chapters={chapters}
          navigation={props.navigation}
        />
      )}
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors[colorScheme ?? "light"].secondary,
        },
        headerTitleStyle: {
          fontFamily: "AmiriBold",
        },
        drawerStyle: {
          width: 228,
          backgroundColor: Colors[colorScheme ?? "light"].background,
        },
        headerLeft: () => (
          <BackBtn color={Colors[colorScheme ?? "light"].primary} uri={"/(tabs)/library"}/>
        ),
      }}
    >
      {chapters.map((chapter) => (
        <Drawer.Screen
          key={chapter.id}
          name={chapter.id}
        >
          {() => <LibraryChapter />}
        </Drawer.Screen>
      ))}
    </Drawer.Navigator>
  );
};

export default LibraryBookDrawer;
