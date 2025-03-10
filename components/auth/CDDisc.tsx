import React from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  ImageSourcePropType,
  ViewStyle,
} from "react-native";
import Disc from "../common/Disc";

const { width } = Dimensions.get("window");
const DEFAULT_DISC_SIZE = width * 0.6; // Default to 60% of screen width

interface CDDiscProps {
  imageUri: any;
  discSize?: number;
  marginLeft?: number;
  containerStyle?: ViewStyle;
}
export default function CDDisc({
  imageUri,
  containerStyle,
  discSize = DEFAULT_DISC_SIZE,
  marginLeft = 250,
}: CDDiscProps) {
  return (
    <View style={[containerStyle, styles.container]}>
      <Disc imageUri={imageUri} discSize={discSize} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "transparent",
  },
});
