import { StyleSheet } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import SignInButton from "@/components/sign-in-button";

export default function WelcomeBackScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title"> Welcome back!</ThemedText>
      <ThemedText type="subtitle">
        Github Oauth until we implement actual otp auth
      </ThemedText>
      <SignInButton />
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
