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

interface CDDiscProps {
  imageUri: ImageSourcePropType;
  discSize?: number;
  marginLeft?: number;
}

export default function CDDisc({
  imageUri,
  discSize = DEFAULT_DISC_SIZE,
  marginLeft = 250,
}: CDDiscProps) {
  const centerHoleRadius = discSize * 0.05; // Center hole is 5% of the CD size

  const dynamicStyles = StyleSheet.create({
    cdOuter: {
      display: "flex",
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
      display: "flex",
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
    <View style={[styles.container, { marginLeft: -marginLeft }]}>
      {/* CD Outer Circle */}
      <View style={dynamicStyles.cdOuter}>
        {/* CD Cover Image */}
        <Image
          source={imageUri}
          style={dynamicStyles.image}
          resizeMode="cover"
        />

        {/* CD Center Hole */}
        <View style={dynamicStyles.hole} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
