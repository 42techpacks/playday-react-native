import { StyleSheet, TextInput } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol.ios";

export default function CommentInput() {
  return (
    <ThemedView style={styles.commentInputContainer}>
      <IconSymbol name="music.note" size={15} color="black" />
      <TextInput
        placeholder={"Add a comment..."}
        placeholderTextColor={"black"}
        style={styles.commentInput}
      ></TextInput>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  commentInputContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",

    width: "90%",
    borderRadius: 25,

    padding: 10,
    gap: 5,
    backgroundColor: "white",
  },

  commentInput: {
    width: "95%",
  },
});
