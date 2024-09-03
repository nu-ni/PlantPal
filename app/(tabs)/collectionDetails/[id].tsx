import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AddPlantForm } from '@/components/addPlantForm';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { Link, useLocalSearchParams } from 'expo-router';

export default function DetailedCollection() {
  const [inputValue, setInputValue] = useState('');
  const [isFormVisible, setIsFormVisible] = useState(true);
  const { id } = useLocalSearchParams();

  const handleButtonClick = () => {
    setIsFormVisible(false);
  };

  return (
    <ParallaxScrollView headerText={inputValue}>
      <View style={styles.titleContainer}>
        <Text>Detailed Collection Page</Text>
      </View>
      <Text>Details of user {id} </Text>
      {isFormVisible && <AddPlantForm onButtonClick={handleButtonClick} />}
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
