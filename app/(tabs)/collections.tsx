import { AddPlantForm } from "@/components/addPlantForm";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import React from "react";
import { View, StyleSheet, Button, Text } from "react-native";

export default function CollectionScreen() {
  return (
    <ParallaxScrollView headerText={"Your Collections"}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Explore</ThemedText>
      </ThemedView>
      <ThemedText>
        This app includes example code to help you get started.
      </ThemedText>
      <Text>Detailed Collection Page</Text>
      
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
