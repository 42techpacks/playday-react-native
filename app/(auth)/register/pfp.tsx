import { StyleSheet, TextInput, View } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { Link } from "expo-router";

export default function ProfileImageScreen() {
  return (
    <ThemedView style={styles.container}>
      <View style={styles.logoContainer}>
        <ThemedText type="subtitle">logo</ThemedText>
      </View>

      <View style={styles.circle}></View>

      <ThemedText type="title" style={styles.profileImageText}>
        Add a profile image
      </ThemedText>

      <View style={styles.largeBox}></View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Upload"
          placeholderTextColor="#666"
        />
      </View>

      <Link href="/(auth)/register/finish">
        <View style={styles.buttonContainer}>
          <ThemedText style={styles.buttonText}>Next</ThemedText>
        </View>
      </Link>
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
  profileImageText: {
    marginTop: 80,
    marginBottom: 20,
    fontSize: 24,
    fontWeight: "bold",
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
  inputContainer: {
    marginTop: 400,
    width: 100,
    height: 100,
    borderRadius: 75,
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: "100%",
    height: "100%",
    borderRadius: 75,
    textAlign: "center",
    color: "#333",
  },
  buttonContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "black",
    paddingVertical: 16,
    justifyContent: "center",
    alignItems: "center",
    width: 250,
    marginTop: 5,
    zIndex: 1,
  },
  buttonText: {
    fontFamily: "Helvetica",
    color: "blue",
    textAlign: "center",
    fontSize: 24,
  },
});
