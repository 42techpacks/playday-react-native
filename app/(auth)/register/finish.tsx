import { StyleSheet } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { Link } from "expo-router";

export default function FinishScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title"> Finish</ThemedText>
      {/* TODO(kenny): We need another context provider for profile auth info and we
       drive navigation to all screens in this register flow using that */}
      <Link href="/register/onboard">
        <ThemedText type="link"> Finish</ThemedText>
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
