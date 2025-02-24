/* This is the landing page.*/
import { Link, useRouter } from "expo-router";
import TopBar from "../../components/auth/TopBar";
import CDDisc from "@/components/auth/CDDisc";
import { useFonts } from "expo-font";
import {
  TextInput,
  View,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  Pressable,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useState } from "react";
import { useAction } from "convex/react";
import { api } from "@/convex/_generated/api";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Animated,
} from "react-native";

import {} from "react-native";

export default function LandingScreen() {
  const [fontsLoaded] = useFonts({
    "Helvetica-Regular": require("@/assets/fonts/Helvetica.ttf"),
  });

  const cards = [
    require("@/assets/auth/Steve-Lacy-Gemini-Rights.png"),
    require("@/assets/auth/tyler_the_creator.png"),
    require("@/assets/auth/travis_scott.png"),
    require("@/assets/auth/dj_assault.png"),
    require("@/assets/auth/migos.png"),
  ];
  const [isSideBySide, setIsSideBySide] = useState(false);
  const [animation] = useState(new Animated.Value(0)); // Animated value for transitions

  const toggleView = () => {
    Animated.timing(animation, {
      toValue: isSideBySide ? 0 : 1, // Toggle between 0 (stacked) and 1 (side-by-side)
      duration: 500, // Transition duration in ms
      useNativeDriver: true,
    }).start();
    setIsSideBySide((prev) => !prev);
  };

  return (
    <ThemedView style={styles.container}>
      {/* Top Bar */}
      <TopBar />

      <SafeAreaView style={styles.container2}>
        <Animated.View
          style={[
            styles.cardContainer,
            isSideBySide ? styles.sideBySide : styles.stacked,
          ]}
        >
          {cards.map((imageUri, index) => (
            <Animated.View
              key={index}
              style={[
                styles.card,
                isSideBySide
                  ? {
                      marginHorizontal: 0, // No space between cards for overlap
                      transform: [
                        {
                          translateX: animation.interpolate({
                            inputRange: [0, 1],
                            outputRange: [0, index * -50], // Cards slide out with increasing offset
                          }),
                        },
                        {
                          scale: animation.interpolate({
                            inputRange: [0, 1],
                            outputRange: [1, 1], // No scaling, but you can adjust if needed
                          }),
                        },
                      ],
                      opacity: animation.interpolate({
                        inputRange: [0, 1],
                        outputRange: [1, 1], // Keep opacity consistent during transition
                      }),
                      zIndex: cards.length - index, // Ensure the top card is on top
                    }
                  : {
                      position: "absolute", // Absolute positioning for stacked effect
                      opacity: animation.interpolate({
                        inputRange: [0, 1],
                        outputRange: [1, 0.5], // Fade effect as it stacks
                      }),
                      zIndex: cards.length - index, // Ensuring the top card is on top
                      transform: [
                        {
                          translateX: animation.interpolate({
                            inputRange: [0, 1],
                            outputRange: [
                              index === 0
                                ? 10
                                : index === 1
                                  ? 20
                                  : index === 2
                                    ? 30
                                    : index === 3
                                      ? 40
                                      : index === 4
                                        ? 50
                                        : 0, // Apply increasing offset by +20 for each card
                              index * 250, // Cards slide to the right (250px per card)
                            ],
                          }),
                        },
                      ],
                    },
              ]}
            >
              <CDDisc imageUri={imageUri} />
            </Animated.View>
          ))}
        </Animated.View>
      </SafeAreaView>

      {/* Everything below this will be pushed to the bottom */}
      <ThemedText type="subtitle" style={styles.subtext}>
        Listen, curate, and share your favorite music.
      </ThemedText>
      <ThemedText type="title">Discover the sounds of the day</ThemedText>
      <Link href="/identify/phone" asChild>
        <TouchableOpacity style={styles.buttonContainer}>
          <ThemedText type="link" style={styles.buttonText}>
            Sign in with phone number
          </ThemedText>
        </TouchableOpacity>
      </Link>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // Align items in the center horizontally
    alignItems: "center",
    justifyContent: "flex-start",
  },
  container2: {
    flex: 1,
    // Align items in the center horizontally
    alignItems: "center",
    justifyContent: "center",
    marginTop: 200,
    marginRight: 50,
  },
  header: {
    marginTop: 100, // Optional spacing from the top
    marginBottom: 10,
    fontFamily: "Helvetica-Regular",
    fontSize: 20,
  },
  subtitle: {
    marginBottom: 10,
    fontFamily: "Helvetica-Regular",
    fontSize: 15,
  },
  bottomSection: {
    // This pushes the bottom section down, leaving the header and subtitle up top
    marginBottom: "auto",
    alignItems: "center",
    width: "10%",
  },
  subtext: {
    fontSize: 14,
    color: "#666",
    marginTop: 139,
    marginBottom: 10,
    fontFamily: "Helvetica-Regular",
  },
  input: {
    height: 45,
    width: "90%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 25,
    paddingHorizontal: 10,
    marginBottom: 10,
    fontFamily: "Helvetica-Regular",
  },
  buttonContainer: {
    backgroundColor: "#000", // Solid black background
    borderRadius: 25, // Makes it pill-shaped
    paddingVertical: 9,
    paddingHorizontal: 50,
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
    height: 45,
    marginBottom: 500,
  },
  buttonText: {
    fontFamily: "Helvetica-Regular",
    color: "white",
    textAlign: "center",
  },
  button: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
    zIndex: 10, // Ensure the button stays on top of the cards
  },

  cardContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    flex: 1, // Ensure the container takes the full height
  },
  sideBySide: {
    flexDirection: "row", // Cards displayed horizontally
    justifyContent: "center", // Center the cards horizontally
  },
  stacked: {
    position: "relative", // Cards will be stacked using absolute positioning
    flexDirection: "row", // Stack the cards horizontally
  },
  card: {
    alignItems: "center",
    width: 250, // Adjust width as needed
    height: 300, // Adjust height as needed
    overflow: "hidden", // Ensures the content fits properly without overflow
  },
});
