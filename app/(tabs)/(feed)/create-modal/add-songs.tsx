import { View, TextInput, StyleSheet, FlatList, Pressable } from "react-native";
import { Text } from "react-native";
import { Link, useRouter, useLocalSearchParams } from "expo-router";
import { useState, useEffect, useMemo } from "react";
import { useSpotifySearch } from "@/hooks/useSpotifyApis";
import { useSpotifyAuth } from "@/hooks/useSpotifyAuth";
import { SpotifyTrack } from "@/lib/spotify";
import SpotifyAuthButton from "@/components/spotify/spotify-auth-button";

export type DaylistSong = {
  id: string;
  name: string;
  artists: { name: string }[];
  selected?: boolean;
};

export type Song = SpotifyTrack & {
  selected?: boolean;
};

export default function AddSongsScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ songs?: string }>();
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedQuery = useDebounce(searchQuery, 300);
  const { isAuthenticated, isLoading: authLoading } = useSpotifyAuth();
  const {
    data: searchResults,
    isLoading: searchLoading,
    error,
  } = useSpotifySearch(debouncedQuery);

  // Parse existing songs from params
  const existingSongs: DaylistSong[] = useMemo(() => {
    if (!params.songs) return [];
    try {
      return JSON.parse(params.songs);
    } catch (e) {
      console.error("Failed to parse existing songs:", e);
      return [];
    }
  }, [params.songs]);

  // Track selected song IDs
  const [selectedSongs, setSelectedSongs] = useState<Set<string>>(() =>
    new Set(existingSongs.map(song => song.id))
  );

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

  // Map search results to DaylistSong format
  const searchSongs: DaylistSong[] = useMemo(() =>
    searchResults?.map(track => ({
      id: track.id,
      name: track.name,
      artists: track.artists.map(a => ({ name: a.name }))
    })) || [],
  [searchResults]);

  const handleDone = () => {
    // Combine existing and search songs, filtering by selected IDs
    const allSongs = [...existingSongs, ...searchSongs];
    const uniqueSongs = allSongs.filter((song, index) =>
      selectedSongs.has(song.id) &&
      allSongs.findIndex(s => s.id === song.id) === index
    );

    router.dismissTo({
      pathname: "/create-modal",
      params: { songs: JSON.stringify(uniqueSongs) }
    });
  };

  // Show search results if searching, otherwise show existing songs
  const displaySongs = searchQuery ? searchSongs : existingSongs;
  const isLoading = authLoading || searchLoading;

  // If not authenticated, show auth button
  if (!isAuthenticated && !authLoading) {
    return (
      <View style={styles.authContainer}>
        <Text style={styles.authText}>Connect to Spotify to search for songs</Text>
        <SpotifyAuthButton />
      </View>
    );
  }

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
          data={displaySongs}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          renderItem={({ item: song }) => (
            <Pressable
              style={[
                styles.songItem,
                selectedSongs.has(song.id) && styles.selectedSongItem,
              ]}
              onPress={() => toggleSongSelection(song.id)}
            >
              <View style={styles.songInfo}>
                <Text style={styles.songTitle}>{song.name}</Text>
                <Text style={styles.artistName}>
                  {song.artists.map((a) => a.name).join(", ")}
                </Text>
              </View>
              <Text style={styles.addButton}>{selectedSongs.has(song.id) ? "✓" : "+"}</Text>
            </Pressable>
          )}
        />
      )}

      <View style={styles.footer}>
        <Text style={styles.selectedCount}>
          {selectedSongs.size}/6 Songs Selected
        </Text>
        <Pressable style={styles.doneButton} onPress={handleDone}>
          <Text style={styles.doneButtonText}>Done</Text>
        </Pressable>
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
  authContainer: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  authText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
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

