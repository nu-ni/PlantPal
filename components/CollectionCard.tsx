import { Pressable, StyleSheet, Text } from 'react-native';
import { View } from 'react-native';
import React from 'react';
import { PlantCollection } from '../services/Database';

type CardProps = {
  item: PlantCollection;
  isSelected: boolean;
  onItemSelected?: () => void
};

export default function CollectionCard({ item, isSelected, onItemSelected }: CardProps) {
  return (
    <Pressable onPress={onItemSelected}>
      <View style={styles.card}>
        <View style={styles.circleContainer}>
          <View style={[styles.circle, isSelected && styles.circleSelected]}></View>
        </View>
        <View style={styles.divider} />
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{item.title}</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 5,
    flexDirection: 'row',
    padding: 10,
    marginBottom: 10,
  },
  circleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'grey',
  },
  circleSelected: {
    backgroundColor: 'green',
  },
  divider: {
    width: 1,
    height: '100%',
    backgroundColor: 'grey',
  },
  titleContainer: {
    flex: 9,
    justifyContent: 'center',
  },
  title: {
    marginLeft: 10,
  },
});
