import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { Button, Pressable, StyleSheet, Text, TextInput } from "react-native";
import { useState } from "react";
import SignInButton from "@/components/sign-in-button";
import { Link } from "expo-router";
import React from "react";

export default function OTPScreen() {
  const [number, onChangeNumber] = useState("");
  return (
    <>
      <ThemedView style={styles.container}>
        <ThemedText type="title"> We sent you a verification code</ThemedText>
        <TextInput
          style={styles.input}
          onChangeText={onChangeNumber}
          value={number}
          placeholder="OTP"
          placeholderTextColor="#666"
          keyboardType="numeric"
        />
        <ThemedText type="subtitle">
          {" "}
          TODO: actually implement otp auth{" "}
        </ThemedText>
        <Link href="/welcome/back">
          <ThemedText type="link"> Go through login flow</ThemedText>
        </Link>
        <Link href="/register/music-auth">
          <ThemedText type="link"> Go through register flow</ThemedText>
        </Link>
      </ThemedView>
    </>
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
