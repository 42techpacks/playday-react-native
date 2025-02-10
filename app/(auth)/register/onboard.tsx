import { StyleSheet } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { Link } from "expo-router";

export default function OnboardScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title"> Browse our features</ThemedText>
      <Link href="/welcome/to">
        <ThemedText type="link"> Continue</ThemedText>
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
