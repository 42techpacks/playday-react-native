import React from "react";
import { ThemedView } from "../ThemedView";
import { Image, Pressable, StyleSheet } from "react-native";
import { ThemedText } from "../ThemedText";
import { IconSymbol } from "../ui/IconSymbol.ios";
import { Link, useRouter } from "expo-router";
import { Dimensions } from "react-native";

interface Props {
  title?: string;
  backEnabled: boolean;
  searchEnabled?: boolean;
}

const { width, height } = Dimensions.get("window");

export default function TopBar({ title, backEnabled }: Props) {
  const router = useRouter();
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
          <Link href="/(tabs)/(feed)/search" asChild>
            <Pressable>
              <IconSymbol name="magnifyingglass" size={24} color="black" />
            </Pressable>
          </Link>
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
    // Don't know why there's this weird margin/padding
    marginLeft: -(width * 0.075),
  },

  logo: {
    width: 100,
    height: 25,
  },

  right: {
    flexDirection: "row",
    gap: 10,
  },

  infoIcon: {
    width: 25,
    height: 25,
  },
});
