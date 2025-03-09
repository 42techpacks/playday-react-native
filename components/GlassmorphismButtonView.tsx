import { Text, StyleSheet } from "react-native";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { SFSymbols6_0 } from "sf-symbols-typescript";
import LinearGradient from "react-native-linear-gradient";
import { ThemedView } from "@/components/ThemedView";

interface GlassmorphismButtonProps {
  label?: string;
  sfSymbol?: SFSymbols6_0;
  buttonColor: string;
  disabled: boolean;
  textSize?: number;
  buttonHeight?: number;
  style?: object;
}

const gradientColors = {
  black: ["rgba(18,18,18, 1)", "rgba(18,18,18,0.8)"],
  white: ["rgba(255, 255, 255, 0.5)", "rgba(255, 255, 255, 0.2)"],
};

export default function GlassmorphismButtonView({
  label,
  sfSymbol,
  buttonColor,
  disabled,
  textSize,
  buttonHeight,
  style,
}: GlassmorphismButtonProps) {
  return (
    <LinearGradient
      colors={
        buttonColor === "black" ? gradientColors.black : gradientColors.white
      }
      style={[
        buttonColor === "black"
          ? styles.glassmorphismButtonFillBlack
          : styles.glassmorphismButtonFillBlack,
        buttonColor === "white"
          ? styles.glassmorphismButtonBorderWhite
          : styles.glassmorphismButtonBorderWhite,
        buttonColor === "transparent"
          ? styles.glassmorphismButtonBorderTransparent
          : styles.glassmorphismButtonBorderTransparent,
        disabled ? { opacity: 0.5 } : { opacity: 1 },
        buttonHeight ? { height: buttonHeight } : {},
        styles.glassmorphismButtonContainer,
        style,
      ]}
      locations={[0, 1]}
      useAngle={true}
      angle={146.7}
    >
      <ThemedView style={[styles.glassmorphismButton]}>
        {sfSymbol && (
          <IconSymbol
            name={sfSymbol}
            color={buttonColor === "black" ? "#FFF" : "#000"}
            size={textSize}
          />
        )}
        {label && (
          <Text
            style={[
              buttonColor === "black" ? { color: "#FFF" } : { color: "#000" },
              textSize ? { fontSize: textSize } : {},
            ]}
          >
            {label}
          </Text>
        )}
      </ThemedView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  glassmorphismButtonContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  glassmorphismButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",

    paddingHorizontal: 15,
    paddingVertical: 10,
    gap: 5,

    color: "white",
    backgroundColor: "none",
  },

  glassmorphismButtonFillTransparent: { backgroundColor: "transparent" },

  glassmorphismButtonBorderTransparent: {
    borderColor: "transparent",
    borderWidth: 0,
  },

  glassmorphismButtonFillBlack: {
    borderRadius: 50,

    shadowColor: "rgba(0, 0, 0, 0.3)",
    shadowOffset: {
      width: 0,
      height: 40,
    },
    shadowRadius: 40,
    shadowOpacity: 1,
  },

  glassmorphismButtonBorderBlack: {
    backgroundColor: "rgba(18, 18, 18, 0.7)",
    borderWidth: 1,
    borderColor: "rgba(18, 18, 18, 0.6)",
    borderStyle: "solid",
  },

  glassmorphismButtonFillWhite: {
    borderRadius: 50,

    shadowColor: "rgba(0, 0, 0, 0.3)",
    shadowOffset: {
      width: 0,
      height: 40,
    },
    shadowRadius: 40,
    shadowOpacity: 1,
  },

  glassmorphismButtonBorderWhite: {
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.6)",
    borderStyle: "solid",
  },
});
