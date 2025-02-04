import { useAuthActions } from "@convex-dev/auth/react";
import { Button } from "react-native";

export default function SignOutButton() {
  const { signOut } = useAuthActions();

  const handleSignOut = async () => {
    await signOut();
  };

  return <Button onPress={handleSignOut} title="Sign out" />;
}