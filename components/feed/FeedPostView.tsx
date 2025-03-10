import { Text, StyleSheet, Image } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol.ios";
import LinearGradient from "react-native-linear-gradient";
import CDDisc from "../auth/CDDisc";
import SongView from "./SongView";
import { ThemedText } from "@/components/ThemedText";
import CommentInput from "./CommentInput";
import { Doc } from "@/convex/_generated/dataModel";

type FeedPostViewProps = {
  daylist: Doc<"daylists">;
};

export default function FeedPostView({ daylist }: FeedPostViewProps) {
  // Get album images directly from the daylist data
  const albumImages = daylist.songs
    .map(song => song.imageUrl)
    .filter(url => !!url) as string[];

  return (
    <LinearGradient
      style={[styles.glassmorphismCardFill, styles.glassmorphismCardBorder]}
      locations={[0, 1]}
      colors={["rgba(255, 255, 255, 0.5)", "rgba(255, 255, 255, 0.2)"]}
      useAngle={true}
      angle={146.7}
    >
      <ThemedView style={styles.feedPostView}>
        <ThemedView style={styles.feedPostHeader}>
          <ThemedView style={styles.feedPostHeaderLeft}>
            <IconSymbol name="music.note" size={20} color="black" />
            <Text>@npcmilo</Text>
          </ThemedView>
          <Text>42 minutes ago</Text>
        </ThemedView>

        {/* Post Songs */}
        <ThemedView style={[styles.feedPostVinyls]}>
          {[...albumImages].reverse().map((imageUrl: string, index: number) => (
            <CDDisc
              key={index}
              imageUri={
                imageUrl
                  ? { uri: imageUrl }
                  : require("@/assets/auth/Steve-Lacy-Gemini-Rights.png")
              }
              discSize={225}
              containerStyle={{
                position: "absolute",
                backgroundColor: "none",
                transform: [
                  {
                    translateX: (index - (albumImages.length - 1) / 2) * -10,
                  },
                ],
              }}
            />
          ))}
        </ThemedView>

        {/* Post Interactions */}
        <ThemedView style={styles.feedPostInteractions}>
          <ThemedView style={styles.feedPostHeaderLeft}>
            <ThemedView style={styles.feedPostInteractionContainer}>
              <Image
                source={require("@/assets/feed/like-icon.png")}
                style={{ height: 19, width: 21 }}
              />
              <ThemedText style={styles.feedPostInteractionCount}>
                294
              </ThemedText>
            </ThemedView>
            <ThemedView style={styles.feedPostInteractionContainer}>
              <Image
                source={require("@/assets/feed/comment-icon.png")}
                style={{ height: 18, width: 18 }}
              />
              <ThemedText style={styles.feedPostInteractionCount}>1</ThemedText>
            </ThemedView>
          </ThemedView>
          <ThemedView style={styles.feedPostInteractionContainer}>
            <Image
              source={require("@/assets/feed/save-icon.png")}
              style={{ height: 19, width: 19 }}
            />
            <ThemedText style={styles.feedPostInteractionCount}>100</ThemedText>
          </ThemedView>
        </ThemedView>

        <ThemedView style={styles.feedPostSongs}>
          {daylist.songs.map((song) => (
            <SongView
              key={song.id}
              songTitle={song.name}
              artist={song.artists[0].name}
            />
          ))}
        </ThemedView>

        <ThemedView style={styles.feedPostComment}>
          <CommentInput />
        </ThemedView>
      </ThemedView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  glassmorphismCardFill: {
    borderRadius: 25,
    width: "100%",
    gap: 10,
    justifyContent: "center",

    shadowColor: "rgba(0, 0, 0, 0.3)",
    shadowOffset: {
      width: 0,
      height: 40,
    },
    shadowRadius: 40,
    shadowOpacity: 1,
  },

  glassmorphismCardBorder: {
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.6)",
    borderStyle: "solid",
  },

  feedPostView: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "none",
  },

  feedPostHeader: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    backgroundColor: "none",
  },

  feedPostHeaderLeft: {
    flexDirection: "row",
    gap: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "none",
  },

  feedPostVinyls: {
    flex: 1,
    height: 250,
    position: "relative",
    flexDirection: "row",
    backgroundColor: "none",
    justifyContent: "center",
    alignItems: "center",
    width: 250,
    padding: 25,
  },

  feedPostInteractions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    padding: 20,
    backgroundColor: "none",
    color: "black",
  },

  feedPostInteractionContainer: {
    flexDirection: "column",
    gap: 0,
    justifyContent: "center",
    alignItems: "center",

    backgroundColor: "none",
    color: "black",
  },

  feedPostInteractionCount: {
    fontSize: 12,
  },

  feedPostSongs: {
    justifyContent: "center",
    alignItems: "center",

    color: "black",
    backgroundColor: "none",
    width: "100%",
    padding: 20,

    gap: 10,
  },

  feedPostComment: {
    backgroundColor: "none",
    paddingBottom: 20,
  },
});
