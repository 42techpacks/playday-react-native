import { Button, ActivityIndicator, View, StyleSheet } from "react-native";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useSpotifyAuth } from "@/hooks/useSpotifyAuth";
import { ThemedText } from "@/components/ThemedText";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

export default function SpotifyAuthButton() {
  const registrationStatus = useQuery(api.auth.checkRegistrationStatus);
  const { isLoading, authenticateWithSpotify } = useSpotifyAuth();
  const [authInProgress, setAuthInProgress] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const queryClient = useQueryClient();

  async function handleAuthenticatePress() {
    try {
      setAuthInProgress(true);
      setAuthError(null);
      const success = await authenticateWithSpotify();

      if (success) {
        // Invalidate all convex queries to trigger a re-fetch
        queryClient.invalidateQueries({ queryKey: ["convex"] });
      } else {
        setAuthError("Authentication failed. Please try again.");
      }
    } catch (error) {
      console.error("Authentication failed:", error);
      setAuthError("Authentication failed. Please try again.");
    } finally {
      setAuthInProgress(false);
    }
  }

  if (authInProgress) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="small" color="#000" />
        <ThemedText style={styles.loadingText}>
          Connecting to Spotify...
        </ThemedText>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Button
        onPress={handleAuthenticatePress}
        title={
          registrationStatus?.hasSpotifyTokens
            ? "Connected to Spotify"
            : "Authenticate w/ Spotify"
        }
        disabled={isLoading}
      />
      {authError && (
        <ThemedText style={styles.errorText}>{authError}</ThemedText>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 8,
    fontSize: 14,
  },
  errorText: {
    marginTop: 8,
    fontSize: 14,
    color: "red",
  },
});
