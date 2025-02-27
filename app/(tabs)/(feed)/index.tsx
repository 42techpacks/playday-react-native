import {
  Image,
  StyleSheet,
  Platform,
  View,
  Text,
  FlatList,
} from "react-native";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

import FeedOverlayView from "@/components/feed/FeedOverlayView";
import FeedPostView from "@/components/feed/FeedPostView";
// import { useHasPostedToday } from "@/hooks/usePostStatus";

export default function FeedScreen() {
  const hasPosted = true;
  const daylists = useQuery(api.daylists.list);

  if (!daylists) {
    return (
      <View style={styles.centered}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.feedScreen}>
      {/* Posts */}
      <FlatList
        data={daylists}
        contentContainerStyle={styles.feedPosts}
        renderItem={({ item }) => <FeedPostView daylist={item} />}
      />

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

  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
