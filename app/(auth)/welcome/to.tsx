import { StyleSheet } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { Pressable } from "react-native";
import { Link } from "expo-router";
import CDDisc from "@/components/auth/CDDisc";

const cards = [
  require("@/assets/auth/Steve-Lacy-Gemini-Rights.png"),
  require("@/assets/auth/tyler_the_creator.png"),
  require("@/assets/auth/travis_scott.png"),
  require("@/assets/auth/dj_assault.png"),
  require("@/assets/auth/migos.png"),
];
const vinylSpacing = 250;
export default function WelcomeToScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedView style={{ flex: 4, justifyContent: "center" }}>
        <ThemedText type="title"> Welcome to Playday</ThemedText>
        <ThemedText type="subtitle">
          {" "}
          A sacred place for your curated vibes
        </ThemedText>
        <ThemedView
          style={[styles.vinylContainer, { marginLeft: vinylSpacing }]}
        >
          {cards.map((imageUri, index) => (
            <CDDisc key={index} imageUri={imageUri} marginLeft={vinylSpacing} />
          ))}
        </ThemedView>
      </ThemedView>

      <ThemedView style={{ flex: 1, width: "100%" }}>
        <Link href="/(tabs)/(feed)" asChild>
          <Pressable style={styles.buttonContainer}>
            <ThemedText type="title" style={styles.buttonText}>
              Enter App
            </ThemedText>
          </Pressable>
        </Link>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  buttonContainer: {
    display: "flex",
    width: "100%",
    height: 65,
    backgroundColor: "#000", // Solid black background
    borderRadius: 50, // Makes it pill-shaped
    paddingVertical: 9,
    alignItems: "center",
    justifyContent: "center",
  },

  buttonText: {
    fontFamily: "Helvetica-Regular",
    color: "white",
    textAlign: "center",
  },
  vinylContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
