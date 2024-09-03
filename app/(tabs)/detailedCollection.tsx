import { AddPlantForm } from '@/components/AddPlantForm';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function DetailedColletionScreen() {
  return (

    <ParallaxScrollView
    headerText={'XY Collection'}>
    <ThemedView style={styles.titleContainer}>
      <ThemedText type="title">Explore</ThemedText>
    </ThemedView>
    <ThemedText>This app includes example code to help you get started.</ThemedText>
   <Text>Detailed Collection Page</Text>
      <AddPlantForm></AddPlantForm>
  </ParallaxScrollView>
    
  );
}

const styles = StyleSheet.create({
  
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});