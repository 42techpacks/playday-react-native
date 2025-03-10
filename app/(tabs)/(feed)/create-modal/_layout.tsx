import { IconSymbol } from "@/components/ui/IconSymbol";
import { Stack } from "expo-router";
import { Pressable } from "react-native";
import { useRouter } from "expo-router";

export default function CreateLayout() {
  const router = useRouter();
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Create Post",
        }}
      />
      <Stack.Screen
        name="add-songs"
        options={{
          title: "Add Songs",
          headerTintColor: "#121212",
          headerBackVisible: false,
          headerLeft: () => (
            <Pressable onPress={() => router.back()}>
              <IconSymbol name="xmark" size={24} color="#121212" />
            </Pressable>
          ),
        }}
      />
    </Stack>
  );
}
