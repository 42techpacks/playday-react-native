import { StyleSheet, TextInput } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Link } from "expo-router";
import { useState } from "react";

export default function PhoneScreen() {
  const [number, onChangeNumber] = useState("");

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title"> Enter Your Phone number</ThemedText>
      <TextInput
        style={styles.input}
        onChangeText={onChangeNumber}
        value={number}
        placeholder="Enter Phone Number"
        placeholderTextColor="#666"
        keyboardType="phone-pad"
      />
      <Link href="/identify/otp" replace={true}>
        {" "}
        <ThemedText type="link"> Next</ThemedText>
      </Link>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
