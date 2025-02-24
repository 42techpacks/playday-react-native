import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { StyleSheet, TextInput, View, TouchableOpacity } from "react-native";
import { useState } from "react";
import { useAction } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useRouter, useLocalSearchParams } from "expo-router";

export default function OTPScreen() {
  const { phone } = useLocalSearchParams();
  const phoneNumber = Array.isArray(phone) ? phone[0] : phone;
  const [otp, setOtp] = useState("");
  const [verified, setVerified] = useState(false);
  const verifyOtp = useAction(api.auth.verifyOtp);
  const router = useRouter();

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
    <ThemedView style={styles.container}>
      <ThemedText type="title"> Enter OTP</ThemedText>
      <TextInput
        style={styles.input}
        onChangeText={setOtp}
        value={otp}
        placeholder="Enter OTP"
        placeholderTextColor="#666"
        keyboardType="numeric"
      />

      <TouchableOpacity onPress={handleVerifyOtp} style={styles.buttonContainer}>
        <ThemedText type="link"> Verify OTP</ThemedText>
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
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start", 
    padding: 20,
    position: 'relative',
  },
  logoContainer: {
    position: 'absolute',
    top: 20,
    left: 20,
    width: 100,
    height: 40,
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  largeBox: {
    position: 'absolute',
    top: '20%', 
    width: 250,
    height: 250,
    backgroundColor: 'white',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
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
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'black',
    paddingVertical: 12,
    justifyContent: 'center',
    alignItems: 'center',
    width: 250,
    marginBottom: 15,
  },
  buttonText: {
    fontFamily: 'Helvetica',
    color: 'blue',
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