import { ConvexAuthProvider } from "@convex-dev/auth/react";
import { ConvexReactClient } from "convex/react";
import { Slot } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useReactQueryDevTools } from "@dev-plugins/react-query";

const queryClient = new QueryClient();

const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL!, {
  unsavedChangesWarning: false,
});

const secureStore = {
  getItem: SecureStore.getItemAsync,
  setItem: SecureStore.setItemAsync,
  removeItem: SecureStore.deleteItemAsync,
};

//TODO(kenny): Add navigation protection... figure out wtf that is
export default function RootLayout() {
  useReactQueryDevTools(queryClient);
  return (
    <QueryClientProvider client={queryClient}>
      <ConvexAuthProvider
        client={convex}
        storage={
          Platform.OS === "android" || Platform.OS === "ios"
            ? secureStore
            : undefined
        }
      >
        {/*It is imperative that <Slot/> is mounted before any navigation events
          are triggered. Otherwise, a runtime error will be thrown */}
        <Slot />
      </ConvexAuthProvider>
    </QueryClientProvider>
  );
}
