import { Button } from "react-native";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useSpotifyAuth } from "@/hooks/useSpotifyAuth";

export default function SpotifyAuthButton() {
  const {
    isAuthenticated,
    isLoading,
    authenticateWithSpotify
  } = useSpotifyAuth();

  async function handleAuthenticatePress() {
    try {
      await authenticateWithSpotify();
    } catch (error) {
      console.error("Authentication failed:", error);
    }

  }

  return (
    <Button
      onPress={handleAuthenticatePress}
      title={isAuthenticated ? "Connected to Spotify" : "Authenticate w/ Spotify"}
      disabled={isLoading}
    />
  );
}
