import { Text, StyleSheet, Image } from "react-native";
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
  spotify: ["#00aa36", "rgba(0, 170, 54, 0.65)"],
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
        buttonColor === "black"
          ? gradientColors.black
          : buttonColor === "spotify"
            ? gradientColors.spotify
            : gradientColors.white
      }
      style={[
        buttonColor === "black" ? styles.glassmorphismButtonFillBlack : "",
        buttonColor === "white" ? styles.glassmorphismButtonBorderWhite : "",
        buttonColor === "transparent"
          ? styles.glassmorphismButtonBorderTransparent
          : "",
        buttonColor === "spotify" ? styles.glassmorphismButtonSpotify : "",
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
        {buttonColor === "spotify" && (
          <ThemedView style={styles.logoContainer}>
            <Image
              source={require("@/assets/auth/Spotify.png")}
              resizeMode="contain"
              style={{ padding: 5 }}
            />
          </ThemedView>
        )}
        {label && (
          <Text
            style={[
              buttonColor === "black" || buttonColor === "spotify"
                ? { color: "#FFF" }
                : { color: "#000" },
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
    backgroundColor: "transparent",
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

  glassmorphismButtonSpotify: {
    borderRadius: 50,

    shadowColor: "rgba(0, 0, 0, 0.1)",
    shadowOffset: {
      width: 0,
      height: 20,
    },
    shadowRadius: 40,
    shadowOpacity: 1,

    backgroundColor: "#00aa36",
    borderStyle: "solid",
    borderColor: "rgba(0, 197, 63, 0.6)",
    borderWidth: 1,

    position: "relative",
  },

  logoContainer: {
    backgroundColor: "transparent",
  },
});
