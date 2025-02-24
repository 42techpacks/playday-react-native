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
}

export default function GlassmorphismTextInput({
  onChangeText,
  value,
  placeholder,
  iconUrl,
}: GlassmorphismTextInputProps) {
  console.log("icon", iconUrl);
  return (
    <LinearGradient
      style={[
        styles.phoneScreenInput,
        styles.glassmorphismCardFill,
        styles.glassmorphismCardBorder,
      ]}
      locations={[0, 1]}
      colors={["rgba(255, 255, 255, 0.5)", "rgba(255, 255, 255, 0.2)"]}
      useAngle={true}
      angle={146.7}
    >
      <View style={styles.inputContainer}>
        {iconUrl && <Image source={iconUrl} style={styles.icon} />}
        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          value={value.toString()}
          placeholder={placeholder}
          placeholderTextColor="#000"
          keyboardType="phone-pad"
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
    justifyContent: "center",
    alignItems: "center",

    borderRadius: 30,
    borderWidth: 1,
    height: 60,
    paddingLeft: 10,
    paddingRight: 10,
  },

  glassmorphismCardFill: {
    borderRadius: 25,
    width: "100%",
    gap: 10,
    justifyContent: "center",

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
    alignItems: "center",
    justifyContent: "center",
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
  },
});
