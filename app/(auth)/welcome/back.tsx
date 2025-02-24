/*Welcome back screen*/

import { StyleSheet, View } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import SignInWithGithub from "@/components/auth-inputs/SignInWithGithub";

export default function WelcomeBackScreen() {
  return (
    <ThemedView style={styles.container}>
      <View style={styles.largeBox}></View>

      <View style={styles.content}>
        <ThemedText type="title"> Welcome back!</ThemedText>
        <ThemedText type="subtitle">
          Github Oauth until we implement actual otp auth
        </ThemedText>

        <View style={styles.buttonContainer}>
          <SignInWithGithub />
        </View>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 20,
    position: "relative",
  },
  largeBox: {
    position: "absolute",
    top: "20%",
    width: 250,
    height: 250,
    backgroundColor: "white",
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "black",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  content: {
    marginTop: 400,
    alignItems: "center",
    width: "100%",
  },
  buttonContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "black",
    paddingVertical: 12,
    justifyContent: "center",
    alignItems: "center",
    width: 250,
    marginTop: 20,
  },
});
