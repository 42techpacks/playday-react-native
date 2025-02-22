import { Stack } from "expo-router";

export default function FeedLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Home" }} />
      <Stack.Screen
        name="create-modal"
        options={{ headerShown: false, presentation: "modal" }}
      />
    </Stack>
  );
}
