/* OTP authentication screen
*/

import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { Button, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { useState } from "react";
import SignInButton from "@/components/sign-in-button";
import { Link } from "expo-router";
import React from "react";

export default function OTPScreen() {
  const [number, onChangeNumber] = useState("");
  return (
    <ThemedView style={styles.container}>
      <View style={styles.logoContainer}>
        <ThemedText type="subtitle" style={styles.text}>
          logo
        </ThemedText>
      </View>

      <View style={styles.largeBox}></View>

      <View style={styles.content}>
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
          TODO: actually implement otp auth
        </ThemedText>

        <View style={styles.buttonContainer}>
          <Link href="/welcome/back">
            <ThemedText style={styles.buttonText}> Go through login flow</ThemedText>
          </Link>
        </View>

        <View style={styles.buttonContainer}>
          <Link href="/register/music-auth">
            <ThemedText style={styles.buttonText}> Go through register flow</ThemedText>
          </Link>
        </View>
      </View>

      <View style={styles.circle}></View>
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
