import { StyleSheet } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { Link} from "expo-router";

export default function LandingScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title"> The landing page.</ThemedText>
      <ThemedText type="subtitle">
        See Figma for what it should look like
      </ThemedText>
      <Link href="/identify/phone">
        {" "}
        <ThemedText type="link"> Sign In With Phone Number </ThemedText>
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
