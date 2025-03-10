import { StyleSheet, ScrollView, Dimensions, View } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { useRouter } from "expo-router";
import { Pressable } from "react-native";
import GlassmorphismButtonView from "@/components/GlassmorphismButtonView";
import GlassmorphismView from "@/components/GlassmorphismView";
import { MotiView } from "moti";
import { IconSymbol } from "@/components/ui/IconSymbol.ios";
import { SFSymbols6_0 } from "sf-symbols-typescript";
import { Image } from "moti";
import { ImageURISource } from "react-native";

const { width, height } = Dimensions.get("window");

const features: { image: ImageURISource; title: string; subtitle: string }[] = [
  {
    image: require(`@/assets/auth/feature-1.png`),
    title: "Share Your Favorites",
    subtitle: "Be the first to put everyone on.",
  },
  {
    image: require(`@/assets/auth/feature-2.png`),
    title: "Listen With Friends",
    subtitle: "Follow and invite others to Playday.",
  },
  {
    image: require(`@/assets/auth/feature-3.png`),
    title: "Visual + Audio Feed",
    subtitle: "Choose to view or listen to your feed.",
  },
];

export default function OnboardScreen() {
  const router = useRouter();

  return (
    <ThemedView style={styles.onboardScreen}>
      {/* CAROUSEL WRAPPER */}
      <ThemedView style={styles.carouselWrapper}>
        <ScrollView
          horizontal
          pagingEnabled
          snapToInterval={width} // Ensures each card snaps perfectly
          decelerationRate="fast"
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.carouselContainer}
        >
          {/* FEATURES: Mapped from list */}
          {features.map((feature, index) => (
            <ThemedView key={index} style={styles.cardWrapper}>
              <MotiView
                from={{ opacity: 0, translateX: 50 }}
                animate={{ opacity: 1, translateX: 0 }}
                transition={{ type: "spring", delay: index * 100 }}
                style={styles.featureCard}
              >
                <GlassmorphismView
                  containerStyle={styles.glassmorphismContainer}
                >
                  <Image
                    source={feature.image}
                    style={{
                      width: "100%",
                      resizeMode: "contain",
                    }}
                  />
                </GlassmorphismView>
                <ThemedView style={styles.featureText}>
                  <ThemedText style={styles.featureTitle}>
                    {feature.title}
                  </ThemedText>
                  <ThemedText style={styles.featureSubtitle}>
                    {feature.subtitle}
                  </ThemedText>
                </ThemedView>
              </MotiView>
            </ThemedView>
          ))}
        </ScrollView>
      </ThemedView>

      {/* 'CONTINUE' Button */}
      <Pressable
        style={styles.buttonContainer}
        onPress={() => router.push("/(auth)/welcome/to")}
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
  onboardScreen: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    paddingBottom: 30,
  },
  carouselWrapper: {
    flex: 1,
    alignItems: "center",
  },
  carouselContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  cardWrapper: {
    width, // Ensure full width for smooth scrolling
    justifyContent: "center",
    alignItems: "center",
  },
  featureCard: {
    width: width * 0.7, // Slight margin for better viewing experience
    height: height * 0.7, // Maintain consistent height
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
    elevation: 10, // Android support for shadows
  },
  glassmorphismContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    borderRadius: 25,
  },
  featureImage: {
    fontSize: 48,
    marginBottom: 20,
  },
  featureText: {
    flex: 0.25,
    backgroundColor: "transparent",
    justifyContent: "flex-end",
    alignItems: "center",
    zIndex: 10,
  },
  featureTitle: {
    fontSize: 24,
    fontWeight: 600,
    textAlign: "center",
  },
  featureSubtitle: {
    fontSize: 18,
    fontWeight: 300,
    textAlign: "center",
  },
  buttonContainer: {
    flexBasis: 50,
    flexDirection: "row",
    paddingHorizontal: 30,
  },
});
