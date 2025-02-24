import React from "react";
import { View, Image, StyleSheet } from "react-native";

export default function TopBar() {
  return (
    <View style={styles.container}>
      {/* Logo on the very left */}
      <Image
        source={require("@/assets/auth/logo.png")} // Replace with your actual logo path
        style={styles.logo}
        resizeMode="contain"
      />
      {/* Static info icon on the very right */}
      <Image
        source={require("@/assets/auth/info.png")} // Replace with your actual info icon path
        style={styles.infoIcon}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // position: 'absolute',
    // top: 0,
    // left: 0,
    // right: 0,
    // height: 80,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
  },
  logo: {
    width: 100, // Doubled from original size
    height: 55, // Doubled from original size
    marginLeft: 10, // Now flush against the left edge
  },
  infoIcon: {
    width: 25, // Doubled from original size
    height: 25, // Doubled from original size
    marginRight: 16, // Maintains right spacing
  },
});
