import { View, Text } from "react-native";
import SignInButton from "../components/sign-in-button";
import { Authenticated } from "convex/react";
import { Redirect } from "expo-router";
import React from "react";

export default function AuthScreen() {
  return (
    <>
      <Authenticated>
        <Redirect href="/" />
      </Authenticated>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ fontSize: 24, marginBottom: 20 }}>Welcome</Text>
        <SignInButton />
      </View>
    </>
  );
}
