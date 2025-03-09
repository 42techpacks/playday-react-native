import { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { ThemedView } from "../ThemedView";
import { ThemedText } from "../ThemedText";

export default function SongProgressBar() {
  const [progress, setProgress] = useState(0);
  const SONG_DURATION = 30; // 30 seconds

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          return 0;
        }
        return prevProgress + 100 / (SONG_DURATION * 10);
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const currentTime = (SONG_DURATION * progress) / 100;

  return (
    <ThemedView style={styles.songProgressBar}>
      <ThemedView style={styles.progressBarContainer}>
        <ThemedView style={[styles.progressBar, { width: `${progress}%` }]} />
      </ThemedView>
      <ThemedView style={styles.timeContainer}>
        <ThemedText style={styles.label}>{formatTime(currentTime)}</ThemedText>
        <ThemedText style={styles.label}>
          {formatTime(SONG_DURATION)}
        </ThemedText>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  songProgressBar: {
    flexBasis: 25,
  },
  progressBarContainer: {
    height: 3,
    backgroundColor: "#E0E0E0",
    borderRadius: 1.5,
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#000",
    borderRadius: 1.5,
  },
  timeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  label: {
    fontSize: 12,
    color: "#666",
    fontWeight: "300",
  },
});
