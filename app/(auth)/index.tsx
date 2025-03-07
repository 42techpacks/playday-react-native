/* This is the landing page.*/
import { useRouter, Redirect } from "expo-router";
import React from "react";
import CDDisc from "@/components/auth/CDDisc";
import { useFonts } from "expo-font";
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
  SafeAreaView,
  StyleSheet,
  Animated,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  ViewStyle,
  TextStyle,
  Text,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useState } from "react";
import { useAuthActions } from "@convex-dev/auth/dist/react";
import LinearGradient from "react-native-linear-gradient";
import GlassmorphismTextInput from "@/components/GlassmorphismTextInput";
import { Authenticated, Unauthenticated, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

const cards = [
  require("@/assets/auth/Steve-Lacy-Gemini-Rights.png"),
  require("@/assets/auth/tyler_the_creator.png"),
  require("@/assets/auth/travis_scott.png"),
  require("@/assets/auth/dj_assault.png"),
  require("@/assets/auth/migos.png"),
];
const formatPhoneNumber = (number: string) => {
  if (!number.startsWith("+1")) {
    return `+1${number.replace(/\D/g, "")}`; // Add the +1 sign back so Twilio is happy
  }
  return number;
};
export default function PhoneScreen() {
  const [number, setNumber] = useState("");
  const router = useRouter();
  const { signIn } = useAuthActions();
  const registrationStatus = useQuery(api.auth.checkRegistrationStatus);

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

  const vinylSpacing = 250;

  return (
    <>
      <Authenticated>
        {registrationStatus ? (
          registrationStatus.hasSpotifyTokens ? (
            <Redirect href="/(tabs)/(feed)" />
          ) : (
            <Redirect href="/(auth)/register/music-auth" />
          )
        ) : (
          <Text>Loading...</Text>
        )}
      </Authenticated>
      <Unauthenticated>
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
              <ThemedView style={styles.phoneScreen}>
                {/* HERO: Vinyls + Text */}
                <ThemedView style={styles.phoneScreenHero}>
                  {/* CARD:  Vinyls */}
                  <ThemedView style={[styles.vinylsContainer]}>
                    {cards.map((imageUri, index) => (
                      <CDDisc
                        key={index}
                        imageUri={imageUri}
                        containerStyle={{
                          position: "absolute",
                          backgroundColor: "none",
                          transform: [
                            {
                              translateX: (index - (cards.length - 1) / 2) * -10,
                            },
                          ],
                        }}
                      />
                    ))}
                  </ThemedView>

                  {/* TEXT: Title + Subtitle */}
                  <ThemedView style={styles.phoneScreenText}>
                    <ThemedText type="title" style={styles.phoneScreenTitle}>
                      Discover the sound of the day.
                    </ThemedText>
                    <ThemedText
                      type="subtitle"
                      style={styles.phoneScreenSubtitle}
                    >
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
                    containerStyle={styles.phoneScreenFormInput}
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
      </Unauthenticated>
    </>
  );
}

const styles = StyleSheet.create({
  phoneScreen: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    marginHorizontal: 10,
  } as ViewStyle,
  phoneScreenHero: {
    flex: 3,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  } as ViewStyle,
  vinylsContainer: {
    flex: 3,
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  } as ViewStyle,
  phoneScreenText: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "none",
  } as ViewStyle,
  phoneScreenTitle: {
    fontWeight: 400,
    fontSize: 21,
  } as TextStyle,
  phoneScreenSubtitle: {
    fontSize: 15,
    fontWeight: 300,
    color: "#000",
    fontFamily: "Helvetica-Regular",
  } as TextStyle,
  phoneScreenForm: {
    flex: 1,
    gap: 10,
    flexDirection: "column",
    justifyContent: "flex-start",
  } as ViewStyle,
  phoneScreenFormInput: {
    flex: 2,
    width: "100%",
    borderRadius: 30,
    borderWidth: 1,
  } as ViewStyle,

  buttonContainer: {
    width: "100%",
    flex: 2,
    flexShrink: 0,
    backgroundColor: "#000", // Solid black background
    borderRadius: 50, // Makes it pill-shaped
    justifyContent: "center",
  } as ViewStyle,

  buttonText: {
    fontFamily: "Helvetica-Regular",
    color: "white",
    textAlign: "center",
  } as TextStyle,

  phoneScreenDisclaimer: {
    marginHorizontal: 50,
    flex: 1,
    fontSize: 14,
    textAlign: "center",
    fontWeight: 300,
    color: "#8D8D8D",
    lineHeight: 18,
  } as TextStyle,

  cardContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  } as ViewStyle,
});
