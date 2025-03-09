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

const { width, height } = Dimensions.get("window");

const features: { image: SFSymbols6_0; title: string; subtitle: string }[] = [
  {
    image: "square.stack.3d.up.fill",
    title: "Smart Organization",
    subtitle: "Keep everything in perfect order.",
  },
  {
    image: "bolt.shield.fill",
    title: "Enhanced Security",
    subtitle: "Your data is safe with us.",
  },
  {
    image: "sparkles.rectangle.stack.fill",
    title: "Beautiful Interface",
    subtitle: "Clean and intuitive design.",
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
                  <IconSymbol size={60} name={feature.image} color={"black"} />
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
