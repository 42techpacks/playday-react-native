import { Authenticated, AuthLoading, Unauthenticated } from "convex/react";
import { Stack } from "expo-router";
import { Text } from "react-native";
import React, { useEffect } from "react";
import TopBar from "@/components/auth/TopBar";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function AuthLayout() {
  return (
    <>
      <AuthLoading>
        <Text>Loading...</Text>
      </AuthLoading>

      <Unauthenticated>
        <Stack>
          <Stack.Screen name="identify/otp" options={{ headerTitle: (props) => <TopBar /> }} />
        </Stack>
      </Unauthenticated>

      <Authenticated>
        <Stack>
          <Stack.Screen
            name="register/music-auth"
            options={{ headerTitle: (props) => <TopBar />, title: "Phone" , headerBackVisible: false }}
          />
          <Stack.Screen
            name="register/username"
            options={{headerTitle: (props) => <TopBar />, title: "Create Username" }}
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