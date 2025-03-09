import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";
import { Authenticated, AuthLoading, Unauthenticated } from "convex/react";
import { Redirect } from "expo-router";
import { Text } from "react-native";

import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

import TopBar from "@/components/auth/TopBar";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <>
      {/*//TODO(kenny): Use a splash screen here instead*/}
      <AuthLoading>
        <Text>Loading...</Text>
      </AuthLoading>

      <Unauthenticated>
        {/* Redirect unauthenticated users to auth flow */}
        <Redirect href="/(auth)" />
      </Unauthenticated>

      <Authenticated>
        <Tabs
          screenOptions={{
            tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
            headerShown: false,
            tabBarButton: HapticTab,
            tabBarBackground: TabBarBackground,
            tabBarStyle: Platform.select({
              ios: {
                // Use a transparent background on iOS to show the blur effect
                position: "absolute",
              },
              default: {},
            }),
            tabBarShowLabel: false,
          }}
        >
          <Tabs.Screen
            name="(feed)"
            options={{
              title: "Home",
              tabBarIcon: ({ color }) => (
                <IconSymbol size={30} name="house.fill" color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="explore"
            options={{
              title: "Listen",
              headerShadowVisible: false,
              tabBarIcon: ({ color }) => (
                <IconSymbol size={24} name="play.fill" color={color} />
              ),
            }}
          />
          <Tabs.Screen
            name="(profile)"
            options={{
              title: "Profile",
              tabBarIcon: ({ color }) => (
                <IconSymbol
                  size={28}
                  name="person.crop.circle.fill"
                  color={color}
                />
              ),
            }}
          />
        </Tabs>
      </Authenticated>
      {/*If none of the above is mounted convex has fucked up */}
    </>
  );
}
