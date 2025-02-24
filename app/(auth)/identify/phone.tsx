import { StyleSheet, TextInput, View, TouchableOpacity, KeyboardAvoidingView, Platform } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useState } from "react";
import { useAction } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useRouter } from "expo-router";

export default function PhoneScreen() {
  const [number, setNumber] = useState("");
  const sendOtp = useAction(api.auth.sendOtp);
  const router = useRouter();

  const handleSendOtp = async () => {
    try {
      await sendOtp({ phoneNumber: number });
      router.push(`/identify/otp?phone=${number}`); // Pass number to OTP page
    } catch (error) {
      alert("Failed to send OTP. Try again.");
      console.error(error);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title"> Enter Your Phone Number</ThemedText>
      <ThemedText type="subtitle" style={styles.subtext}>
        Please include +1 at the beginning of your number.
      </ThemedText>
      <TextInput
        style={styles.input}
        onChangeText={setNumber}
        value={number}
        placeholder="Enter Phone Number"
        placeholderTextColor="#666"
        keyboardType="phone-pad"
      />
      <TouchableOpacity onPress={handleSendOtp} style={styles.buttonContainer}>
        <ThemedText type="link"> Sign In</ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 50, 
  },
  title: {
    marginBottom: 20,
  },
  input: {
    height: 50,
    width: "80%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  buttonContainer: {
    backgroundColor: 'black',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  subtext: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
    marginBottom: 10,
  },  
});