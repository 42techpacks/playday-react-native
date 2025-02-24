import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { StyleSheet, TextInput, View, TouchableOpacity } from "react-native";
import { useState } from "react";
import { useAction } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useRouter, useLocalSearchParams } from "expo-router";
import TopBar from "../TopBar";
import CDDisc from "../CDDisc";
import { Link,  } from "expo-router";

import { useFonts } from "expo-font";
import {

  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from "react-native";

import { SafeAreaView, Text,  Animated } from "react-native";

export default function OTPScreen() {
  const { phone } = useLocalSearchParams();
  const phoneNumber = Array.isArray(phone) ? phone[0] : phone;
  const [otp, setOtp] = useState("");
  const [verified, setVerified] = useState(false);
  const verifyOtp = useAction(api.auth.verifyOtp);
  const router = useRouter();
  const [isSideBySide, setIsSideBySide] = useState(false);
  const [animation] = useState(new Animated.Value(0)); // Animated value for transitions

  const cards = [
    require('../Steve-Lacy-Gemini-Rights.png'),
    require('../tyler_the_creator.png'),
    require('../travis_scott.png'),
    require('../dj_assault.png'),
    require('../migos.png')
  ];

  const formatPhoneNumber = (number: string) => {
    if (!number.startsWith("+1")) {
      return `+1${number.replace(/\D/g, "")}`; // Add the +1 sign back so Twilio is happy
    }
    return number;
  };

  const handleVerifyOtp = async () => {
    try {
      const formattedNumber = formatPhoneNumber(phoneNumber); // Reformat the number before sending
      const response = await verifyOtp({ phoneNumber: formattedNumber, otp });
  
      if (response.success) {
        alert(response.message);
        setVerified(true);
      } else {
        alert("Invalid OTP. Try again.");
      }
    } catch (error) {
      alert("OTP verification failed. Are you sure you know how to read numbers, doofus?");
      console.error(error);
    }
  };

  
  return (
    
    <ThemedView style={styles.container2}>
      <TopBar/>
      <SafeAreaView style={styles.discContainer}>
      {/* Button to toggle view 
      <TouchableOpacity style={styles.button} onPress={toggleView}>
          <Text style={styles.buttonText}>{isSideBySide ? "Show Stack" : "Show Side by Side"}</Text>
      </TouchableOpacity>*/}

      {/* Cards container */}
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
                    marginHorizontal: 0,  // No space between cards for overlap
                    transform: [
                      {
                        translateX: animation.interpolate({
                          inputRange: [0, 1],
                          outputRange: [0, index * -50],  // Cards slide out with increasing offset
                        }),
                      },
                      {
                        scale: animation.interpolate({
                          inputRange: [0, 1],
                          outputRange: [1, 1],  // No scaling, but you can adjust if needed
                        }),
                      },
                    ],
                    opacity: animation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [1, 1], // Keep opacity consistent during transition
                    }),
                    zIndex: cards.length - index,  // Ensure the top card is on top
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
                            index === 0 ? 10 : index === 1 ? 20 : index === 2 ? 30 : index === 3 ? 40 : index === 4 ? 50 : 0,  // Apply increasing offset by +20 for each card
                            index * 250,  // Cards slide to the right (250px per card)
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

      <TextInput
        style={styles.input}
        onChangeText={setOtp}
        value={otp}
        placeholder="Enter OTP"
        placeholderTextColor="#666"
        keyboardType="numeric"
      />

      <TouchableOpacity onPress={handleVerifyOtp} style={styles.buttonContainer}>
        <ThemedText type="link" style={styles.buttonText}> Verify OTP</ThemedText>
      </TouchableOpacity>

      {verified && (
        <>
          <TouchableOpacity onPress={() => router.push("/welcome/back")} style={styles.buttonContainer}>
            <ThemedText> Login </ThemedText>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push("/register/music-auth")} style={styles.buttonContainer}>
            <ThemedText> Register </ThemedText>
          </TouchableOpacity>
        </>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
discContainer: {
  flex: 1,
  // Align items in the center horizontally
  alignItems: "center",
  justifyContent: "flex-start",
  marginTop: 55,
  marginRight: 300
},
  container2: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 1, 
    padding: 20,
    position: 'relative',
    borderRadius: 25,   

  },
  container: {
    flex: 1,
    // Align items in the center horizontally
    alignItems: "center",
    justifyContent: "flex-start"
  },
  
  content: {
    marginTop: 400,
    alignItems: 'center',
    width: '100%',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: 250,
  },
  buttonContainer: {
    backgroundColor: "#000", // Solid black background
    borderRadius: 25,        // Makes it pill-shaped
    paddingVertical: 9,
    paddingHorizontal: 50,
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
    height: 45,
    marginBottom: 275
  },
  buttonText: {
    fontFamily: 'Helvetica',
    color: 'white',
    textAlign: 'center',
  },
  circle: {
    position: 'absolute',
    top: 20,
    right: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'black',
    backgroundColor: 'white',
    zIndex: 3,
  },
  text: {
    marginBottom: 10,
  },
});