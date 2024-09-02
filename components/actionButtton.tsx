import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";


interface ActionButtonProps {
  title: string;
  onPress: () => void;
  disabled: boolean;
}

export function ActionButton({ title, onPress, disabled }: ActionButtonProps) {
  return (
    <View>
      <Pressable
        style={[styles.button, disabled && styles.buttonDisabled]}
        onPress={onPress}
        disabled={disabled}
      >
        <Text style={[styles.buttonText, disabled && styles.buttonTextDisabled]}>
          {title}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonDisabled: {
    backgroundColor: "gray",
  },
  buttonText: {
    color: "black",
  },
  buttonTextDisabled: {
    color: "lightgray",
  },
});
