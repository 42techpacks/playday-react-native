/* This is the landing page.*/

import { StyleSheet, View } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { Link } from "expo-router";

export default function LandingScreen() {
  return (
    <ThemedView style={styles.container}>
      <View style={styles.logoContainer}>
        <ThemedText type="subtitle" style={styles.text}>
          logo
        </ThemedText>
      </View>

      <View style={styles.largeBox}></View>

      <ThemedText type="title" style={styles.text}> The landing page. </ThemedText>
      <ThemedText type="subtitle" style={styles.text}>
        See Figma for what it should look like
      </ThemedText>

      <Link href="/identify/phone">
        <View style={styles.buttonContainer}>
          <ThemedText style={styles.buttonText}> Sign In With Phone Number </ThemedText>
        </View>
      </Link>

      <View style={styles.circle}></View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end", 
    paddingBottom: 200, 
    paddingTop: 100,
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
    top: '30%', 
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
  text: {
    marginBottom: 10,
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
});
