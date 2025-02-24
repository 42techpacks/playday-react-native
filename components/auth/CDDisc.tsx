import React from "react";
import { View, Image, StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");
const DISC_SIZE = width * 0.6; // Adjusted to be 60% of screen width
const CENTER_HOLE_RADIUS = DISC_SIZE * 0.05; // Center hole is 5% of the CD size

// Update the type of `imageUri` to support both `string` and `number` (for `require`)
export default function CDDisc({ imageUri }: { imageUri: string | number }) {
  return (
    <View style={styles.container}>
      {/* CD Outer Circle */}
      <View style={styles.cdOuter}>
        {/* CD Cover Image */}
        <Image
          source={imageUri} // Allow both local and remote images
          style={styles.image}
          resizeMode="cover"
        />

        {/* CD Center Hole */}
        <View style={styles.hole} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  cdOuter: {
    width: DISC_SIZE,
    height: DISC_SIZE,
    borderRadius: DISC_SIZE / 2,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2, // Reduced from 5 to 2 to make it thinner
    borderColor: "#aaa", // Slightly lighter color for subtle effect
    position: "relative",
  },
  image: {
    width: DISC_SIZE,
    height: DISC_SIZE,
    borderRadius: DISC_SIZE / 2,
  },
  hole: {
    position: "absolute",
    width: CENTER_HOLE_RADIUS * 2,
    height: CENTER_HOLE_RADIUS * 2,
    backgroundColor: "#fff", // Simulates the hole
    borderRadius: CENTER_HOLE_RADIUS,
    borderWidth: 1.5, // Reduced slightly for a more realistic effect
    borderColor: "#888",
  },
});
