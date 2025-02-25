import {
  Text,
  StyleSheet,
  Pressable,
  TextInput,
  Image,
  View,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";

interface GlassmorphismTextInputProps {
  onChangeText: (text: string) => void;
  value: string;
  placeholder: string;
  iconUrl?: NodeRequire;
  numLines?: number;
}

export default function GlassmorphismTextInput({
  onChangeText,
  value,
  placeholder,
  iconUrl,
  numLines,
}: GlassmorphismTextInputProps) {
  return (
    <LinearGradient
      style={[
        styles.phoneScreenInput,
        styles.glassmorphismCardFill,
        styles.glassmorphismCardBorder,
        numLines && { height: numLines * 24 + 36 }, // Add dynamic height based on number of lines
      ]}
      locations={[0, 1]}
      colors={["rgba(255, 255, 255, 0.5)", "rgba(255, 255, 255, 0.2)"]}
      useAngle={true}
      angle={146.7}
    >
      <View style={styles.inputContainer}>
        {iconUrl && <Image source={iconUrl} style={styles.icon} />}
        <TextInput
          style={[styles.input, numLines && { height: numLines * 24 }]}
          onChangeText={onChangeText}
          value={value.toString()}
          placeholder={placeholder}
          placeholderTextColor="#000"
          keyboardType="phone-pad"
          numberOfLines={numLines}
          multiline={numLines ? true : false}
          textAlignVertical="top"
        />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  class: {
    display: "flex",
    justifyContent: "center",
  },
  phoneScreenInput: {
    display: "flex",
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
    borderRadius: 30,
    borderWidth: 1,
    minHeight: 60,
  },

  glassmorphismCardFill: {
    borderRadius: 25,
    width: "100%",
    gap: 10,
    justifyContent: "flex-start",
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
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "center",
    width: "100%",
    padding: 15, // Changed from individual paddings to uniform padding
  },
  icon: {
    width: 18,
    height: 18,
    marginRight: 10,
    backgroundColor: "none",
  },
  input: {
    fontFamily: "Helvetica-Regular",
    fontSize: 16,
    flex: 1,
    paddingRight: 5, // Added right padding to prevent text cutoff
  },
});
