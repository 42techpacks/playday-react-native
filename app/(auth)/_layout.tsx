import { Authenticated, AuthLoading, Unauthenticated } from "convex/react";
import { Stack } from "expo-router";
import { Text } from "react-native";
import React from "react";
import TopBar from "@/components/auth/TopBar";

export default function AuthLayout() {
  return (
    <>
      <AuthLoading>
        <Text>Loading...</Text>
      </AuthLoading>

      <Unauthenticated>
        <Stack>
          <Stack.Screen
            name="index"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="identify/otp"
            options={{
              headerShown: false,
            }}
          />
        </Stack>
      </Unauthenticated>

      <Authenticated>
        <Stack>
          <Stack.Screen
            name="register/music-auth"
            options={{
              headerTitle: (props) => <TopBar />,
              title: "Phone",
              headerBackVisible: false,
            }}
          />
          <Stack.Screen
            name="register/username"
            options={{
              headerTitle: (props) => <TopBar />,
              title: "Create Username",
            }}
          />
          <Stack.Screen
            name="register/pfp"
            options={{headerTitle: (props) => <TopBar />, title: "Upload Profile Picture" }}
          />
           <Stack.Screen
            name="register/finish"
            options={{headerTitle: (props) => <TopBar />, title: "Finish" }}
          />
        </Stack>
      </Authenticated>
    </>
  );
}
