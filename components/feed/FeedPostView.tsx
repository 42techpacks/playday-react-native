import { useState } from "react";
import { Text, StyleSheet, Image } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol.ios";
import LinearGradient from "react-native-linear-gradient";
import VinylImage from "./VinylImage";
import SongView from "./SongView";
import { ThemedText } from "@/components/ThemedText";
import CommentInput from "./CommentInput";

const songs = [
  { title: "Sex on the Beach", artist: "DJ Assault" },
  { title: "Gem Lingo", artist: "Overmono" },
  { title: "Bounce Dat A**", artist: "DJ Funk" },
  { title: "Helmet", artist: "Steve Lacy" },
  { title: "ARE WE STILL FRIENDS?", artist: "Tyler, the Creator" },
  { title: "Within", artist: "Daft Punk" },
];

export default function FeedPostView() {
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
        <ThemedView style={styles.feedPostVinyls}>
          <VinylImage />
          <VinylImage />
          <VinylImage />
          <VinylImage />
          <VinylImage />
          <VinylImage />
        </ThemedView>

        {/* Post Interactions */}
        <ThemedView style={styles.feedPostInteractions}>
          <ThemedView style={styles.feedPostHeaderLeft}>
            <ThemedView style={styles.feedPostInteractionContainer}>
              <Image
                source={require("../../assets/feed/like-icon.png")}
                style={{ height: 19, width: 21 }}
              />
              <ThemedText style={styles.feedPostInteractionCount}>
                294
              </ThemedText>
            </ThemedView>
            <ThemedView style={styles.feedPostInteractionContainer}>
              <Image
                source={require("../../assets/feed/comment-icon.png")}
                style={{ height: 18, width: 18 }}
              />
              <ThemedText style={styles.feedPostInteractionCount}>1</ThemedText>
            </ThemedView>
          </ThemedView>
          <ThemedView style={styles.feedPostInteractionContainer}>
            <Image
              source={require("../../assets/feed/save-icon.png")}
              style={{ height: 19, width: 19 }}
            />
            <ThemedText style={styles.feedPostInteractionCount}>100</ThemedText>
          </ThemedView>
        </ThemedView>

        <ThemedView style={styles.feedPostSongs}>
          {songs.map((song, index) => (
            <SongView key={index} songTitle={song.title} artist={song.artist} />
          ))}
        </ThemedView>

        <CommentInput />
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
    display: "flex",
    width: "100%",
    height: 800,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "none",
  },

  feedPostHeader: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    backgroundColor: "none",
  },

  feedPostHeaderLeft: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "none",
  },

  feedPostVinyls: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "none",
    justifyContent: "center",
    alignItems: "center",
    width: 250,
    marginLeft: 250,
    padding: 25,
  },

  feedPostInteractions: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    padding: 20,
    backgroundColor: "none",
    color: "black",
  },

  feedPostInteractionContainer: {
    display: "flex",
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
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    color: "black",
    backgroundColor: "none",
    width: "100%",
    padding: 20,

    gap: 10,
  },
});
