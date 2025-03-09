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
      <ThemedView style={styles.container}>
        <ThemedText type="title" style={styles.title}>
          Connect your existing library.
        </ThemedText>
        <ThemedText type="subtitle" style={styles.subtitle}>
          Login with your music streaming provider.
        </ThemedText>

        <View style={styles.CDView}>
          <CDDisc
            imageUri={require("@/assets/auth/kali_uchis.png")}
            marginLeft={0}
          />
        </View>

        <ThemedView style={styles.buttonScreen}>
          <GlassmorphismView
            containerStyle={styles.spotifyButton}
            disableBackground={true}
          >
            <SpotifyAuthButton />
          </GlassmorphismView>

          <Pressable style={styles.skipButton} onPress={handleSkip}>
            <GlassmorphismButtonView
              label="Skip"
              buttonColor="white"
              sfSymbol="arrow.right"
              disabled={false}
              textSize={20}
              buttonHeight={65}
            />
          </Pressable>
          <GlassmorphismView
            containerStyle={styles.appleButtonContainer}
            disableBackground={true}
          >
            <View style={styles.logoContainer}>
              <Image
                source={require("@/assets/auth/apple_icon.png")}
                resizeMode="contain"
                style={styles.logo}
              />
            </View>
            <ThemedText style={styles.appleButtonText}>
              Login with Apple Music
            </ThemedText>
          </GlassmorphismView>

          <ThemedText style={styles.disclaimer}>
            By continuing you confirm that you've read and accepted our Terms
            and Privacy Policy.
          </ThemedText>
        </ThemedView>
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 20,
    position: "relative",
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
  buttonScreen: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
  CDView: {
    marginBottom: 75,
  },
  appleButtonContainer: {
    display: "flex",
    flexDirection: "row", // ✅ Keep logo and text in a row
    alignItems: "center", // ✅ Ensures vertical centering
    justifyContent: "center", // ✅ Ensures text is centered
    width: "100%",
    height: 65,
    backgroundColor: "#E25E5E",
    borderRadius: 50,
    paddingHorizontal: 20,
  },
  appleButtonText: {
    color: "white",
    fontSize: 20,
    marginLeft: 40, // ✅ Moves text slightly to the right
  },
  skipButton: {
    width: "100%",
    height: 65,
  },
  spotifyButton: {
    width: "100%",
    backgroundColor: "#0DAE40",
    height: 65,
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
