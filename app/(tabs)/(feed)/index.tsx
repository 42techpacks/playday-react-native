import {
  Image,
  StyleSheet,
  Platform,
  View,
  Text,
  Pressable,
} from "react-native";
import { Link } from "expo-router";
import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import SignOutButton from "@/components/auth-inputs/sign-out-button";
import SpoitifyAuthButton from "@/components/spotify/spotify-auth-button";
import FeedOverlayView from "@/components/feed/FeedOverlayView";
// import { useHasPostedToday } from "@/hooks/usePostStatus";

export default function FeedScreen() {
  const hasPosted = true;

  return (
    <View style={{ flex: 1 }}>
      <ParallaxScrollView
        headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
        headerImage={
          <Image
            source={require("@/assets/images/partial-react-logo.png")}
            style={styles.reactLogo}
          />
        }
      >
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">Welcome!</ThemedText>
          <HelloWave />
        </ThemedView>
        <ThemedView style={styles.stepContainer}>
          <ThemedText type="subtitle">Hello World!</ThemedText>
          <ThemedText>
            Press{" "}
            <ThemedText type="defaultSemiBold">
              {Platform.select({
                ios: "cmd + d",
                android: "cmd + m",
                web: "F12",
              })}
            </ThemedText>{" "}
            to open developer tools.
          </ThemedText>
          <SignOutButton />
          <SpoitifyAuthButton />
          <Link href="/create-modal" asChild>
            <Pressable style={styles.button}>
              <ThemedText> Create Post </ThemedText>
            </Pressable>
          </Link>
        </ThemedView>
      </ParallaxScrollView>
      {!hasPosted && <FeedOverlayView />}
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#666",
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 8,
    width: "80%",
    alignItems: "center",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
