import { StyleSheet, Pressable, View, Image } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import GlassmorphismButtonView from "@/components/GlassmorphismButtonView";
import GlassmorphismView from "@/components/GlassmorphismView";
import { useRouter } from "expo-router";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function ProfileImageScreen() {
  const router = useRouter();
  const user = useQuery(api.auth.getCurrentUser);

  return (
    <ThemedView style={styles.profilePhotoScreen}>
      {/* TOP SECTION: Header + Profile Card */}
      <ThemedView style={styles.topSection}>
        {/* HEADER: Title + Subtitle */}
        <ThemedView style={styles.header}>
          <ThemedText type="title" style={styles.title}>
            Add a profile photo.
          </ThemedText>
          <ThemedText type="subtitle" style={styles.subtitle}>
            You can update this at any time.
          </ThemedText>
        </ThemedView>
        {/* PROFILE CARD: Icon/Image + Username */}
        <GlassmorphismView containerStyle={styles.profileContainer}>
          {/* 'PFP' Image */}
          <Image
            source={require("@/assets/auth/profile.png")}
            resizeMode="contain"
            style={styles.profileImage}
          />
          {/* 'USERNAME' Text */}
          <ThemedText style={styles.username}>
            {user?.profile?.username ? `@${user.profile.username}` : ""}
          </ThemedText>
        </GlassmorphismView>
        container
      </ThemedView>

      {/* FOOTER: Upload Image + Next Buttons */}
      <View style={styles.footerContainer}>
        {/* 'IMAGE' Button */}
        <Pressable
          style={styles.imageButton}
          onPress={() => console.log("Upload Image Buton Clicked.")}
        >
          <GlassmorphismButtonView
            disabled={false}
            textSize={30}
            buttonColor="black"
            buttonHeight={50}
            sfSymbol="photo.badge.plus.fill"
          />
        </Pressable>

        {/* 'NEXT' Button */}
        <Pressable
          style={styles.buttonContainer}
          onPress={() => router.push("/(auth)/register/finish")}
        >
          <GlassmorphismButtonView
            label="Next"
            disabled={false}
            textSize={16}
            buttonColor="black"
            buttonHeight={50}
          />
        </Pressable>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  profilePhotoScreen: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    padding: 30,
  },

  topSection: {
    flex: 1.2,
    alignItems: "center",
    justifyContent: "space-between",
  },

  header: {
    flexBasis: 100,
    justifyContent: "center",
    alignItems: "center",
    color: "#000",
    fontFamily: "Helvetica-Regular",
  },

  title: {
    fontWeight: 400,
    fontSize: 21,
  },

  subtitle: {
    fontWeight: 300,
    fontSize: 15,
  },

  profileContainer: {
    flexBasis: 220,
    aspectRatio: 1 / 1,

    borderRadius: 20,
    backgroundColor: "transparent",
  },

  profileImage: {
    flex: 1.5,
    padding: 20,
  },

  username: {
    flex: 0.5,
    textAlign: "center",
    color: "grey",
    fontSize: 14,
    fontWeight: 300,
  },

  footerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",

    gap: 30,
    backgroundColor: "transparent",
  },

  buttonContainer: {
    flexBasis: 50,
    flexDirection: "row",
  },

  imageButton: {
    flexBasis: 60,
    flexDirection: "column",
  },
});
