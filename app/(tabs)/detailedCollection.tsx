import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AddPlantForm } from '@/components/addPlantForm';
import ParallaxScrollView from '@/components/ParallaxScrollView';

export default function DetailedCollection() {
  const [inputValue, setInputValue] = useState('');

  return (
    <ParallaxScrollView headerText={inputValue}>
      <View style={styles.titleContainer}>
        <Text>Detailed Collection Page</Text>
        <AddPlantForm />
      </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
