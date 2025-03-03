import { useState } from "react";
import { Text, StyleSheet, Pressable, ViewStyle } from "react-native";
import { ThemedView } from "./ThemedView";
import LinearGradient from "react-native-linear-gradient";

interface GlassmorphismViewProps {
  children: React.ReactNode;
  gradientStyle?: ViewStyle;
  viewStyle?: ViewStyle;
  disableBackground?: boolean; 
}

export default function GlassmorphismView({
  children,
  gradientStyle,
  viewStyle,
  disableBackground = false, // Default is false
}: GlassmorphismViewProps) {
  return (
    <LinearGradient
      style={[
        styles.glassmorphismCard,
        !disableBackground && styles.glassmorphismCardBorder,
        gradientStyle,
      ]}
      locations={[0, 1]}
      colors={["rgba(255, 255, 255, 0.5)", "rgba(255, 255, 255, 0.2)"]}
      useAngle={true}
      angle={146.7}
    >
      <ThemedView style={[styles.glassmorphismView, viewStyle]}>
        {children}
      </ThemedView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  glassmorphismView: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  glassmorphismCard: {
    borderRadius: 25,
    width: "100%",
    gap: 10,
    justifyContent: "flex-start",
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
