import SignOutButton from "@/components/auth-inputs/SignOutButton";
import SpotifyAuthButton from "@/components/spotify/spotify-auth-button";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Link } from "expo-router";
import { Pressable, StyleSheet } from "react-native";

export default function SettingsScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedView style={{ alignItems: "center" }}>
        <ThemedText type="title">Account Actions</ThemedText>
      </ThemedView>
      <Link href="/create-modal" asChild>
        <Pressable style={styles.buttonContainer}>
          <ThemedText type="defaultSemiBold">Create Post</ThemedText>
        </Pressable>
      </Link>
      <SignOutButton />
      <SpotifyAuthButton />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 8,
    padding: 10,
    alignItems: "center",
  },
  buttonContainer: {
    width: "50%",
    height: "5%",
    backgroundColor: "#fff",
    borderRadius: 50,
    borderColor: "#000",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
