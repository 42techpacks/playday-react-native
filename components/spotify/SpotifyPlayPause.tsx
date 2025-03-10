import React from "react";
import { Alert, StyleSheet } from "react-native";

import { useSpotifyAppRemote } from "@/hooks/useSpotifyAppRemote";
import { useSpotifyPlayerState } from "@/hooks/useSpotifyPlayerState";

interface SpotifyPlayPauseProps {
  children: (props: {
    isPlaying: boolean;
    isLoading: boolean;
    isConnected: boolean;
    onPress: () => void;
  }) => React.ReactNode;
}

export function SpotifyPlayPause({ children }: SpotifyPlayPauseProps) {
  const { isPlaying, togglePlayPause } = useSpotifyPlayerState();
  const [isLoading, setIsLoading] = React.useState(false);

  const { isConnected, authorizeAndPlayURI, isSpotifyAppInstalled } =
    useSpotifyAppRemote();
  const handlePlayPause = async () => {
    setIsLoading(true);
    try {
      // Using a sample Spotify URI - you can replace this with any valid URI
      const uri = "spotify:album:1htHMnxonxmyHdKE2uDFMR";

      if (!isConnected) {
        // If not connected, use authorizeAndPlayURI which will handle authorization
        const result = await authorizeAndPlayURI(uri);
        console.log("Authorize and play URI result:", result);

        if (!result.success && !isSpotifyAppInstalled) {
          // Handle case when Spotify app is not installed
          Alert.alert(
            "Spotify Not Installed",
            "Please install the Spotify app from the App Store to continue."
          );
        }
      } else {
        // If already connected, we could handle playback directly
        const result = await togglePlayPause();
        // If the toggle operation failed, we should still reset the loading state
        if (!result.success) {
          console.warn("Toggle playback operation failed");
        }
      }
    } catch (error) {
      console.error("Error with playback:", error);
      if (error instanceof Error) {
        Alert.alert("Playback Error", error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };
  return children({
    isPlaying,
    isLoading,
    isConnected,
    onPress: handlePlayPause,
  });
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  loading: {
    opacity: 0.7,
  },
  disabled: {
    opacity: 0.5,
  },
  playIcon: {
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderLeftColor: "#FFFFFF",
    borderTopColor: "transparent",
    borderBottomColor: "transparent",
    marginLeft: 5, // Offset to center the triangle
  },
  pauseContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    gap: 5,
  },
  pauseBar: {
    backgroundColor: "#FFFFFF",
    borderRadius: 2,
  },
});
