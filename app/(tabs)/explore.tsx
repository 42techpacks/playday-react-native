import { StyleSheet, Image, Platform, Dimensions } from "react-native";

import { Pressable, Text } from "react-native";
import { Collapsible } from "@/components/Collapsible";
import { ExternalLink } from "@/components/ExternalLink";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { SafeAreaView } from "react-native";
import { IconSymbol } from "@/components/ui/IconSymbol";
import SignOutButton from "@/components/auth-inputs/SignOutButton";
import SpoitifyAuthButton from "@/components/spotify/spotify-auth-button";
import { Link } from "expo-router";

import CDDisc from "@/components/auth/CDDisc";
import CDDiscCarousel from "@/components/feed/CDDiscCarousel";
import GlassmorphismButtonView from "@/components/GlassmorphismButtonView";
import SongProgressBar from "@/components/feed/SongProgressBar";

const { width, height } = Dimensions.get("window");

const cards = [
  {
    image: require("@/assets/auth/Steve-Lacy-Gemini-Rights.png"),
    title: "Bad Habit",
    artist: "Steve Lacy",
  },
  {
    image: require("@/assets/auth/tyler_the_creator.png"),
    title: "EARFQUAKE",
    artist: "Tyler, The Creator",
  },
  {
    image: require("@/assets/auth/travis_scott.png"),
    title: "SICKO MODE",
    artist: "Travis Scott",
  },
  {
    image: require("@/assets/auth/dj_assault.png"),
    title: "Sex on the Beach",
    artist: "DJ Assault",
  },
  {
    image: require("@/assets/auth/migos.png"),
    title: "Bad and Boujee",
    artist: "Migos",
  },
];

const cardImages = [
  require("@/assets/auth/Steve-Lacy-Gemini-Rights.png"),
  require("@/assets/auth/tyler_the_creator.png"),
  require("@/assets/auth/travis_scott.png"),
  require("@/assets/auth/dj_assault.png"),
  require("@/assets/auth/migos.png"),
];

export default function TabTwoScreen() {
  const { width, height } = Dimensions.get("window");
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <ThemedView style={styles.audioFeed}>
        <ThemedView style={styles.headerContainer}>
          {/* POST HEADER: User + Time Posted */}
          <ThemedView style={styles.postHeader}>
            <ThemedText style={styles.postUser}>@npcmilo</ThemedText>
            <ThemedText style={styles.timePosted}>42 minutes ago</ThemedText>
          </ThemedView>
          {/* SONG HEADER: Song Title + Song Artist */}
          <ThemedView style={styles.songHeader}>
            <ThemedText style={styles.songTitle}>{cards[0].title}</ThemedText>
            <ThemedText style={styles.songArtist}>{cards[0].artist}</ThemedText>
          </ThemedView>
        </ThemedView>
        {/* POST: CD Disc Carousel + Post Header */}
        <ThemedView style={styles.postContainer}>
          {/* CD DISCS: Carousel */}
          <CDDiscCarousel cards={cardImages} cdSize={height * 0.35} />
        </ThemedView>
        {/* CONTROLS: Post Interactions + Song Progress Bar + Interactions */}
        <ThemedView style={styles.controls}>
          {/* POST INTERACTIONS: Like + Comment + Save */}
          <ThemedView style={styles.postInteractions}>
            {/* 'LIKE' Button */}
            <Pressable onPress={() => console.log("like")}>
              <IconSymbol size={35} name="heart" color="black" />
            </Pressable>
            <ThemedView style={styles.postInteractionsRight}>
              {/* 'COMMENT' Button */}
              <Pressable onPress={() => console.log("comment")}>
                <IconSymbol size={35} name="bubble" color="black" />
              </Pressable>
              {/* 'SAVE' Button */}
              <Pressable onPress={() => console.log("save")}>
                <IconSymbol size={35} name="plus.square" color="black" />
              </Pressable>
            </ThemedView>
          </ThemedView>
          {/* SONG PROGRESS BAR */}
          <SongProgressBar />
          {/* SONG INTERACTIONS: Back + Play/Pause + Next */}
          <ThemedView style={styles.songInteractions}>
            {/* 'BACK' Button */}
            <Pressable
              style={styles.songInteractionButton}
              onPress={() => console.log("back")}
            >
              <GlassmorphismButtonView
                buttonColor="white"
                sfSymbol="backward.end"
                disabled={false}
                textSize={width / 5 - 45}
                style={{ borderRadius: width / 5 }}
              />
            </Pressable>
            {/* 'PLAY/PAUSE' Button */}
            <Pressable
              style={styles.songInteractionButton}
              onPress={() => console.log("play/pause")}
            >
              <GlassmorphismButtonView
                buttonColor="black"
                sfSymbol="play"
                disabled={false}
                textSize={width / 5 - 35}
                style={{ borderRadius: width / 5 }}
              />
            </Pressable>
            {/* 'NEXT' Button */}
            <Pressable
              style={styles.songInteractionButton}
              onPress={() => console.log("next")}
            >
              <GlassmorphismButtonView
                buttonColor="white"
                sfSymbol="forward.end"
                disabled={false}
                textSize={width / 5 - 45}
                style={{ borderRadius: width / 5 }}
              />
            </Pressable>
          </ThemedView>
        </ThemedView>
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  audioFeed: {
    flex: 1,
    padding: 30,
    paddingBottom: 75,
  },
  headerContainer: {
    flex: 0.25,
  },
  songHeader: {
    flexBasis: height * 0.08,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  songTitle: {
    fontSize: height * 0.045,
    fontWeight: 300,
    lineHeight: height * 0.045,
  },
  songArtist: {
    fontSize: height * 0.02,
    fontWeight: 200,
    lineHeight: height * 0.02,
  },
  postHeader: {
    flexBasis: height * 0.035,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  postUser: {
    fontWeight: 300,
    fontSize: height * 0.02,
  },
  timePosted: {
    fontWeight: 300,
    fontSize: height * 0.02,
  },
  postContainer: {
    flex: 0.5,
    backgroundColor: "transparent",
  },
  controls: {
    flex: 0.5,
    flexDirection: "column",
    justifyContent: "flex-end",
    backgroundColor: "none",
    gap: 2.5,
  },
  postInteractions: {
    flexBasis: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "transparent",
    marginBottom: 5,
  },
  postInteractionsRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  songInteractions: {
    flexBasis: width / 5,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
    backgroundColor: "none",
  },
  songInteractionButton: {
    borderRadius: width / 5,
    flexBasis: width / 5,
  },
  buttonContainer: {
    backgroundColor: "transparent",
    flexBasis: 80,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  vinylContainer: {
    flexBasis: 350,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
});
