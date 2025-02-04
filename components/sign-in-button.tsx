import { useAuthActions } from "@convex-dev/auth/react";
import { makeRedirectUri } from "expo-auth-session";
import { openAuthSessionAsync } from "expo-web-browser";
import { Button, Platform } from "react-native";
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';


const redirectTo = makeRedirectUri();


  interface WhiteButtonProps {
    title: string;
    handleSignIn: () => void;
    style?: ViewStyle;
    textStyle?: TextStyle;
  }
  const SignInButton: React.FC<WhiteButtonProps> = ({ title, handleSignIn, style, textStyle }) => {
  
  return (
      <TouchableOpacity style={[styles.button, style]} onPress={handleSignIn}>
        <Text style={[styles.text, textStyle]}>{title}</Text>
      </TouchableOpacity>
    );
  
  }


const styles = StyleSheet.create({
  button: {
    backgroundColor: 'white',
    borderRadius: 0,
    borderWidth: 1,
    borderColor: 'black',
    paddingVertical: 12,
    paddingHorizontal: 20, 
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 4 }, 
    shadowOpacity: 0.1,
    shadowRadius: 6, 
  },
  text: {
    fontSize: 16,
    fontWeight: '200', 
    color: '#333', 
  },
});

export default function SignIn() {
  const { signIn } = useAuthActions();
  const handleSignIn = async () => {
    const { redirect } = await signIn("github", { redirectTo });
    if (Platform.OS === "web") {
      return;
    }
    const result = await openAuthSessionAsync(redirect!.toString(), redirectTo);
    if (result.type === "success") {
      const { url } = result;
      const code = new URL(url).searchParams.get("code")!;
      await signIn("github", { code });
    }
  };
}
