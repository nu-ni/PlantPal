import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";

export function ActionButton() {
  return (
    <View>
      <Pressable style={styles.button} onPress={() => console.log("Button Pressed")}>
        <Text style={styles.buttonText}>Submit</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    alignItems: "center", // Centers the text horizontally
  },
  buttonText: {
    color: "black", // Customize text color
  },
});
