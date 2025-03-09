import { useState } from "react";
import { Text, StyleSheet, Pressable, ViewStyle } from "react-native";
import { ThemedView } from "./ThemedView";
import LinearGradient from "react-native-linear-gradient";

interface GlassmorphismViewProps {
  children: React.ReactNode;
  containerStyle: ViewStyle;
  disableBackground?: boolean;
}

export default function GlassmorphismView({
  children,
  containerStyle,
  disableBackground = false, // Default is false
}: GlassmorphismViewProps) {
  return (
    <LinearGradient
      style={[
        containerStyle,
        styles.glassmorphismCard,
        !disableBackground && styles.glassmorphismCardBorder,
      ]}
      locations={[0, 1]}
      colors={["rgba(255, 255, 255, 0.5)", "rgba(255, 255, 255, 0.2)"]}
      useAngle={true}
      angle={146.7}
    >
      <ThemedView style={[styles.glassmorphismView]}>{children}</ThemedView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  glassmorphismView: {
    backgroundColor: "transparent",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  glassmorphismCard: {
    borderRadius: 25,
    gap: 10,
    shadowColor: "rgba(0, 0, 0, 0.3)",
    shadowOffset: {
      width: 0,
      height: 40,
    },
    shadowRadius: 40,
    shadowOpacity: 1,
  },
  glassmorphismCardBorder: {
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.6)",
    borderStyle: "solid",
  },
});
