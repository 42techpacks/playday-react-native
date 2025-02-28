import { Stack } from "expo-router";

export default function CreateLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Curate the Day",
        }}
      />
      <Stack.Screen
        name="add-songs"
        options={{
          title: "Search Songs",
        }}
      />
    </Stack>
  );
}
