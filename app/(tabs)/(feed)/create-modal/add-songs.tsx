import { View, TextInput, StyleSheet, FlatList, Pressable } from "react-native";
import { Text } from "react-native";
import { Link, useRouter } from "expo-router";
import { useState } from "react";

export type Song = {
  id: string;
  title: string;
  artist: string;
  selected?: boolean;
};

export default function AddSongsScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
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
    { id: "7", title: "Midnight City", artist: "M83", selected: false },
    { id: "8", title: "Redbone", artist: "Childish Gambino", selected: false },
    { id: "9", title: "Get Lucky", artist: "Daft Punk", selected: false },
    { id: "10", title: "Alright", artist: "Kendrick Lamar", selected: false },
    { id: "11", title: "Dancing On My Own", artist: "Robyn", selected: false },
    {
      id: "12",
      title: "Don't Stop Believin'",
      artist: "Journey",
      selected: false,
    },
  ]);

  const toggleSongSelection = (id: string) => {
    setSongs(
      songs.map((song) =>
        song.id === id ? { ...song, selected: !song.selected } : song
      )
    );
  };

  return (
    <View style={styles.container}>
      <TextInput style={styles.searchInput} placeholder="Search" />

      <FlatList
        data={songs}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <Pressable
            style={styles.songItem}
            onPress={() => toggleSongSelection(item.id)}
          >
            <View style={styles.songInfo}>
              <Text style={styles.songTitle}>{item.title}</Text>
              <Text style={styles.artistName}>{item.artist}</Text>
            </View>
            <Text style={styles.addButton}>+</Text>
          </Pressable>
        )}
      />

      <View style={styles.footer}>
        <Text style={styles.selectedCount}>0/6 Songs Selected</Text>
        <Link href="../" asChild>
          <Pressable style={styles.doneButton}>
            <Text style={styles.doneButtonText}>Done</Text>
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
  closeButton: {
    position: "absolute",
    top: 16,
    left: 16,
    zIndex: 1,
    fontSize: 24,
  },
  searchInput: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: "#f0f0f0",
    marginBottom: 16,
  },
  listContent: {
    paddingBottom: 200, // Add padding at the bottom of the list
  },
  songItem: {
    padding: 16,
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
    fontSize: 16,
    fontWeight: "500",
  },
  artistName: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  addButton: {
    fontSize: 24,
    color: "#666",
  },
  footer: {
    position: "absolute",
    bottom: 140,
    left: 16,
    right: 16,
  },
  selectedCount: {
    fontSize: 14,
    color: "#666",
    marginBottom: 12,
    textAlign: "center",
  },
  doneButton: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 4,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#000",
    width: "100%",
  },
  doneButtonText: {
    color: "#000",
    fontSize: 16,
  },
});
