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
              headerTitle: (props) => <TopBar backEnabled={false} />,
              title: "Phone",
              headerBackVisible: false,
              headerShadowVisible: false,
            }}
          />
          <Stack.Screen
            name="register/username"
            options={{
              headerTitle: (props) => <TopBar backEnabled={true} />,
              title: "Create Username",
              headerTintColor: "black",
              headerShadowVisible: false,
            }}
          />
          <Stack.Screen
            name="register/pfp"
            options={{
              headerTitle: (props) => <TopBar backEnabled={true} />,
              title: "Upload Profile Picture",
              headerTintColor: "black",
              headerShadowVisible: false,
            }}
          />
          <Stack.Screen
            name="register/finish"
            options={{
              headerTitle: (props) => <TopBar backEnabled={true} />,
              title: "Finish",
              headerTintColor: "black",
              headerShadowVisible: false,
            }}
          />
          <Stack.Screen
            name="register/onboard"
            options={{
              title: "Features",
              headerTintColor: "black",
              headerShadowVisible: false,
              headerTitle: (props) => (
                <TopBar title="Browse our features" backEnabled={false} />
              ),
              headerBackVisible: false,
            }}
          />
          <Stack.Screen
            name="welcome/to"
            options={{
              title: "Welcome",
              headerShadowVisible: false,
              headerTitle: (props) => (
                <TopBar title="Welcome, Milo." backEnabled={false} />
              ),
              headerBackVisible: false,
            }}
          />
        </Stack>
      </Authenticated>
    </>
  );
}
