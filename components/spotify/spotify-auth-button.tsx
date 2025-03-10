import {
  ActivityIndicator,
  View,
  StyleSheet,
  Pressable,
  Text,
  Image,
} from "react-native";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useSpotifyAuth } from "@/hooks/useSpotifyAuth";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import GlassmorphismButtonView from "../GlassmorphismButtonView";

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
        <Text style={styles.loadingText}>Connecting to Spotify...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Pressable
        style={{ flexBasis: 65, flexDirection: "row" }}
        onPress={handleAuthenticatePress}
        disabled={isLoading || registrationStatus?.hasSpotifyTokens}
      >
        <GlassmorphismButtonView
          label={
            registrationStatus?.hasSpotifyTokens
              ? "Already Connected to Spotify"
              : "Login with Spotify"
          }
          buttonColor="spotify"
          disabled={false}
          textSize={20}
          buttonHeight={65}
          style={{ borderRadius: 65 }}
        />
      </Pressable>

      {authError && <Text style={styles.errorText}>{authError}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  button: {},
  disabledButton: {
    opacity: 0.5,
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    position: "relative",
    height: "100%",
  },
  logoContainer: {},
  buttonText: {
    color: "white",
    fontSize: 20,
    backgroundColor: "transparent",
    marginLeft: 50,
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
