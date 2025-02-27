import { StyleSheet, View } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { Link } from "expo-router";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { SafeAreaView } from "react-native-safe-area-context";
import CDDisc from "@/components/auth/CDDisc";

const cards = [
  require("@/assets/auth/Steve-Lacy-Gemini-Rights.png"),
  require("@/assets/auth/tyler_the_creator.png"),
  require("@/assets/auth/travis_scott.png"),
  require("@/assets/auth/dj_assault.png"),
  require("@/assets/auth/migos.png"),
];
const vinylSpacing = 250;
export default function FinishScreen() {
  const user = useQuery(api.auth.getCurrentUser);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <ThemedView style={styles.container}>
        <ThemedView
          style={[styles.vinylContainer, { marginLeft: vinylSpacing }]}
        >
          {cards.map((imageUri, index) => (
            <CDDisc
              key={index}
              imageUri={imageUri}
              marginLeft={vinylSpacing}
            />
          ))}
        </ThemedView>
        <ThemedText type="title">
          Username
        </ThemedText>
        <ThemedText type="defaultSemiBold">
          {user?.profile?.username}
        </ThemedText>
        <ThemedText type="title">
          Spotify {!!user?.spotifyToken ? "✅ " : "❌"}
        </ThemedText>

        <Link href="/register/onboard">
          <View style={styles.buttonContainer}>
            <ThemedText style={styles.buttonText}>Finish</ThemedText>
          </View>
        </Link>
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 20,
    position: "relative",
  },
  vinylContainer: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
  logoContainer: {
    position: "absolute",
    top: 20,
    left: 20,
    width: 100,
    height: 40,
    backgroundColor: "white",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "black",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2,
  },
  circle: {
    position: "absolute",
    top: 20,
    right: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "black",
    backgroundColor: "white",
    zIndex: 3,
  },
  largeBox: {
    position: "absolute",
    top: "20%",
    width: 250,
    height: 250,
    backgroundColor: "white",
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "black",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  finishText: {
    marginTop: 500,
    marginBottom: 20,
    fontSize: 24,
    fontWeight: "bold",
  },
  buttonContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "black",
    paddingVertical: 16,
    justifyContent: "center",
    alignItems: "center",
    width: 250,
    marginTop: 5,
  },
  buttonText: {
    fontFamily: "Helvetica",
    color: "blue",
    textAlign: "center",
    fontSize: 24,
  },
});
