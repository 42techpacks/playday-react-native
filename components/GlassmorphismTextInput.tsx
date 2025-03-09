import {
  Text,
  StyleSheet,
  Pressable,
  TextInput,
  Image,
  View,
  ViewStyle,
  KeyboardTypeOptions,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { ThemedView } from "./ThemedView";

interface GlassmorphismTextInputProps {
  onChangeText: (text: string) => void;
  value: string;
  placeholder: string;
  iconUrl?: NodeRequire;
  numLines?: number;
  containerStyle?: ViewStyle;
  keyboardType: KeyboardTypeOptions;
}

export default function GlassmorphismTextInput({
  onChangeText,
  value,
  placeholder,
  iconUrl,
  numLines,
  keyboardType,
  containerStyle,
}: GlassmorphismTextInputProps) {
  return (
    <LinearGradient
      style={[
        containerStyle,
        styles.glassmorphismContainer,
        styles.glassmorphismCardFill,
        styles.glassmorphismCardBorder,
      ]}
      locations={[0, 1]}
      colors={["rgba(255, 255, 255, 0.5)", "rgba(255, 255, 255, 0.2)"]}
      useAngle={true}
      angle={146.7}
    >
      <ThemedView style={styles.inputContainer}>
        {iconUrl && <Image source={iconUrl} style={styles.icon} />}
        <TextInput
          style={[styles.input]}
          onChangeText={onChangeText}
          value={value.toString()}
          placeholder={placeholder}
          placeholderTextColor="#000"
          keyboardType={keyboardType}
          numberOfLines={numLines}
          multiline={numLines ? true : false}
          textAlignVertical="top"
        />
      </ThemedView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  glassmorphismContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  glassmorphismCardFill: {
    borderRadius: 50,
    shadowColor: "rgba(0, 0, 0, 0.3)",
    shadowOffset: {
      width: 0,
      height: 40,
    },
    shadowRadius: 40,
    shadowOpacity: 1,
  },

  glassmorphismCardBorder: {
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.6)",
    borderStyle: "solid",
  },
  inputContainer: {
    flex: 1,
    flexDirection: "row",
    marginHorizontal: 20,
    gap: 15,
    backgroundColor: "transparent",
  },
  icon: {
    width: 18,
    height: 18,
    backgroundColor: "none",
  },
  input: {
    fontFamily: "Helvetica-Regular",
    fontSize: 16,
    flex: 1,
  },
});
