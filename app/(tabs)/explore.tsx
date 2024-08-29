import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Image, Platform, Button, TouchableOpacity } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Plant, PlantCollection, createData, getAll } from '@/services/DatabaseService';
import { useState, useEffect } from 'react';

export default function TabTwoScreen() {
  const [collection, setCollection] = useState<Plant[] | PlantCollection[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const collectionData = await getAll('plantCollection');
      setCollection(collectionData);
    }

    fetchData();
  }, []);

  const handleButtonPress = async () => {
    let tableName = "plantCollection";
    let data: PlantCollection = {
      title: "yourTitle",
      lastActive: new Date(),
    };

    await createData(tableName, data);
  }

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={<Ionicons size={310} name="code-slash" style={styles.headerImage} />}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">EEE!</ThemedText>
        {/* <ThemedText type="title">{ collection[0].title }!</ThemedText> */}
      </ThemedView>
      <TouchableOpacity onPress={handleButtonPress} >
        <Button title='create'></Button>
      </TouchableOpacity>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
