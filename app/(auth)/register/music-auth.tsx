import { StyleSheet, View } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { Link } from "expo-router";
import React from "react";

export default function MusicServiceAuthScreen() {
  return (
    <ThemedView style={styles.container}>
      <View style={styles.logoContainer}>
        <ThemedText type="subtitle" style={styles.text}>
          logo
        </ThemedText>
      </View>

      <View style={styles.largeBox}></View>

      <View style={styles.content}>
        <View style={styles.buttonContainer}>
          <ThemedText style={styles.buttonText}>Login with Spotify - TODO</ThemedText>
        </View>

        <View style={styles.buttonContainer}>
          <ThemedText style={styles.buttonText}>Login with Apple Music - TODO</ThemedText>
        </View>

        <Link href="/register/username">
          <ThemedText type="link"> Next </ThemedText>
        </Link>
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
  buttonContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'black',
    paddingVertical: 12,
    justifyContent: 'center',
    alignItems: 'center',
    width: 250,
    marginTop: 20, 
  },
  buttonText: {
    fontFamily: 'Helvetica',
    color: 'blue',
    textAlign: 'center',
  },
  text: {
    marginBottom: 10,
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
});
