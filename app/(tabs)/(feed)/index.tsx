import {
  Image,
  StyleSheet,
  Platform,
  View,
  Text,
  FlatList,
} from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import SignOutButton from "@/components/auth-inputs/sign-out-button";
import SpoitifyAuthButton from "@/components/spotify/spotify-auth-button";
import FeedOverlayView from "@/components/feed/FeedOverlayView";
import FeedPostView from "@/components/feed/FeedPostView";
// import { useHasPostedToday } from "@/hooks/usePostStatus";

export default function FeedScreen() {
  const hasPosted = true;

  return (
    <View style={styles.feedScreen}>
      {/* Posts */}
      <FlatList
        data={["kenny", "milo", "priyanka", "haoming"]}
        contentContainerStyle={styles.feedPosts}
        renderItem={({ item }) => <FeedPostView />}
      ></FlatList>

      {/* User Account Actions */}
      <ThemedView style={styles.stepContainer}>
        <SignOutButton />
        <SpoitifyAuthButton />
      </ThemedView>

      {/* Daily Posting Feed Overlay */}
      {!hasPosted && <FeedOverlayView />}
    </View>
  );
}

const styles = StyleSheet.create({
  feedScreen: {
    display: "flex",
    flexDirection: "column",
    overflowY: "scroll",
  },

  feedPosts: {
    display: "flex",
    flexDirection: "column",
    gap: 50,
    padding: 25,
    backgroundColor: "#FFFFFF",
    paddingBottom: 150,
  },

  stepContainer: {
    gap: 8,
    marginBottom: 8,
    padding: 10,
  },
});
