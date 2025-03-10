import React, { useState, useEffect } from "react";
import { Alert } from "react-native";

import { useSpotifyAppRemote } from "@/hooks/useSpotifyAppRemote";
import { useSpotifyPlayerState } from "@/hooks/useSpotifyPlayerState";
import { AppRemote } from "expo-spotify-sdk";

interface SpotifyPlayPauseProps {
  children: (props: {
    isPlaying: boolean;
    isLoading: boolean;
    isConnected: boolean;
    onPress: () => void;
  }) => React.ReactNode;
  uri: string;
}

// New component for individual track play/pause control
interface SpotifyTrackPlayPauseProps {
  children: (props: {
    isPlaying: boolean;
    isLoading: boolean;
    isConnected: boolean;
    onPress: () => void;
  }) => React.ReactNode;
  uri: string;
}

export function SpotifyTrackPlayPause({
  children,
  uri,
}: SpotifyTrackPlayPauseProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { playerState } = useSpotifyPlayerState();
  const { isConnected, authorizeAndPlayURI, isSpotifyAppInstalled } =
    useSpotifyAppRemote();

  // Check if this specific track is playing
  useEffect(() => {
    if (playerState && playerState.track) {
      // Compare the current playing track URI with this component's URI
      setIsPlaying(!playerState.isPaused && playerState.track.uri === uri);
    } else {
      setIsPlaying(false);
    }
  }, [playerState, uri]);

  const handlePlayPause = async () => {
    setIsLoading(true);
    try {
      if (isPlaying) {
        // If this track is playing, pause it
        if (isConnected) {
          await AppRemote.pauseAsync();
        }
      } else {
        // If this track is not playing, play it
        if (!isConnected) {
          // If not connected, authorize and play
          const result = await authorizeAndPlayURI(uri);

          if (!result.success && !isSpotifyAppInstalled) {
            Alert.alert(
              "Spotify Not Installed",
              "Please install the Spotify app from the App Store to continue."
            );
          }
        } else {
          // If connected but playing something else, play this track using the new playTrackAsync
          const result = await AppRemote.playTrackAsync(uri);
          if (!result.success) {
            console.warn("Failed to play track:", uri);
          }
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

export function SpotifyPlayPause({ children, uri }: SpotifyPlayPauseProps) {
  const { isPlaying, togglePlayPause } = useSpotifyPlayerState();
  const [isLoading, setIsLoading] = React.useState(false);

  const { isConnected, authorizeAndPlayURI, isSpotifyAppInstalled } =
    useSpotifyAppRemote();
  const handlePlayPause = async () => {
    setIsLoading(true);
    try {
      // Using a sample Spotify URI - you can replace this with any valid URI
      // const uri = "spotify:album:1htHMnxonxmyHdKE2uDFMR";

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
