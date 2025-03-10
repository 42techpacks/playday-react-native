import { StyleSheet, Text, SafeAreaView } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { Image } from "react-native";
import Disc from "@/components/common/Disc";
import { Dimensions, FlatList } from "react-native";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import FeedPostView from "@/components/feed/FeedPostView";
import { Pressable } from "react-native";
import { Link } from "expo-router";
import { IconSymbol } from "@/components/ui/IconSymbol.ios";
import GlassmorphismButtonView from "@/components/GlassmorphismButtonView";

const { width, height } = Dimensions.get("window");
export default function ProfileScreen({
  profilePhoto,
}: {
  profilePhoto?: string;
}) {
  const daylists = useQuery(api.daylists.list);

  if (!daylists) {
    return (
      <ThemedView style={styles.profileScreen}>
        <Text>Loading...</Text>
      </ThemedView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <ThemedView style={styles.profileScreen}>
        <FlatList
          data={daylists}
          contentContainerStyle={styles.feedPosts}
          renderItem={({ item }) => <FeedPostView daylist={item} />}
          ListHeaderComponent={
            <ThemedView style={{ flex: 1 }}>
              {/* PROFILE INFO: Profile Photo + Username + Profile Info + Controls */}
              <ThemedView style={styles.profileInfo}>
                {/* LEFT: Profile Photo */}
                <ThemedView style={styles.left}>
                  <ThemedView style={styles.pfp}>
                    {profilePhoto ? (
                      <Image
                        source={{ uri: profilePhoto }}
                        style={{ width: height * 0.16, height: height * 0.16 }}
                      />
                    ) : (
                      <IconSymbol
                        name={"person.circle"}
                        size={height * 0.16}
                        color={"#e0e0e0"}
                      />
                    )}
                  </ThemedView>
                </ThemedView>
                {/* RIGHT: Username + User Info + Controls */}
                <ThemedView style={styles.right}>
                  {/* 'USERNAME' */}
                  <ThemedText style={styles.userText}>@kenjamin</ThemedText>
                  {/* USER INFO: Followers + Following + Posts */}
                  <ThemedView style={styles.userInfo}>
                    {/* 'FOLLOWERS' */}
                    <ThemedView style={styles.infoItem}>
                      <ThemedText style={styles.infoNum}>42</ThemedText>
                      <ThemedText style={styles.infoText}>Followers</ThemedText>
                    </ThemedView>
                    {/* 'FOLLOWING' */}
                    <ThemedView style={styles.infoItem}>
                      <ThemedText style={styles.infoNum}>42</ThemedText>
                      <ThemedText style={styles.infoText}>Following</ThemedText>
                    </ThemedView>
                    {/* 'POSTS' */}
                    <ThemedView style={styles.infoItem}>
                      <ThemedText style={styles.infoNum}>42</ThemedText>
                      <ThemedText style={styles.infoText}>Posts</ThemedText>
                    </ThemedView>
                  </ThemedView>
                  {/* PROFILE CONTROLS: Settings + Share Profile */}
                  <ThemedView style={styles.profileControls}>
                    <Link href="/settings" asChild>
                      <Pressable style={styles.buttonContainer}>
                        <GlassmorphismButtonView
                          label="Settings"
                          buttonColor="white"
                          disabled={false}
                          style={styles.buttonStyle}
                          textSize={width * 0.03}
                        />
                      </Pressable>
                    </Link>
                    <Pressable
                      style={styles.buttonContainer}
                      onPress={() => {
                        alert("TODO");
                      }}
                    >
                      <GlassmorphismButtonView
                        label="Share Profile"
                        buttonColor="white"
                        disabled={false}
                        style={styles.buttonStyle}
                        textSize={width * 0.03}
                      />
                    </Pressable>
                  </ThemedView>
                </ThemedView>
              </ThemedView>
            </ThemedView>
          }
          ListHeaderComponentStyle={styles.profileHeader}
        />
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  profileScreen: {
    flex: 1,
  },
  profileHeader: {
    marginLeft: -10,
  },
  profileInfo: {
    flexDirection: "row",
    borderRadius: 0,
    gap: 10,

    justifyContent: "center",
    alignItems: "center",
  },
  left: {
    backgroundColor: "none",
  },
  pfp: {
    width: height * 0.16,
    height: height * 0.16,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
    borderRadius: height * 0.16,
    overflow: "hidden",
  },
  right: {
    flex: 3,

    flexDirection: "column",
    backgroundColor: "none",
    gap: 10,
  },
  userText: {
    fontSize: height * 0.02,
    fontWeight: 500,
    lineHeight: height * 0.02,
  },
  userInfo: {
    flexDirection: "row",
    backgroundColor: "none",
    justifyContent: "space-between",
    alignItems: "flex-end",
    paddingRight: 10,
  },
  infoItem: {
    backgroundColor: "none",
    justifyContent: "center",
    alignItems: "center",
  },
  infoNum: {
    fontSize: height * 0.022,
    fontWeight: 300,
    lineHeight: height * 0.022,
    color: "#121212",
  },
  infoText: {
    fontSize: height * 0.015,
    fontWeight: 500,
    lineHeight: height * 0.02,
    color: "#121212",
  },
  profileControls: {
    flexBasis: 20,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 5,
  },
  buttonContainer: {
    flex: 0.5,
    flexDirection: "row",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonStyle: {},
  feedPosts: {
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    gap: 50,
    padding: 25,
  },
});
