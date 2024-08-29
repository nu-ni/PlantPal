import { AddPlantForm } from '@/components/addPlantForm';
import React from 'react';
import { View, StyleSheet, Button } from 'react-native';

export default function CollectionScreen() {
  return (
    <View style={styles.container}>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentText: {
    fontSize: 18,
    color: '#333',
  },
});