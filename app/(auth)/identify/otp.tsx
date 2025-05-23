import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import {
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
  Text,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from "react-native";
import { useState } from "react";
import { useLocalSearchParams, Stack, Redirect } from "expo-router";
import CDDisc from "@/components/auth/CDDisc";
import GlassmorphismButtonView from "@/components/GlassmorphismButtonView";
import GlassmorphismTextInput from "@/components/GlassmorphismTextInput";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

import { SafeAreaView } from "react-native";
import { useAuthActions } from "@convex-dev/auth/dist/react";
import { Authenticated, Unauthenticated } from "convex/react";
import React from "react";

const cards = [
  require("@/assets/auth/Steve-Lacy-Gemini-Rights.png"),
  require("@/assets/auth/tyler_the_creator.png"),
  require("@/assets/auth/travis_scott.png"),
  require("@/assets/auth/dj_assault.png"),
  require("@/assets/auth/migos.png"),
];
const vinylSpacing = 60;

export default function OTPScreen() {
  const { phone } = useLocalSearchParams();
  const phoneNumber = Array.isArray(phone) ? phone[0] : phone;
  const [otp, setOtp] = useState("");
  const { signIn } = useAuthActions();
  const registrationStatus = useQuery(api.auth.checkRegistrationStatus);

  const handleVerifyOtp = async () => {
    const formattedNumber = formatPhoneNumber(phoneNumber); // Reformat the number before sending
    signIn("twilio", { phone: formattedNumber, code: otp }).catch((error) => {
      console.error(error);
      alert("Code could not be verified. Try again.");
    });
  };

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
            keyboardVerticalOffset={0}
          >
            <TouchableWithoutFeedback
              style={{ flex: 1 }}
              onPress={Keyboard.dismiss}
            >
              <ThemedView style={styles.OTPScreen}>
                {/* HERO: Card + Text */}
                <ThemedView style={styles.OTPScreenHero}>
                  {/* CARD:  Vinyls */}
                  <ThemedView style={[styles.vinylContainer]}>
                    {cards.map((imageUri, index) => (
                      <CDDisc key={index} imageUri={imageUri} discSize={225} />
                    ))}
                  </ThemedView>

                  {/* TEXT: Title + Subtitle */}
                  <ThemedView style={styles.OTPScreenText}>
                    <ThemedText type="title" style={styles.OTPScreenTitle}>
                      We sent you a verification code.
                    </ThemedText>
                    <ThemedText
                      type="subtitle"
                      style={styles.OTPScreenSubtitle}
                    >
                      Enter the code sent to +1 407 747 0791.
                    </ThemedText>
                  </ThemedView>
                </ThemedView>

                {/* FORM: Input + Button */}
                <ThemedView style={styles.OTPScreenForm}>
                  {/* 'OTP VERIFICATION' Input */}
                  <GlassmorphismTextInput
                    placeholder="OTP Verification"
                    value={otp}
                    onChangeText={setOtp}
                    iconUrl={require("@/assets/auth/phone-icon.png")}
                    containerStyle={styles.OTPScreenFormInput}
                    keyboardType="phone-pad"
                  />
                  {/* 'NEXT' Button */}
                  <TouchableOpacity
                    style={styles.buttonContainer}
                    onPress={handleVerifyOtp}
                  >
                    <GlassmorphismButtonView
                      label="Next"
                      disabled={false}
                      textSize={16}
                      buttonColor="black"
                      buttonHeight={50}
                    />
                  </TouchableOpacity>
                  <ThemedText style={styles.OTPScreenDisclaimer}>
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
  OTPScreen: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    paddingHorizontal: 30,
  },
  OTPScreenHero: {
    flex: 3,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  OTPScreenForm: {
    flex: 1.1,
    gap: 10,
    flexDirection: "column",
    justifyContent: "flex-end",
  },
  vinylContainer: {
    flex: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  OTPScreenText: {
    flex: 1,
    flexDirection: "column",

    justifyContent: "flex-end",
    alignItems: "center",

    gap: "5px",
    backgroundColor: "none",
  },
  OTPScreenTitle: {
    fontWeight: 400,
    fontSize: 21,
  },
  OTPScreenSubtitle: {
    fontSize: 15,
    fontWeight: 300,
  },
  OTPScreenFormInput: {
    flexBasis: 60,
    flexDirection: "row",
    borderRadius: 30,
    borderWidth: 1,
  },

  buttonContainer: {
    flexBasis: 50,
    flexDirection: "row",
    backgroundColor: "transparent",
  },
  buttonText: {
    fontFamily: "Helvetica-Regular",
    color: "white",
    textAlign: "center",
  },
  OTPScreenDisclaimer: {
    fontSize: 12,
    textAlign: "center",
    fontWeight: 300,
    color: "#8D8D8D",
    lineHeight: 20,
  } as TextStyle,
});

const formatPhoneNumber = (number: string) => {
  if (!number.startsWith("+1")) {
    return `+1${number.replace(/\D/g, "")}`; // Add the +1 sign back so Twilio is happy
  }
  return number;
};
