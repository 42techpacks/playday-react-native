import React from "react";
import { ThemedView } from "../ThemedView";
import { Image, StyleSheet } from "react-native";
import { ThemedText } from "../ThemedText";

interface Props {
  title?: string;
  backEnabled: boolean;
}

export default function TopBar({ title, backEnabled }: Props) {
  return (
    <ThemedView
      style={[styles.topBar, backEnabled ? { marginRight: -25 } : {}]}
    >
      {/* Logo on the very left */}
      {title ? (
        <ThemedText style={styles.title}>{title}</ThemedText>
      ) : (
        <>
          <Image
            source={require("@/assets/auth/logo.png")}
            style={styles.logo}
            resizeMode="contain"
          />
          <Image
            source={require("@/assets/auth/info.png")}
            style={styles.infoIcon}
            resizeMode="contain"
          />
        </>
      )}
      {/* Static info icon on the very right */}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  topBar: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "none",
    paddingVertical: 0,
  },

  title: {
    flex: 1,
    flexDirection: "row",
    textAlign: "center",

    fontSize: 20,
    fontWeight: 600,
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
