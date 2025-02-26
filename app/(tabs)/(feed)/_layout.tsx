import { Stack } from "expo-router";
import TopBar from "@/components/auth/TopBar";

export default function FeedLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ headerTitle: (props) => <TopBar />, title: "Home" }}
      />
      <Stack.Screen
        name="create-modal"
        options={{ headerShown: false, presentation: "modal" }}
      />
    </Stack>
  );
}
