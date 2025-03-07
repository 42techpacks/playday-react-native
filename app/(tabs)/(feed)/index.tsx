import {
  StyleSheet,
  View,
  Text,
  FlatList,
} from "react-native";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useSpotifyAuth } from "@/hooks/useSpotifyAuth";

import FeedOverlayView from "@/components/feed/FeedOverlayView";
import FeedPostView from "@/components/feed/FeedPostView";
// import { useHasPostedToday } from "@/hooks/usePostStatus";

export default function FeedScreen() {
  const hasPosted = true;
  // TODO: Update this so that the convex query handles the fetching of the images
  const daylists = useQuery(api.daylists.list);
  const { isLoading: authLoading, isRefreshing: authRefreshing } =
    useSpotifyAuth();

  if (!daylists || authLoading || authRefreshing) {
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
        keyExtractor={(item) => item._id.toString()}
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
