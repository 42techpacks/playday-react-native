import { Authenticated, AuthLoading, Unauthenticated } from "convex/react";
import { Stack, Redirect } from "expo-router";
import { Text } from "react-native";
import React from "react";
import TopBar from "@/components/auth/TopBar";

export default function AuthLayout() {
  return (
    <>
      <Authenticated>
        <Redirect href="/(tabs)/(feed)" />
      </Authenticated>
      <Stack>
        <Stack.Screen
          name="index"
          options={{ headerTitle: (props) => <TopBar />, title: "Phone" }}
        />
        <Stack.Screen name="identify/otp" options={{ title: "OTP" }} />
      </Stack>
    </>
  );
}
