import { StyleSheet, View, Pressable, TextStyle, Image } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import React from "react";
import SpotifyAuthButton from "@/components/spotify/spotify-auth-button";
import CDDisc from "@/components/auth/CDDisc";
import GlassmorphismView from "@/components/GlassmorphismView";
import GlassmorphismButtonView from "@/components/GlassmorphismButtonView";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function MusicServiceAuthScreen() {
  const router = useRouter(); // ✅ Move useRouter() here

  const handleSkip = () => {
    router.push("/register/username"); // ✅ Correct navigation
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ThemedView style={styles.topSection}>
        <ThemedView style={styles.musicServiceAuthScreen}>
          {/* HEADER: Title + Subtitle */}
          <ThemedView style={styles.header}>
            <ThemedText type="title" style={styles.title}>
              Connect your existing library.
            </ThemedText>
            <ThemedText type="subtitle" style={styles.subtitle}>
              Login with your music streaming provider.
            </ThemedText>
          </ThemedView>

          {/* CD Disc Hero */}
          <ThemedView style={styles.CDView}>
            <CDDisc
              imageUri={require("@/assets/auth/kali_uchis.png")}
              marginLeft={0}
            />
          </ThemedView>
          {/* BUTTON CONTAINER: Spotify + Skip + Disclaimer */}
          <ThemedView style={styles.buttons}>
            {/* 'SPOTIFY BUTTON' */}
            <SpotifyAuthButton />

            {/* 'SKIP BUTTON' */}
            <Pressable style={styles.skipButton} onPress={handleSkip}>
              <GlassmorphismButtonView
                label="Skip"
                buttonColor="white"
                sfSymbol="arrow.right"
                disabled={false}
                textSize={20}
                buttonHeight={65}
                style={styles.buttonStyle}
              />
            </Pressable>

            {/* 'DISCLAIMER' */}
            <ThemedText style={styles.disclaimer}>
              By continuing you confirm that you've read and accepted our Terms
              and Privacy Policy.
            </ThemedText>
          </ThemedView>
        </ThemedView>
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  musicServiceAuthScreen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 30,
    position: "relative",
    backgroundColor: "transparent",
  },
  topSection: {
    flex: 1.2,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "transparent",
  },
  header: {
    flexBasis: 70,
    justifyContent: "center",
    alignItems: "center",
    color: "#000",
    fontFamily: "Helvetica-Regular",
    backgroundColor: "transparent",
  },
  title: {
    fontWeight: 400,
    fontSize: 21,
    marginTop: 15,
  },
  subtitle: {
    fontSize: 15,
    fontWeight: 300,
    color: "#000",
    fontFamily: "Helvetica-Regular",
    marginBottom: 50,
  },
  buttons: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    gap: 10,
    backgroundColor: "transparent",
  },
  buttonStyle: {
    borderRadius: 50,
  },
  CDView: {
    flexBasis: 220,
    backgroundColor: "transparent",
  },
  skipButton: {
    flexBasis: 65,
    flexDirection: "row",
  },
  spotifyButton: {
    flexBasis: 50,
    flexDirection: "row",
    backgroundColor: "#0DAE40",
    borderRadius: 50,
  },
  disclaimer: {
    fontSize: 12,
    textAlign: "center",
    fontWeight: 300,
    color: "#8D8D8D",
    lineHeight: 20,
  } as TextStyle,
  logo: {
    alignItems: "center",
  },
  logoContainer: {
    position: "absolute", // Fix logo to the left
    left: 30, // Keep the logo at the far left
    alignItems: "center",
  },
});
