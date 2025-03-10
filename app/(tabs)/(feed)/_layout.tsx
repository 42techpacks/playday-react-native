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
      <Stack.Screen
        name="search"
        options={{
          headerTitle: (props) => <TopBar backEnabled={true} title="Search" />,
          headerShadowVisible: false,
          headerTintColor: "#121212",
        }}
      />
    </Stack>
  );
}
