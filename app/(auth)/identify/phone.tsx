/* This is the screen where users enter their phone number to sign in.*/

import { StyleSheet, TextInput, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Link } from "expo-router";
import { useState } from "react";

export default function PhoneScreen() {
  const [number, onChangeNumber] = useState("");

  return (
    <ThemedView style={styles.container}>
            <View style={styles.circle}></View>
      
       <View style={styles.logoContainer}>
              <ThemedText type="subtitle" style={styles.text}>
                logo
              </ThemedText>
            </View>
        <View style={styles.largeBox}></View>

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
        <View style={styles.buttonContainer}>
        <ThemedText type="link"> Sign In</ThemedText>   
        </View>

      </Link>
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
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
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
