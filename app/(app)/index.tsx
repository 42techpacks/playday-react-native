import SignOutButton from "../../components/auth-inputs/sign-out-button";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
// The actual index since folder names with () are not added to url paths
export default function HomeScreen() {
  return (
    <ThemedView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ThemedText> Hello World! </ThemedText>
      <SignOutButton />
    </ThemedView>
  );
}
