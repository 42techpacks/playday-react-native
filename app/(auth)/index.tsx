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
import LinearGradient from "react-native-linear-gradient";
import GlassmorphismTextInput from "@/components/GlassmorphismTextInput";

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
    <SafeAreaView
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
        }}
        keyboardVerticalOffset={100}
      >
        <TouchableWithoutFeedback
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            flex: 1,
          }}
          onPress={Keyboard.dismiss}
        >
          <ThemedView style={styles.phoneScreen}>
            {/* HERO: Card + Text */}
            <ThemedView style={styles.phoneScreenHero}>
              {/* CARD:  Vinyls */}
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

              {/* TEXT: Title + Subtitle */}
              <ThemedView style={styles.phoneScreenText}>
                <ThemedText type="title" style={styles.phoneScreenTitle}>
                  Discover the sound of the day.
                </ThemedText>
                <ThemedText type="subtitle" style={styles.phoneScreenSubtitle}>
                  Listen, curate, and share your favorite music.
                </ThemedText>
              </ThemedView>
            </ThemedView>

            {/* FORM: Input + Button */}
            <ThemedView style={styles.phoneScreenForm}>
              <GlassmorphismTextInput
                placeholder="Phone Number"
                value={number}
                onChangeText={setNumber}
                iconUrl={require("@/assets/auth/phone-icon.png")}
              />
              <TouchableOpacity
                style={styles.buttonContainer}
                onPress={handleSendOtp}
              >
                <ThemedText type="link" style={styles.buttonText}>
                  Sign In
                </ThemedText>
              </TouchableOpacity>
              <ThemedText style={styles.phoneScreenDisclaimer}>
                By continuing you confirm that you've read and accepted our
                Terms and Privacy Policy.
              </ThemedText>
            </ThemedView>
          </ThemedView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  phoneScreen: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: 375,
    gap: 50,
    paddingTop: 200,
  },
  phoneScreenHero: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    gap: 225,
  },
  phoneScreenText: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "5px",
    backgroundColor: "none",
  },
  phoneScreenTitle: {
    fontWeight: 400,
    fontSize: 21,
  },
  phoneScreenSubtitle: {
    fontSize: 15,
    fontWeight: 300,
    color: "#000",
    fontFamily: "Helvetica-Regular",
  },
  phoneScreenForm: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
  phoneScreenDisclaimer: {
    fontSize: 12,
    textAlign: "center",
    fontWeight: 300,
    color: "#8D8D8D",
    lineHeight: "normal",
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

  cardContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
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
    width: 250,
    height: 300,
  },
});
