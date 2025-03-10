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
import { ThemedView } from "@/components/ThemedView";
import CDDisc from "@/components/auth/CDDisc";
import GlassmorphismButtonView from "@/components/GlassmorphismButtonView";
import GlassmorphismTextInput from "@/components/GlassmorphismTextInput";
import GlassmorphismView from "@/components/GlassmorphismView";
import CDDiscCarousel from "@/components/feed/CDDiscCarousel";

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

  const vinylSpacing = 250;

  return (
    <ThemedView style={styles.createModal}>
      {/* IMAGES: CDs */}
      <GlassmorphismView containerStyle={styles.createModalImages}>
        <CDDiscCarousel cards={[]} cdSize={150} />
      </GlassmorphismView>

      {/* SONG CONTROLS: Count + Add Songs Button */}
      <View style={styles.songControlsContainer}>
        <Text style={styles.songCount}>{songs.length}/6</Text>
        <Link
          href={{
            pathname: "/create-modal/add-songs",
            params: { songs: JSON.stringify(songs) },
          }}
          asChild
        >
          <Pressable>
            <GlassmorphismButtonView
              label="Add Songs"
              sfSymbol="plus"
              buttonColor="black"
              disabled={false}
            />
          </Pressable>
        </Link>
      </View>

      {/* SONGS: Flatlist of songs added */}
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

      {/* FOOTER: Description Input + Share Button */}
      <View style={styles.createModalFooter}>
        <GlassmorphismTextInput
          value={caption}
          placeholder="Add a description..."
          onChangeText={setCaption}
          numLines={4}
          keyboardType="default"
          containerStyle={styles.inputContainer}
        />
        <Pressable onPress={handleShare} style={{ flex: 1 }}>
          <GlassmorphismButtonView
            label="Share"
            disabled={false}
            buttonColor="white"
            sfSymbol="paperplane"
            textSize={20}
            buttonHeight={65}
          />
        </Pressable>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  createModal: {
    flex: 0.5,
  },
  createModalDate: {
    fontSize: 16,
    color: "#000",
    position: "absolute",
    right: 18,
    top: 15,
  },
  createModalFooter: {
    flex: 1,
    gap: 20,
    flexDirection: "column",
  },
  createModalImages: {
    flexBasis: 350,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    backgroundColor: "transparent",
  },
  songControlsContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  songCount: {
    fontSize: 24,
    fontWeight: 400,
    color: "#000",
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
    flex: 1,
    paddingBottom: 300,
  },
  artistName: {
    color: "#666",
    fontWeight: "normal",
  },
  inputContainer: {
    flexBasis: 100,
    borderRadius: 50,
  },
});
