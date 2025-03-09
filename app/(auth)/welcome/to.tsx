import { StyleSheet } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { Pressable } from "react-native";
import { Link } from "expo-router";
import CDDisc from "@/components/auth/CDDisc";
import GlassmorphismButtonView from "@/components/GlassmorphismButtonView";
import { useRouter } from "expo-router";

const cards = [
  require("@/assets/auth/Steve-Lacy-Gemini-Rights.png"),
  require("@/assets/auth/tyler_the_creator.png"),
  require("@/assets/auth/travis_scott.png"),
  require("@/assets/auth/dj_assault.png"),
  require("@/assets/auth/migos.png"),
];
const vinylSpacing = 250;
export default function WelcomeToScreen() {
  const router = useRouter();

  return (
    <ThemedView style={styles.welcomeToScreen}>
      {/* TOP SECTION: Header + Vinyl Container */}
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
        {/* VINYL CONTAINER: Vinyls */}
        <ThemedView style={[styles.vinylsContainer]}>
          {cards.map((imageUri, index) => (
            <CDDisc
              key={index}
              imageUri={imageUri}
              containerStyle={{
                position: "absolute",
                backgroundColor: "none",
                transform: [
                  {
                    translateX: (index - (cards.length - 1) / 2) * -10,
                  },
                ],
              }}
            />
          ))}
        </ThemedView>
      </ThemedView>

      {/* 'CONTINUE' Button */}
      <Pressable
        style={styles.buttonContainer}
        onPress={() => router.push("/(tabs)/(feed)")}
      >
        <GlassmorphismButtonView
          label="Continue"
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

  vinylsContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
});
