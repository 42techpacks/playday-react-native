import {
  View,
  TextInput,
  StyleSheet,
  Pressable,
  Text,
  FlatList,
} from "react-native";
import { Link, useRouter, useLocalSearchParams } from "expo-router";
import { useState, useEffect } from "react";
import { DaylistSong } from "./add-songs";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function CreatePostScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ songs?: string }>();
  const [caption, setCaption] = useState("");
  const createDaylist = useMutation(api.daylists.create);
  const [songs, setSongs] = useState<DaylistSong[]>([]);

  useEffect(() => {
    if (params.songs) {
      try {
        const newSongs = JSON.parse(params.songs) as DaylistSong[];
        setSongs(newSongs);
      } catch (e) {
        console.error("Failed to parse songs:", e);
      }
    }
  }, [params.songs]);

  const handleShare = async () => {
    await createDaylist({
      caption,
      songs: songs.map(({ id, name, artists }) => ({ id, name, artists })),
    });
    router.dismissTo({
      pathname: "/",
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.date}>January 25th, 2025</Text>

      <View style={styles.albumContainer}>
        <View style={styles.albumArt}>
          <View style={styles.innerCircle} />
        </View>
        <View style={styles.songControlsContainer}>
          <Text style={styles.songCount}>{songs.length}/6 Songs</Text>
          <View style={styles.spacer} />
          <Link
            href={{
              pathname: "/create-modal/add-songs",
              params: { songs: JSON.stringify(songs) },
            }}
            asChild
          >
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
            onPress={() => console.log("song in create modal list pressed")}
          >
            <View style={styles.songInfo}>
              <Text style={styles.songTitle}>
                {item.name} •{" "}
                <Text style={styles.artistName}>{item.artists[0].name}</Text>
              </Text>
            </View>
          </Pressable>
        )}
      />

      <View style={styles.footer}>
        <TextInput
          style={styles.caption}
          placeholder="Enter a caption..."
          multiline
          numberOfLines={4}
          value={caption}
          onChangeText={setCaption}
        />

        <Pressable
          style={[
            styles.shareButton,
            songs.length === 0 && styles.disabledButton,
          ]}
          onPress={handleShare}
          disabled={songs.length === 0}
        >
          <Text style={styles.shareButtonText}>Share</Text>
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
  disabledButton: {
    opacity: 0.5,
  },
});
