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

const tyler = require("@/assets/auth/tyler_the_creator.png");
const { width, height } = Dimensions.get("window");
export default function ProfileScreen() {
  const daylists = useQuery(api.daylists.list);

  if (!daylists) {
    return (
      <ThemedView style={styles.container}>
        <Text>Loading...</Text>
      </ThemedView>
    );
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <ThemedView style={styles.container}>
        <FlatList
          data={daylists}
          contentContainerStyle={styles.feedPosts}
          renderItem={({ item }) => <FeedPostView daylist={item} />}
          ListHeaderComponent={
            <ThemedView style={{ flex: 1 }}>
              <ThemedView style={styles.profileIdentifiers}>
                <ThemedView style={styles.profileNaming}>
                  <ThemedText type="title">kenjamin</ThemedText>
                  <ThemedText type="default"> Kenny Oseleononmen </ThemedText>
                </ThemedView>

                <ThemedView style={styles.profileImage}>
                  <Disc imageUri={tyler} discSize={width * 0.15} />
                </ThemedView>
              </ThemedView>
              <ThemedView style={styles.profileControls}>
                <Link href="/settings" asChild>
                  <Pressable style={styles.buttonContainer}>
                    <ThemedText type="defaultSemiBold"> Settings </ThemedText>
                  </Pressable>
                </Link>
                <Pressable
                  style={styles.buttonContainer}
                  onPress={() => {
                    alert("TODO");
                  }}
                >
                  <ThemedText type="defaultSemiBold"> Share Profile</ThemedText>
                </Pressable>
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
  container: {
    flex: 1,
  },
  profileHeader: {
    //has name and imgage stacked on top of buttons
    height: height * 0.13,
  },
  profileIdentifiers: {
    //Has naming and image in it
    flex: 2,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  profileNaming: {
    // has user name and full name stacked on top of each other
    flex: 4,
    flexDirection: "column",
  },
  profileImage: {
    //Just the users image in a disk
    flex: 1,
  },
  profileControls: {
    //has settings and share profile button side by side
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    gap: 10,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 50,
    borderColor: "#000",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  feedPosts: {
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    gap: 50,
    padding: 25,
  },
});
