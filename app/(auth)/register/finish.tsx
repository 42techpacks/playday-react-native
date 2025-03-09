import { StyleSheet, View, Image, Pressable } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import GlassmorphismButtonView from "@/components/GlassmorphismButtonView";
import GlassmorphismView from "@/components/GlassmorphismView";
import { useRouter } from "expo-router";

export default function FinishScreen() {
  const user = useQuery(api.auth.getCurrentUser);
  const router = useRouter();

  return (
    <ThemedView style={styles.finishScreen}>
      {/* TOP SECTION: Header + Profile Card */}
      <ThemedView style={styles.topSection}>
        {/* HEADER: Title + Subtitle */}
        <ThemedView style={styles.header}>
          {/* 'TITLE' */}
          <ThemedText type="title" style={styles.title}>
            You're all set!
          </ThemedText>
          {/* 'SUBTITLE' */}
          <ThemedText type="subtitle" style={styles.subtitle}>
            Start curating your sound today.
          </ThemedText>
        </ThemedView>

        {/* PROFILE CARD: Image + Username */}
        <GlassmorphismView containerStyle={styles.profileContainer}>
          {/* 'IMAGE' */}
          <Image
            source={require("@/assets/auth/profile.png")}
            resizeMode="contain"
            style={styles.profileImage}
          />
          {/* 'USERNAME' */}
          <ThemedText style={styles.username}>
            {user?.profile?.username ? `@${user.profile.username}` : ""}
          </ThemedText>
        </GlassmorphismView>
      </ThemedView>

      {/* FOOTER: Streaming Connection Status + Next Button */}
      <ThemedView style={styles.footerContainer}>
        {/* 'CONNECTED' Status */}
        <ThemedText style={styles.connected}>
          Spotify {!!user?.spotifyToken ? "connected!✅ " : "not connected! ❌"}
        </ThemedText>

        {/* 'NEXT' Button */}
        <Pressable
          style={styles.buttonContainer}
          onPress={() => router.push("/(auth)/register/onboard")}
        >
          <GlassmorphismButtonView
            label="Next"
            disabled={false}
            textSize={16}
            buttonColor="black"
            buttonHeight={50}
          />
        </Pressable>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  finishScreen: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    padding: 30,
  },
  topSection: {
    flex: 1.2,
    alignItems: "center",
    justifyContent: "space-between",
  },
  header: {
    flexBasis: 100,
    justifyContent: "center",
    alignItems: "center",
    color: "#000",
    fontFamily: "Helvetica-Regular",
  },
  title: {
    fontWeight: 400,
    fontSize: 21,
  },
  subtitle: {
    fontWeight: 300,
    fontSize: 15,
  },
  username: {
    flex: 0.5,
    textAlign: "center",
    color: "grey",
    fontSize: 14,
    fontWeight: 300,
  },
  profileContainer: {
    flexBasis: 220,
    aspectRatio: 1 / 1,

    borderRadius: 20,
    backgroundColor: "transparent",
  },
  profileImage: {
    flex: 1.5,
    padding: 20,
  },
  finishText: {
    marginTop: 500,
    marginBottom: 20,
    fontSize: 24,
    fontWeight: "bold",
  },
  buttonContainer: {
    flexBasis: 50,
    flexDirection: "row",
  },
  connected: {
    textAlign: "center",
    color: "gray",
    fontFamily: "Helvetica",
    fontSize: 14,
  },
  footerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",

    gap: 30,
    backgroundColor: "transparent",
  },
});
