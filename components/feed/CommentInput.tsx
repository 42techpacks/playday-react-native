import { useState } from "react";
import { Text, StyleSheet, Pressable, TextInput } from "react-native";
import { ThemedView } from "../ThemedView";
import { ThemedText } from "../ThemedText";
import { IconSymbol } from "../ui/IconSymbol.ios";

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
