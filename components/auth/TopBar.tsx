import React from "react";
import { View, Image, StyleSheet } from "react-native";

export default function TopBar() {
  return (
    <View style={styles.topBar}>
      {/* Logo on the very left */}
      <Image
        source={require("@/assets/auth/logo.png")}
        style={styles.logo}
        resizeMode="contain"
      />
      {/* Static info icon on the very right */}
      <Image
        source={require("@/assets/auth/info.png")}
        style={styles.infoIcon}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  topBar: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "none",
    width: "100%",
    paddingBottom: 10,
  },

  logo: {
    width: 100,
    height: 25,
  },

  infoIcon: {
    width: 25,
    height: 25,
  },
});
