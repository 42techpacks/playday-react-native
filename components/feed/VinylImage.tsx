import { useState } from "react";
import { Text, StyleSheet, Image, Dimensions } from "react-native";
import { ThemedView } from "@/components/ThemedView";

const { width } = Dimensions.get("window");
const DISC_SIZE = width * 0.6; // Adjusted to be 60% of screen width
const CENTER_HOLE_RADIUS = DISC_SIZE * 0.05; // Center hole is 5% of the CD size

export default function VinylImage() {
  return (
    <ThemedView style={styles.vinyl}>
      <ThemedView style={styles.vinylShape}>
        <Image
          source={require("../../assets/feed/sex-on-the-beach-dj-assault.png")}
          style={styles.vinylSongImage}
        />
        {/* CD Center Hole */}
        <ThemedView style={styles.vinylHole} />
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  vinyl: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    backgroundColor: "none",
    marginLeft: -240,

    /* Drop Shadow Styling */
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  vinylShape: {
    height: 250,
    width: 250,
    backgroundColor: "none",
    borderRadius: "50%",
    overflow: "hidden",
  },
  vinylSongImage: {
    width: "100%",
    height: "100%",
  },
  vinylHole: {
    position: "absolute",
    width: CENTER_HOLE_RADIUS * 2,
    height: CENTER_HOLE_RADIUS * 2,
    backgroundColor: "#fff", // Simulates the hole
    borderRadius: CENTER_HOLE_RADIUS,
    borderWidth: 1.5, // Reduced slightly for a more realistic effect
    borderColor: "#888",
  },
});
