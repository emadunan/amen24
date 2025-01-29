import { Button, Pressable, StyleSheet, TextInput, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Feather } from "@expo/vector-icons";

export default function TabTwoScreen() {
  return (
    <ThemedView style={styles.container}>
      <View style={styles.searchGroup}>
        <TextInput style={styles.searchInput}/>
        <Pressable style={styles.searchBtn}>
          <Feather name="search" size={32} color={"black"} />
        </Pressable>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16
  },
  searchGroup: {
    flexDirection: "row",
    alignItems: "center",
  },
  searchInput: {
    flex: 1,
    paddingHorizontal: 12,
    borderRadius: 2,
    borderWidth: 1,
    borderColor: "#000",
  },
  searchBtn: {
    marginLeft: 8,
  }

});
