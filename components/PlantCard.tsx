import { Pressable, StyleSheet, Text, Image } from 'react-native';
import { View } from 'react-native';
import React from 'react';
import { Plant } from '../data/models';

type CardProps = {
  item: Plant;
  onItemSelected?: () => void
};

export default function PlantCard({ item, onItemSelected }: CardProps) {
  const imageSource = { uri: `data:image/jpeg;base64,${item.image}` };
  
  return (
    <Pressable onPress={onItemSelected}>
      <View style={styles.card}>
        <Image source={imageSource} style={styles.image}/>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.title}>{item.frequency + ' d'}</Text>
          <Text style={styles.title}>{item.waterAmount + ' ml'}</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  image: {
    height: '100%',
    width: '50%',
    alignSelf: 'center',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 5,
    flexDirection: 'row',
    overflow: 'visible',
    padding: 10,
    marginBottom: 10,
  },
  titleContainer: {
    flex: 9,
    justifyContent: 'center',
    marginVertical: 17,
  },
  title: {
    marginRight: 13,
    textAlign: 'right',
    fontSize: 20,
  },
});