import { View, Text, StyleSheet, Pressable } from "react-native";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { Link } from "expo-router";
export default function FeedOverlayView() {
  return (
    <View style={styles.container}>
      <IconSymbol name="music.note" size={48} color="white" />
      <View style={styles.textContainer}>
        <Text style={styles.title}>Explore what today sounds like.</Text>
        <Text style={styles.subtitle}>
          Share your song of the day to unlock your feed
        </Text>
      </View>
      <Link href="/create-modal" asChild>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Create Post</Text>
        </Pressable>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.9)",
    zIndex: 100,
    justifyContent: "center",
    alignItems: "center",
    gap: 24,
  },
  textContainer: {
    alignItems: "center",
    gap: 8,
  },
  title: {
    color: "#666",
    fontSize: 20,
    fontWeight: "500",
    textAlign: "center",
  },
  subtitle: {
    color: "#666",
    fontSize: 16,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#666",
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 8,
    width: "80%",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});
