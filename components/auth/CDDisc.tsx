import React from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  ImageSourcePropType,
} from "react-native";
import Disc from "../common/Disc";

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
  return (
    <View style={[styles.container, { marginLeft: -marginLeft }]}>
      <Disc imageUri={imageUri} discSize={discSize} />
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
