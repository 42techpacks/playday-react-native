import { Authenticated, AuthLoading, Unauthenticated } from "convex/react";
import { Stack, Redirect } from "expo-router";
import { Text } from "react-native";
import React from "react";

export default function AppLayout() {
  return (
    <>
      <AuthLoading>
        <Text>Loading...</Text>
      </AuthLoading>

      <Unauthenticated>
            {/* For now, change the below value to the path to the desired screen in order to view it*/}
        <Redirect href="/new-user-auth" />
      </Unauthenticated>

      <Authenticated>
        <Stack>
          <Stack.Screen name="index" />
        </Stack>
      </Authenticated>
    </>
  );
}
