import { ActivityIndicator, View, StyleSheet, Pressable, Text, Image } from "react-native";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useSpotifyAuth } from "@/hooks/useSpotifyAuth";
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
        onPress={handleAuthenticatePress}
        style={[
          styles.button,
          (isLoading || registrationStatus?.hasSpotifyTokens) && styles.disabledButton,
        ]}
        disabled={isLoading || registrationStatus?.hasSpotifyTokens}
      >
        <View style={styles.buttonContent}>
          <View style={styles.logoContainer}>
            <Image
              source={require("@/assets/auth/Spotify.png")}
              resizeMode="contain"
            />
          </View>

          <Text style={styles.buttonText}>
            {registrationStatus?.hasSpotifyTokens
              ? "Already Connected to Spotify"
              : "Login with Spotify"}
          </Text>
        </View>
      </Pressable>

      {authError && <Text style={styles.errorText}>{authError}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 10,
    alignItems: "center",
    width: "100%",
    backgroundColor: "#0DAE40",
    height: 65,
    borderRadius: 50,
  },
  disabledButton: {
    opacity: 0.5,
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    position: "relative",
    height: "100%"
  },
  logoContainer: {
    position: "absolute",
    left: 20,
    height:"100%"
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    backgroundColor: "transparent",
    marginLeft: 50
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
