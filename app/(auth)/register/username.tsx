import { Pressable, StyleSheet, TextInput, View, Text, Image} from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { useRouter } from "expo-router";
import { useState } from "react";
import { api } from "@/convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import GlassmorphismTextInput from "@/components/GlassmorphismTextInput";
import GlassmorphismView from "@/components/GlassmorphismView";

export default function UsernameScreen() {
  const [username, onChangeUsername] = useState("");
  const regStatus = useQuery(api.auth.checkRegistrationStatus);
  const addUsername = useMutation(api.auth.addUsername);
  const router = useRouter();

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>Choose a username.</ThemedText>
      <ThemedText type="subtitle" style={styles.subtitle}>You can update this at any time.</ThemedText>

      <View style={styles.profileContainer}>
      <GlassmorphismView>
        <Image
          source={require("@/assets/auth/profile.png")}
          resizeMode="contain"
          style={styles.profileImage}/>
      </GlassmorphismView>
      </View>

      <View style={styles.bottomContainer}>
        <GlassmorphismTextInput 
          value={username}
          onChangeText={onChangeUsername}
          placeholder="Username"/>

        <Pressable
          style={styles.buttonContainer}
          onPress={async () => {await addUsername({ username });
          router.push("/register/pfp");}}>
          <View>

            <GlassmorphismView disableBackground={true}>
              <View /> 
            </GlassmorphismView>
              <Text
                style={[styles.buttonText,{ color: username.length < 2 ? "gray" : "white" },]}>
                Next
              </Text>
          </View>
       </Pressable>
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
  bottomContainer: {
    position: "absolute", 
    bottom: 65, 
    width: "100%", 
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontWeight: 400,
    fontSize: 21,
    marginTop: 15
 },
  subtitle: {
    fontSize: 15,
    fontWeight: 300,
    color: "#000",
    fontFamily: "Helvetica-Regular",
    marginBottom: 50
},
profileContainer: {
  width: 250, 
  height: 300, 
  borderRadius: 20, 
  alignSelf: "center", 
  alignItems: "center",
  justifyContent: "center",
},
profileImage: {
  width: "60%", 
  height: 250, 
},
  fixToText: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
 
  input: {
    height: 40,
    paddingHorizontal: 10,
    color: "#333",
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row", 
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 65,
    backgroundColor: "black",
    borderRadius: 50,
    paddingHorizontal: 20, 
    overflow: "hidden", 
    marginTop: 15

  },
  buttonText: {
    fontFamily: "Helvetica",
    color: "blue", 
    textAlign: "center",
    fontSize: 20,
  },
});
