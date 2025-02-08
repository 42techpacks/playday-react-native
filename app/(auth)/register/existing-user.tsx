import { StyleSheet } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";

// We might not need this screen since the reason our reference has it
// is because they have more than one way to authenticate (apple and otp)
export default function ExistingUserScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title"> Already have an account?</ThemedText>
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
