import { StyleSheet, TextInput, View } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { Link } from "expo-router";

export default function UsernameScreen() {
  return (
    <ThemedView style={styles.container}>
      <View style={styles.logoContainer}>
        <ThemedText type="subtitle">
          logo
        </ThemedText>
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
          placeholder="Enter username"
          placeholderTextColor="#666"
        />
      </View>

      {/* Next Link framed as a button */}
      <Link href="/register/pfp">
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
    justifyContent: "flex-start", // Push content towards the top
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
  usernameText: {
    marginTop: 50, // Adjusted to be below the logo container and circle
    marginBottom: 20, // Space between the text and the large box
    fontSize: 24, // Make it larger if necessary
    fontWeight: 'bold', // Make the text stand out more
  },
  largeBox: {
    position: 'absolute',
    top: '20%', // Keep the large box centered
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
  inputContainer: {
    marginTop: 500, // Push the input field below the large box
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'black',
  },
  input: {
    height: 40,
    paddingHorizontal: 10,
    color: '#333',
  },
  buttonContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'black',
    paddingVertical: 16,  // Increased padding for larger font size
    justifyContent: 'center',
    alignItems: 'center',
    width: 250,
    marginTop: 5,
    zIndex: 1, // Ensure text isn't covered
    // Removed minHeight to allow the container to grow with the text
  },
  buttonText: {
    fontFamily: 'Helvetica',
    color: 'blue', // Ensure text is visible with a contrasting color
    textAlign: 'center',
    fontSize: 20, // Increased font size for "Next"
  },
});
