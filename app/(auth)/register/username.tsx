import { Pressable, StyleSheet, TextInput, View, Text } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import { api } from "@/convex/_generated/api";
import { useMutation, useQuery } from "convex/react";

export default function UsernameScreen() {
  const [username, onChangeUsername] = useState("");
  const regStatus = useQuery(api.auth.checkRegistrationStatus);
  const addUsername = useMutation(api.auth.addUsername);
  const router = useRouter();

  return (
    <ThemedView style={styles.container}>
      <View style={styles.logoContainer}>
        <ThemedText type="subtitle">logo</ThemedText>
      </View>

      {/* Circle in top right corner */}
      <View style={styles.circle}></View>

      {/* Choose a Username Text */}
      <ThemedText type="title" style={styles.usernameText}>
        Choose a username
      </ThemedText>

      {/* Large Box */}
      <View style={styles.largeBox}></View>

      {/* Input Field for Username */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={onChangeUsername}
          value={username}
          placeholder="Enter username"
          placeholderTextColor="#666"
        />
      </View>

      {/* Next Link framed as a button */}
      <Pressable
        style={styles.buttonContainer}
        disabled={username.length < 2}
        onPress={async () => {
          await addUsername({ username });
          router.push("/register/pfp");
        }}
      >
        <Text
          style={[
            styles.buttonText,
            { color: username.length < 2 ? "gray" : "blue" },
          ]}
        >
          Next
        </Text>
      </Pressable>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start", // Push content towards the top
    padding: 20,
    position: "relative",
  },
  logoContainer: {
    position: "absolute",
    top: 20,
    left: 20,
    width: 100,
    height: 40,
    backgroundColor: "white",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "black",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2,
  },
  fixToText: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  circle: {
    position: "absolute",
    top: 20,
    right: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "black",
    backgroundColor: "white",
    zIndex: 3,
  },
  usernameText: {
    marginTop: 50, // Adjusted to be below the logo container and circle
    marginBottom: 20, // Space between the text and the large box
    fontSize: 24, // Make it larger if necessary
    fontWeight: "bold", // Make the text stand out more
  },
  largeBox: {
    position: "absolute",
    top: "20%", // Keep the large box centered
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
  inputContainer: {
    marginTop: 500, // Push the input field below the large box
    width: "80%",
    backgroundColor: "white",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "black",
  },
  input: {
    height: 40,
    paddingHorizontal: 10,
    color: "#333",
  },
  buttonContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "black",
    paddingVertical: 16, // Increased padding for larger font size
    justifyContent: "center",
    alignItems: "center",
    width: 250,
    marginTop: 5,
    zIndex: 1, // Ensure text isn't covered
    // Removed minHeight to allow the container to grow with the text
  },
  buttonText: {
    fontFamily: "Helvetica",
    color: "blue", // Ensure text is visible with a contrasting color
    textAlign: "center",
    fontSize: 20, // Increased font size for "Next"
  },
});
