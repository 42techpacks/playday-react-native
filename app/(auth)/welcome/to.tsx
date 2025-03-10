import { StyleSheet } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { Pressable } from "react-native";
import { Link } from "expo-router";
import CDDisc from "@/components/auth/CDDisc";
import GlassmorphismButtonView from "@/components/GlassmorphismButtonView";
import { useRouter } from "expo-router";
import { Image } from "react-native";
import { Dimensions } from "react-native";
import { MotiView } from "moti";

const vinylSpacing = 250;

export default function WelcomeToScreen() {
  const router = useRouter();
  const { width, height } = Dimensions.get("window");

  return (
    <ThemedView style={styles.welcomeToScreen}>
      {/* TOP SECTION: Header + Image Container */}
      <ThemedView style={styles.topSection}>
        {/* HEADER: Title + Subtitle */}
        <ThemedView style={styles.header}>
          {/* 'TITLE' */}
          <ThemedText type="title" style={styles.title}>
            Welcome to Playday!
          </ThemedText>
          {/* 'SUBTITLE' */}
          <ThemedText type="subtitle" style={styles.subtitle}>
            A sacred place for your curated vibes.
          </ThemedText>
        </ThemedView>
        {/* IMAGE CONTAINER: Mascot */}
        <ThemedView style={[styles.imageContainer]}>
          <MotiView
            from={{
              translateY: 0,
            }}
            animate={{
              translateY: 20,
            }}
            transition={{
              type: "timing",
              duration: 2000,
              loop: true,
              repeatReverse: true,
            }}
          >
            <Image
              source={require("@/assets/auth/playday-mascot_1.png")}
              style={{
                height: height * 0.003 * 100,
                width: height * 0.003 * 106,
              }}
            />
          </MotiView>
        </ThemedView>
      </ThemedView>

      {/* 'CONTINUE' Button */}
      <Pressable
        style={styles.buttonContainer}
        onPress={() => router.push("/(tabs)/(feed)")}
      >
        <GlassmorphismButtonView
          label="Enter"
          disabled={false}
          textSize={16}
          buttonColor="black"
          buttonHeight={50}
        />
      </Pressable>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  welcomeToScreen: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    padding: 30,
  },

  topSection: {
    flex: 3,
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

  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
  },

  imageContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
});
