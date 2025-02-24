import { StyleSheet, View } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { Link } from "expo-router";

export default function FinishScreen() {
  return (
    <ThemedView style={styles.container}>
      <View style={styles.logoContainer}>
        <ThemedText type="subtitle">logo</ThemedText>
      </View>

      <View style={styles.circle}></View>

      <View style={styles.largeBox}></View>

      <ThemedText type="title" style={styles.finishText}>
        Finish
      </ThemedText>

      <Link href="/register/onboard">
        <View style={styles.buttonContainer}>
          <ThemedText style={styles.buttonText}>Finish</ThemedText>
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
  finishText: {
    marginTop: 500,
    marginBottom: 20,
    fontSize: 24,
    fontWeight: "bold",
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
  },
  buttonText: {
    fontFamily: "Helvetica",
    color: "blue",
    textAlign: "center",
    fontSize: 24,
  },
});
