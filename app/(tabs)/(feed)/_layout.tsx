import { Stack } from "expo-router";
import TopBar from "@/components/auth/TopBar";

export default function FeedLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerTitle: (props) => <TopBar backEnabled={false} />,
          title: "Home",
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="create-modal"
        options={{
          headerShown: false,
          presentation: "modal",
        }}
      />
    </Stack>
  );
}
