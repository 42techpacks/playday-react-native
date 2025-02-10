import { StyleSheet } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { Link } from "expo-router";

export default function UsernameScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title"> Choose a username</ThemedText>
      <Link href="/register/pfp">
        {" "}
        <ThemedText type="link"> Next</ThemedText>{" "}
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
