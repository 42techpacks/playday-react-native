import { Authenticated, AuthLoading, Unauthenticated } from "convex/react";
import { Stack, Redirect } from "expo-router";
import { Text } from "react-native";
import React from "react";

export default function AuthLayout() {
  return (
    <>
      <Authenticated>
        <Redirect href="/(tabs)/(feed)" />
      </Authenticated>
      <Stack>
        <Stack.Screen name="index" options={{ title: "Landing Page" }} />
        <Stack.Screen name="identify/phone" options={{ title: "Phone" }} />
        <Stack.Screen name="identify/otp" options={{ title: "OTP" }} />
      </Stack>
    </>
  );
}
