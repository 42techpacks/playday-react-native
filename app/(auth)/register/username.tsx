import {
  Pressable,
  StyleSheet,
  Image,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  SafeAreaView,
} from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { useRouter } from "expo-router";
import { useState } from "react";
import { api } from "@/convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import GlassmorphismTextInput from "@/components/GlassmorphismTextInput";
import GlassmorphismView from "@/components/GlassmorphismView";
import GlassmorphismButtonView from "@/components/GlassmorphismButtonView";
import { KeyboardAvoidingView } from "react-native";

export default function UsernameScreen() {
  const [username, onChangeUsername] = useState("");
  const regStatus = useQuery(api.auth.checkRegistrationStatus);
  const addUsername = useMutation(api.auth.addUsername);
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
        keyboardVerticalOffset={100}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ThemedView style={styles.usernameScreen}>
            {/* TOP SECTION: Header + Profile Card */}
            <ThemedView style={styles.topSection}>
              {/* HEADER: Title + Subttitle */}
              <ThemedView style={styles.header}>
                <ThemedText type="title" style={styles.title}>
                  Choose a username.
                </ThemedText>
                <ThemedText type="subtitle" style={styles.subtitle}>
                  You can update this at any time.
                </ThemedText>
              </ThemedView>

              {/* PROFILE CARD: Icon */}
              <GlassmorphismView containerStyle={styles.profileContainer}>
                <Image
                  source={require("@/assets/auth/profile.png")}
                  resizeMode="contain"
                  style={styles.profileImage}
                />
              </GlassmorphismView>
            </ThemedView>

            {/* FOOTER: Input + Button */}
            <ThemedView style={styles.footerContainer}>
              {/* 'USERNAME' Input */}
              <GlassmorphismTextInput
                value={username}
                onChangeText={onChangeUsername}
                placeholder="Username"
                keyboardType="default"
                containerStyle={styles.inputContainer}
              />

              {/* 'NEXT' Button */}
              <Pressable
                style={styles.buttonContainer}
                onPress={async () => {
                  await addUsername({ username });
                  router.push("/register/pfp");
                }}
              >
                <GlassmorphismButtonView
                  label="Next"
                  disabled={false}
                  textSize={16}
                  buttonColor="black"
                  buttonHeight={50}
                />
              </Pressable>
            </ThemedView>
          </ThemedView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  usernameScreen: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    padding: 30,
  },
  topSection: {
    flex: 1.2,
    alignItems: "center",
    justifyContent: "space-between",
  },
  header: {
    flexBasis: 100,
    justifyContent: "center",
    alignItems: "center",
    color: "#000",
    fontFamily: "Helvetica-Regular",
  },
  title: {
    fontWeight: 400,
    fontSize: 21,
  },
  subtitle: {
    fontWeight: 300,
    fontSize: 15,
  },
  profileContainer: {
    flexBasis: 220,
    aspectRatio: 1 / 1,

    borderRadius: 20,
    backgroundColor: "transparent",
  },
  profileImage: {
    flex: 1,
    padding: 20,
  },
  footerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",

    gap: 10,
    backgroundColor: "transparent",
  },
  inputContainer: {
    flexBasis: 60,
    flexDirection: "row",
    height: "auto",

    backgroundColor: "transparent",
  },
  buttonContainer: {
    flexDirection: "row",
  },
});
