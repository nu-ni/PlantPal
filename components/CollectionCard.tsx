import { Pressable, StyleSheet, Text } from 'react-native';
import { View } from 'react-native';
import React from 'react';
import { PlantCollection } from '../data/models';

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
    overflow: 'visible',
    padding: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.45,
    shadowRadius: 4.84,
    elevation: 5,
  },
  circleContainer: {
    marginRight: 10,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    width: 13,
    height: 13,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'grey',
  },
  circleSelected: {
    backgroundColor: '#557F60',
  },
  divider: {
    width: 1,
    height: '100%',
    backgroundColor: '#b0b0b0',
  },
  titleContainer: {
    flex: 9,
    justifyContent: 'center',
    marginVertical: 17,
  },
  title: {
    marginRight: 13,
    textAlign: 'right',
  },
});
