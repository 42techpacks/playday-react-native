import { useSpotifyAppRemote } from "@/hooks/useSpotifyAppRemote";
import { Alert, View } from "react-native";

interface SpotifySkipProps {
  children: (props: {
    isConnected: boolean;
    onPress: () => void;
  }) => React.ReactNode;
  direction: "previous" | "next";
}

export function SpotifySkip({ children, direction }: SpotifySkipProps) {
  const { isConnected, skipToPreviousAsync, skipToNextAsync } =
    useSpotifyAppRemote();
  const handleSkip = async (direction: "previous" | "next") => {
    try {
      if (!isConnected) {
        Alert.alert(
          "Not Connected",
          "Please connect to Spotify App Remote first"
        );
        return;
      }

      const result =
        direction === "previous"
          ? await skipToPreviousAsync()
          : await skipToNextAsync();
      console.log("Skip to previous result:", result);

      if (!result.success) {
        Alert.alert("Error", "Failed to skip to previous track");
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert("Skip Error", error.message);
      }
    }
  };

  return children({
    isConnected,
    onPress: () => handleSkip(direction),
  });
}
