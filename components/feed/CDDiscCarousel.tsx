import { useState, useRef } from "react";
import { StyleSheet, ScrollView, View, Dimensions } from "react-native";
import { ThemedView } from "../ThemedView";
import CDDisc from "../auth/CDDisc";
import { MotiView, useDynamicAnimation } from "moti";

const { width, height } = Dimensions.get("window");

interface CDDiscCarouselProps {
  cards: any[];
  cdSize: number;
}

export default function CDDiscCarousel({ cards, cdSize }: CDDiscCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<ScrollView>(null);
  const reversedCards = [...cards].reverse();

  const handleScroll = (event: any) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / width);
    setActiveIndex(index);
  };

  if (cards.length === 0) {
    return (
      <ThemedView style={[styles.cdDiscCarousel, { flexBasis: cdSize * 1.2 }]}>
        <ThemedView style={styles.stackContainer}>
          <CDDisc imageUri={null} discSize={cdSize} />
        </ThemedView>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={[styles.cdDiscCarousel, { flexBasis: cdSize * 1.2 }]}>
      {/* 'CD DISC STACK & SWIPE' */}
      <ThemedView
        style={[styles.stackContainer, { marginRight: cards.length * 5 }]}
      >
        {reversedCards.map((imageUri, index) => {
          // Calculate the relative index from the end for animation
          const reverseIndex = cards.length - 1 - index;

          return (
            <MotiView
              key={index}
              from={{
                translateX: width,
                opacity: 0,
              }}
              animate={{
                translateX:
                  reverseIndex < activeIndex ? -width : reverseIndex * 5,
                opacity: reverseIndex <= activeIndex ? 1 : 0.8,
              }}
              transition={{
                type: "spring",
                damping: 12,
                stiffness: 100,
              }}
              style={[
                styles.cdDiscWrapper,
                { flexBasis: cdSize, top: reverseIndex * 0 },
              ]}
            >
              <CDDisc imageUri={imageUri} discSize={cdSize} />
            </MotiView>
          );
        })}
      </ThemedView>

      {/* SWIPEABLE SCROLLVIEW (Invisible for interaction) */}
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        contentContainerStyle={{ width: width * cards.length }}
      />

      {/* 'CAROUSEL INDICATOR' */}
      <ThemedView style={styles.carouselIndicator}>
        {cards.map((_, index) => (
          <ThemedView
            key={index}
            style={[
              styles.circle,
              {
                backgroundColor: index === activeIndex ? "#a1a1a1" : "#f1f1f1",
              },
            ]}
          />
        ))}
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  cdDiscCarousel: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  stackContainer: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  cdDiscWrapper: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  carouselIndicator: {
    flexBasis: 50,
    flexDirection: "row",

    justifyContent: "center",
    alignItems: "center",

    backgroundColor: "transparent",
    gap: 10,
    marginTop: 10,
  },
  circle: {
    width: 12,
    height: 12,
    borderRadius: 12,
    backgroundColor: "#f1f1f1",
    borderWidth: 1,
    borderColor: "#f3f3f3",
  },
});
