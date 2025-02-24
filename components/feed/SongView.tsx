import { useState } from "react";
import { Text, StyleSheet, Image } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import LinearGradient from "react-native-linear-gradient";

interface SongViewProps {
  songTitle: string;
  artist: string;
}

export default function SongView({ songTitle, artist }: SongViewProps) {
  return (
    <ThemedView style={styles.songView}>
      <ThemedView style={styles.songInfo}>
        <Text style={styles.songText}>{songTitle}</Text>
        <Text style={styles.songText}> - </Text>
        <Text style={styles.songText}>{artist}</Text>
      </ThemedView>
      <ThemedView style={styles.songInteractions}>
        <ThemedView style={styles.songInteractionButton}>
          <Image
            source={require("../../assets/feed/play-icon.png")}
            style={{
              height: 10,
              width: 10,
            }}
          />
        </ThemedView>
        <ThemedView style={styles.songInteractionButton}>
          <Image
            source={require("../../assets/feed/add-icon.png")}
            style={{
              height: 10,
              width: 10,
            }}
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

    borderRadius: "50%",
    overflow: "hidden",

    height: 25,
    width: 25,
    backgroundColor: "#E2E2E2",
    borderColor: "#D2D2D2",
    borderWidth: 1,
  },

  songText: {
    fontSize: 12,
  },
});
