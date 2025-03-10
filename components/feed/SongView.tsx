import { Text, StyleSheet } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol.ios";
import { SpotifyTrackPlayPause } from "@/components/spotify/SpotifyPlayPause";

interface SongViewProps {
  songTitle: string;
  artist: string;
  uri: string;
}

export default function SongView({ songTitle, artist, uri }: SongViewProps) {
  return (
    <ThemedView style={styles.songView}>
      <ThemedView style={styles.songInfo}>
        <Text style={styles.songText}>{songTitle}</Text>
        <Text style={styles.songText}> - </Text>
        <Text style={styles.songText}>{artist}</Text>
      </ThemedView>
      <ThemedView style={styles.songInteractions}>
        <SpotifyTrackPlayPause uri={uri}>
          {({ isPlaying, isLoading, onPress }) => (
            <ThemedView
              style={[
                styles.songInteractionButton,
                isLoading && styles.songInteractionButtonLoading
              ]}
              onTouchEnd={onPress}
            >
              <IconSymbol
                name={isPlaying ? "pause.fill" : "play.fill"}
                size={14}
                color="black"
              />
            </ThemedView>
          )}
        </SpotifyTrackPlayPause>
        <ThemedView style={styles.songInteractionButton}>
          <IconSymbol
            name="plus"
            size={14}
            color="black"
          />
        </ThemedView>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  songView: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    backgroundColor: "none",
  },
  songInfo: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "none",
  },
  songInteractions: {
    display: "flex",
    flexDirection: "row",

    justifyContent: "center",
    alignItems: "center",

    color: "black",
    backgroundColor: "none",
    gap: 8,
    height: "auto",
  },

  songInteractionButton: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    borderRadius: 25,
    overflow: "hidden",

    height: 28,
    width: 28,
    backgroundColor: "#E2E2E2",
    borderColor: "#D2D2D2",
    borderWidth: 1,
  },

  songInteractionButtonLoading: {
    opacity: 0.7,
  },

  songText: {
    fontSize: 12,
  },
});
