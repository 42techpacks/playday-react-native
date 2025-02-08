import { StyleSheet } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { Link } from "expo-router";

export default function MusicServiceAuthScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title"> Login to Spotify</ThemedText>
      <Link href="/register/username">
        {" "}
        <ThemedText type="link"> Next </ThemedText>
      </Link>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
});
