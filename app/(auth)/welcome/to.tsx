import { StyleSheet } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import SignInWithGithub from "@/components/auth-inputs/SignInWithGithub";

export default function WelcomeToScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title"> Welcome to [untitled]</ThemedText>
      <ThemedText type="subtitle">
        Github Oauth until we implement actual otp auth
      </ThemedText>
      <SignInWithGithub />
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
