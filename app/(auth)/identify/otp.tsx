import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import {
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
  Text,
} from "react-native";
import { useState } from "react";
import { useLocalSearchParams, Stack, Redirect } from "expo-router";
import CDDisc from "@/components/auth/CDDisc";
import GlassmorphismTextInput from "@/components/GlassmorphismTextInput";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

import { SafeAreaView } from "react-native";
import { useAuthActions } from "@convex-dev/auth/dist/react";
import { Authenticated, Unauthenticated } from "convex/react";

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
  console.log(registrationStatus);

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
        <ThemedView style={styles.OTPScreenContainer}>
          <SafeAreaView style={styles.discContainer}>
            <ThemedView style={styles.OTPScreen}>
              {/* HERO: Card + Text */}
              <ThemedView style={styles.OTPScreenHero}>
                {/* CARD:  Vinyls */}
                <ThemedView
                  style={[styles.vinylContainer, { marginLeft: vinylSpacing }]}
                >
                  {cards.map((imageUri, index) => (
                    <CDDisc
                      key={index}
                      imageUri={imageUri}
                      discSize={125}
                      marginLeft={vinylSpacing}
                    />
                  ))}
                </ThemedView>

                {/* TEXT: Title + Subtitle */}
                <ThemedView style={styles.OTPScreenText}>
                  <ThemedText type="title" style={styles.OTPScreenTitle}>
                    We sent you a verification code.
                  </ThemedText>
                  <ThemedText type="subtitle" style={styles.OTPScreenSubtitle}>
                    Enter the code sent to +1 407 747 0791.
                  </ThemedText>
                </ThemedView>
              </ThemedView>

              {/* FORM: Input + Button */}
              <ThemedView style={styles.OTPScreenForm}>
                <GlassmorphismTextInput
                  placeholder="OTP Verification"
                  value={otp}
                  onChangeText={setOtp}
                  iconUrl={require("@/assets/auth/phone-icon.png")}
                />
                <TouchableOpacity
                  style={styles.buttonContainer}
                  onPress={handleVerifyOtp}
                >
                  <ThemedText type="link" style={styles.buttonText}>
                    Next
                  </ThemedText>
                </TouchableOpacity>
                <ThemedText style={styles.OTPScreenDisclaimer}>
                  By continuing you confirm that you've read and accepted our
                  Terms and Privacy Policy.
                </ThemedText>
              </ThemedView>
            </ThemedView>
          </SafeAreaView>
        </ThemedView>
      </Unauthenticated>
    </>
  );
}

const styles = StyleSheet.create({
  OTPScreenContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  } as ViewStyle,
  discContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 200,
  } as ViewStyle,
  OTPScreen: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",

    width: 375,
    height: "100%",
    gap: 50,
    paddingTop: 0,
  },
  OTPScreenHero: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    gap: 175,
  },
  OTPScreenText: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
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
    color: "#000",
    fontFamily: "Helvetica-Regular",
  },
  OTPScreenForm: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
  OTPScreenDisclaimer: {
    fontSize: 12,
    textAlign: "center",
    fontWeight: 300,
    color: "#8D8D8D",
    lineHeight: 20,
  } as TextStyle,

  buttonContainer: {
    display: "flex",
    width: "100%",
    height: 65,

    backgroundColor: "#000", // Solid black background
    borderRadius: 50, // Makes it pill-shaped
    paddingVertical: 20,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "stretch",
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

const formatPhoneNumber = (number: string) => {
  if (!number.startsWith("+1")) {
    return `+1${number.replace(/\D/g, "")}`; // Add the +1 sign back so Twilio is happy
  }
  return number;
};
