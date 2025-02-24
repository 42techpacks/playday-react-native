import { View, TextInput, StyleSheet, FlatList, Pressable } from "react-native";
import { Text } from "react-native";
import { Link } from "expo-router";
import { useState, useEffect } from "react";
import { useSpotifySearch } from "@/hooks/useSpotify";
import { SpotifyTrack } from "@/lib/spotify";

export type Song = SpotifyTrack & {
  selected?: boolean;
};

export default function AddSongsScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedQuery = useDebounce(searchQuery, 300);
  const {
    data: searchResults,
    isLoading,
    error,
  } = useSpotifySearch(debouncedQuery);

  useEffect(() => {
    if (searchResults) {
      console.log("Search results:", searchResults.length);
    }
    if (error) {
      console.error("Search error:", error);
    }
  }, [searchResults, error]);

  const [selectedSongs, setSelectedSongs] = useState<Set<string>>(new Set());

  const toggleSongSelection = (id: string) => {
    setSelectedSongs((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else if (newSet.size < 6) {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const songs =
    searchResults?.map((track) => ({
      ...track,
      selected: selectedSongs.has(track.id),
    })) || [];

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search songs on Spotify"
        value={searchQuery}
        onChangeText={setSearchQuery}
        autoCapitalize="none"
        autoCorrect={false}
      />

      {isLoading ? (
        <View style={styles.centered}>
          <Text>Loading...</Text>
        </View>
      ) : (
        <FlatList
          data={songs}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <Pressable
              style={[
                styles.songItem,
                item.selected && styles.selectedSongItem,
              ]}
              onPress={() => toggleSongSelection(item.id)}
            >
              <View style={styles.songInfo}>
                <Text style={styles.songTitle}>{item.name}</Text>
                <Text style={styles.artistName}>
                  {item.artists.map((a) => a.name).join(", ")}
                </Text>
              </View>
              <Text style={styles.addButton}>{item.selected ? "✓" : "+"}</Text>
            </Pressable>
          )}
        />
      )}

      <View style={styles.footer}>
        <Text style={styles.selectedCount}>
          {selectedSongs.size}/6 Songs Selected
        </Text>
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
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  selectedSongItem: {
    backgroundColor: "#f0f0f0",
  },
});

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
