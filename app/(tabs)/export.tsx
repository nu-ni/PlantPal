import { Collapsible } from '@/components/Collapsible';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ExportScreen() {
  return (
    <ParallaxScrollView
      headerText={'Export'}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Explore</ThemedText>
      </ThemedView>
      <ThemedText>This app includes example code to help you get started.</ThemedText>
     
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
