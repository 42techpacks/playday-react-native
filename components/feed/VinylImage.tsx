import { useState } from "react";
import { Text, StyleSheet, Image } from "react-native";
import { ThemedView } from "../ThemedView";

export default function VinylImage() {
  return (
    <ThemedView style={styles.vinyl}>
      <ThemedView style={styles.vinylShape}>
        <Image
          source={require("../../assets/feed/sex-on-the-beach-dj-assault.png")}
          style={styles.vinylSongImage}
        />
        <Text style={{ backgroundColor: "none" }}>Vinyl Image</Text>
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
});
