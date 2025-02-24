import {
  Image,
  StyleSheet,
  Platform,
  View,
  Text,
  FlatList,
} from "react-native";

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
});
