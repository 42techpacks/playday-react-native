import { Dimensions, Image } from "react-native";
import { ThemedView } from "../ThemedView";
import { ThemedText } from "../ThemedText";
import GlassmorphismView from "../GlassmorphismView";
import { IconSymbol } from "../ui/IconSymbol.ios";
import { StyleSheet } from "react-native";

const { width, height } = Dimensions.get("window");

interface SearchResultProps {
  username?: string;
  numFollowers?: number;
  numFollowing?: number;
  numPosts?: number;
  profilePhoto?: string;
}

export default function SearchResult({
  username = "?",
  numFollowers = 0,
  numFollowing = 0,
  numPosts = 0,
  profilePhoto,
}: SearchResultProps) {
  return (
    <GlassmorphismView
      containerStyle={styles.searchResult}
      flexRow={true}
      shadowEnabled={true}
    >
      {/* LEFT: Profile Photo */}
      <ThemedView style={styles.left}>
        <ThemedView style={styles.pfp}>
          {profilePhoto ? (
            <Image
              source={{ uri: profilePhoto }}
              style={{ width: height * 0.1, height: height * 0.1 }}
            />
          ) : (
            <IconSymbol
              name={"person.circle"}
              size={height * 0.12}
              color={"#e0e0e0"}
            />
          )}
        </ThemedView>
      </ThemedView>
      {/* RIGHT: Username + User Info */}
      <ThemedView style={styles.right}>
        {/* 'USERNAME' */}
        <ThemedText style={styles.userText}>@{username}</ThemedText>
        {/* USER INFO: Followers + Following + Posts */}
        <ThemedView style={styles.userInfo}>
          {/* 'FOLLOWERS' */}
          <ThemedView style={styles.infoItem}>
            <ThemedText style={styles.infoNum}>{numFollowers}</ThemedText>
            <ThemedText style={styles.infoText}>Followers</ThemedText>
          </ThemedView>
          {/* 'FOLLOWING' */}
          <ThemedView style={styles.infoItem}>
            <ThemedText style={styles.infoNum}>{numFollowing}</ThemedText>
            <ThemedText style={styles.infoText}>Following</ThemedText>
          </ThemedView>
          {/* 'POSTS' */}
          <ThemedView style={styles.infoItem}>
            <ThemedText style={styles.infoNum}>{numPosts}</ThemedText>
            <ThemedText style={styles.infoText}>Posts</ThemedText>
          </ThemedView>
        </ThemedView>
      </ThemedView>
    </GlassmorphismView>
  );
}

const styles = StyleSheet.create({
  searchResult: {
    flexBasis: height * 0.15,
    flexDirection: "row",
    borderRadius: 0,
    backgroundColor: "none",
  },
  userText: {
    fontSize: height * 0.02,
    fontWeight: 500,
    lineHeight: height * 0.02,
  },
  left: {
    backgroundColor: "none",
    paddingHorizontal: 20,
  },
  pfp: {
    width: height * 0.1,
    height: height * 0.1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
    borderRadius: height * 0.1,
    overflow: "hidden",
  },
  right: {
    flex: 3,

    flexDirection: "column",
    backgroundColor: "none",
    gap: 10,
  },
  userInfo: {
    flexBasis: height * 0.05,
    flexDirection: "row",
    backgroundColor: "none",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "flex-end",
    paddingRight: 30,
  },
  infoItem: {
    backgroundColor: "none",
    justifyContent: "center",
    alignItems: "center",
  },
  infoNum: {
    fontSize: height * 0.025,
    fontWeight: 300,
    lineHeight: height * 0.025,
    color: "#121212",
  },
  infoText: {
    fontSize: height * 0.015,
    fontWeight: 500,
    lineHeight: height * 0.02,
    color: "#121212",
  },
});
