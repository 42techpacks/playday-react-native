import { StyleSheet } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { Link } from "expo-router";

export default function ProfileImageScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title"> Add a profile image</ThemedText>
      <Link href="/(auth)/register/finish">
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
