import React from "react";
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  ImageSourcePropType,
} from "react-native";

const { width } = Dimensions.get("window");
const DEFAULT_DISC_SIZE = width * 0.6; // Default to 60% of screen width

interface DiscProps {
  imageUri: ImageSourcePropType;
  discSize?: number;
}

export default function Disc({
  imageUri,
  discSize = DEFAULT_DISC_SIZE,
}: DiscProps) {
  const centerHoleRadius = discSize * 0.05; // Center hole is 5% of the CD size

  const dynamicStyles = StyleSheet.create({
    cdOuter: {
      justifyContent: "center",
      alignItems: "center",

      width: discSize,
      height: discSize,

      borderRadius: discSize / 2,
      overflow: "hidden",
      borderWidth: 2,
      borderColor: "#aaa",
      position: "relative",
    },
    image: {
      justifyContent: "center",
      alignItems: "center",

      width: discSize,
      height: discSize,
      borderRadius: discSize / 2,
    },
    hole: {
      position: "absolute",
      width: centerHoleRadius * 2,
      height: centerHoleRadius * 2,
      backgroundColor: "#fff",
      borderRadius: centerHoleRadius,
      borderWidth: 1.5,
      borderColor: "#888",
    },
  });

  return (
    <View style={dynamicStyles.cdOuter}>
      <Image source={imageUri} style={dynamicStyles.image} resizeMode="cover" />
      <View style={dynamicStyles.hole} />
    </View>
  );
}
