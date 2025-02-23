import {
  View,
  TextInput,
  StyleSheet,
  Pressable,
  Text,
  FlatList,
} from "react-native";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import { Song } from "./add-songs";

export default function CreatePostScreen() {
  const router = useRouter();
  const [songs, setSongs] = useState<Song[]>([
    {
      id: "1",
      title: "Sex on the Beach",
      artist: "DJ Assault",
      selected: false,
    },
    { id: "2", title: "Bounce Dat G*", artist: "DJ Funk", selected: false },
    { id: "3", title: "Swit Urgo", artist: "Overmono", selected: false },
    { id: "4", title: "Helmet", artist: "Steve Lacy", selected: false },
    {
      id: "5",
      title: "ARE WE STILL FRIENDS?",
      artist: "Tyler, The Creator",
      selected: false,
    },
    { id: "6", title: "Within", artist: "Daft Punk", selected: false },
  ]);

  return (
    <View style={styles.container}>
      <Text style={styles.date}>January 25th, 2025</Text>

      <View style={styles.albumContainer}>
        <View style={styles.albumArt}>
          <View style={styles.innerCircle} />
        </View>
        <View style={styles.songControlsContainer}>
          <Text style={styles.songCount}>6/6 Songs</Text>
          <View style={styles.spacer} />
          <Link href="/create-modal/add-songs" asChild>
            <Pressable style={styles.addButton}>
              <View style={styles.addButtonContainer}>
                <Text style={styles.addButtonText}>Add Songs</Text>
              </View>
            </Pressable>
          </Link>
        </View>
      </View>
      <FlatList
        data={songs}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <Pressable
            style={styles.songItem}
            onPress={() => console.log("pressed")}
          >
            <View style={styles.songInfo}>
              <Text style={styles.songTitle}>
                {item.title} •{" "}
                <Text style={styles.artistName}>{item.artist}</Text>
              </Text>
            </View>
            {/* <Text style={styles.addButton}>+</Text> */}
          </Pressable>
        )}
      />

      <View style={styles.footer}>
        <TextInput
          style={styles.caption}
          placeholder="Enter a caption..."
          multiline
          numberOfLines={4}
        />

        <Link href={"../"} asChild>
          <Pressable style={styles.shareButton}>
            <Text style={styles.shareButtonText}>Share</Text>
          </Pressable>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  date: {
    fontSize: 16,
    color: "#000",
    marginBottom: 20,
  },
  footer: {
    position: "absolute",
    bottom: 110,
    left: 16,
    right: 16,
  },
  albumContainer: {
    alignItems: "center",
    marginVertical: 20,
    gap: 12,
  },
  albumArt: {
    width: 280,
    height: 280,
    borderRadius: 140,
    borderWidth: 2,
    borderColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  innerCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#000",
  },
  songControlsContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  spacer: {
    flex: 1,
  },
  songCount: {
    fontSize: 16,
    color: "#000",
  },
  addButton: {
    backgroundColor: "#fff",
    borderWidth: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
  },
  addButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  addButtonText: {
    fontSize: 16,
    color: "#000",
    fontWeight: "500",
  },
  caption: {
    borderWidth: 1,
    borderColor: "#000",
    backgroundColor: "#fff",
    borderRadius: 4,
    padding: 12,
    height: 100,
    textAlignVertical: "top",
    marginTop: 20,
  },
  shareButton: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 4,
    alignItems: "center",
    marginTop: 20,
    borderWidth: 1,
    borderColor: "#000",
  },
  shareButtonText: {
    color: "#000",
    fontSize: 16,
  },
  songItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  songInfo: {
    flex: 1,
  },
  songTitle: {
    fontSize: 14,
    fontWeight: "500",
  },
  listContent: {
    paddingBottom: 300,
  },
  artistName: {
    color: "#666",
    fontWeight: "normal",
  },
});
