/* This is the landing page.*/
import { Link, useRouter } from "expo-router";
import React from "react";
import TopBar from "@/components/auth/TopBar";
import CDDisc from "@/components/auth/CDDisc";
import { useFonts } from "expo-font";
import {
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  SafeAreaView,
  StyleSheet,
  Animated,
  KeyboardAvoidingView,
  Keyboard,
  View,
  Platform,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useState } from "react";
import { useAuthActions } from "@convex-dev/auth/dist/react";

export default function PhoneScreen() {
  const [fontsLoaded] = useFonts({
    "Helvetica-Regular": require("@/assets/fonts/Helvetica.ttf"),
  });

  const formatPhoneNumber = (number: string) => {
    if (!number.startsWith("+1")) {
      return `+1${number.replace(/\D/g, "")}`; // Add the +1 sign back so Twilio is happy
    }
    return number;
  };
  const cards = [
    require("@/assets/auth/Steve-Lacy-Gemini-Rights.png"),
    require("@/assets/auth/tyler_the_creator.png"),
    require("@/assets/auth/travis_scott.png"),
    require("@/assets/auth/dj_assault.png"),
    require("@/assets/auth/migos.png"),
  ];
  const [isSideBySide, setIsSideBySide] = useState(false);
  const [animation] = useState(new Animated.Value(0)); // Animated value for transitions

  const [number, setNumber] = useState("");
  const router = useRouter();
  const { signIn } = useAuthActions();
  const handleSendOtp = async () => {
    try {
      const formattedNumber = formatPhoneNumber(number);
      signIn("twilio", { phone: formattedNumber })
        .then(() => router.push(`/identify/otp?phone=${number}`))
        .catch((error) => {
          alert("Failed to send OTP. Try again.");
          console.error(error);
        });
    } catch (error) {
      alert("Failed to send OTP. Try again.");
      console.error(error);
    }
  };

  const toggleView = () => {
    Animated.timing(animation, {
      toValue: isSideBySide ? 0 : 1, // Toggle between 0 (stacked) and 1 (side-by-side)
      duration: 500, // Transition duration in ms
      useNativeDriver: true,
    }).start();
    setIsSideBySide((prev) => !prev);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
        keyboardVerticalOffset={100}
      >
        <TouchableWithoutFeedback
          style={{ flex: 1 }}
          onPress={Keyboard.dismiss}
        >
          <ThemedView style={styles.container}>
            <ThemedView style={{ flex: 1 }}>
              <TopBar />
            </ThemedView>
            {/* Cards container */}
            <ThemedView style={{ flex: 2, position: "relative" }}>
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
                            left: "50%", // Center the cards
                            marginLeft: -150, // Half of card width to center
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
            </ThemedView>

            {/* Everything below this will be pushed to the bottom */}
            <ThemedView
              style={{
                flex: 3,
                flexDirection: "column",
                rowGap: 10,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ThemedText type="title" style={{ fontSize: 24 }}>
                Enter your phone number
              </ThemedText>
              <ThemedText type="subtitle" style={styles.subtext}>
                Just for verification. We won't call you or give it to anyone.
              </ThemedText>
              <TextInput
                style={styles.input}
                onChangeText={setNumber}
                value={number}
                placeholder="Enter Phone Number"
                placeholderTextColor="#666"
                keyboardType="phone-pad"
              />
              <TouchableOpacity
                style={styles.buttonContainer}
                onPress={handleSendOtp}
              >
                <ThemedText type="link" style={styles.buttonText}>
                  Sign In
                </ThemedText>
              </TouchableOpacity>
            </ThemedView>
          </ThemedView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-around",
  },
  inner: {
    flex: 1,
    flexDirection: "column",
    rowGap: 10,
  },
  subtitle: {
    fontFamily: "Helvetica-Regular",
    fontSize: 15,
  },
  subtext: {
    fontSize: 14,
    color: "#666",
    fontFamily: "Helvetica-Regular",
  },
  input: {
    height: 65,
    width: "90%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    paddingHorizontal: 10,
    fontFamily: "Helvetica-Regular",
  },
  buttonContainer: {
    backgroundColor: "#000", // Solid black background
    borderRadius: 50, // Makes it pill-shaped
    paddingVertical: 9,
    paddingHorizontal: 50,
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
    height: 65,
  },
  buttonText: {
    fontFamily: "Helvetica-Regular",
    color: "white",
    textAlign: "center",
  },
  cardContainer: {
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
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
