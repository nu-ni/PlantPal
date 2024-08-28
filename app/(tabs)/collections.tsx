import { AddPlantForm } from '@/components/addPlantForm';
import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

export default function CollectionScreen() {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Collections</Text>
      </View>
      {/* Button */}
      <AddPlantForm></AddPlantForm>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#557F60',
  },
  header: {
    
    padding: 30,
    backgroundColor: 'white',
    alignItems: 'center',
    borderBottomLeftRadius: 20, borderBottomRightRadius: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#646363',
    
  },
  content: {
    flex: 1,
    justifyContent: 'center', // Center the content vertically
    alignItems: 'center', // Center the content horizontally
  },
  contentText: {
    fontSize: 18,
    color: '#333',
  },
});
