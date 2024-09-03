import { StyleSheet, Button } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useState, useEffect } from 'react';
import { getAll, insertData, updateData, deleteData, Tables } from '@/services/DatabaseService';
import React from 'react';
import { PlantCollection, Plant } from '@/data/models';

export default function TabTwoScreen() {
  const [collection, setCollection] = useState<PlantCollection[]>([]);
  const [plants, setPlants] = useState<Plant[]>([]);

  const fetchCollections = async () => {
      const collectionData = await getAll(Tables.PLANT_COLLECTION);
      setCollection(collectionData as PlantCollection[]);
  }

  const fetchPlants = async () => {
      const fetchedPlants = await getAll(Tables.PLANT);
      setPlants(fetchedPlants  as Plant[]);
  }

  useEffect(() => {
    const fetchData = async () => {
      await fetchCollections ();
      await fetchPlants();
      console.log('colllection', collection);
      console.log('plant', plants);
    }

    fetchData();
  }, []);

  const addPlantCollection = async () => {
    console.log('collection button pressed');
    let tableName = "PlantCollection";
    let data: PlantCollection = {
      title: "yourTitle",
      lastActive: new Date(),
    };

    await insertData(tableName, data);
  }

  const addPlant = async () => {
    console.log('add plant button pressed');
    let tableName = "Plant";
    let data: Plant = {
      title: 'newplant',
      frequency: 10,
      waterAmount: 100,
      collectionId: 2,
      image: new Blob(),
    };

    await insertData(tableName, data);
  }

  const deletePlant = async () => {
    console.log('delete plant button pressed');
    let tableName = "Plant";

    await deleteData(tableName, 1);
  }

  const updatePlant = async () => {
    console.log('update plant button pressed');
    let tableName = "Plant";
    let data: Plant = {
      title: 'updated plant',
      frequency: 10,
      waterAmount: 100,
      collectionId: 2,
      image: new Blob(),
    };

    await updateData(tableName, 1, data);
  }

  return (
    <ParallaxScrollView
      headerText={'Db-Test'}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">AAA!</ThemedText>
        {/* <ThemedText type="title">{collection[0].title}!</ThemedText> */}
      </ThemedView>
      <Button title='create collection' onPress={addPlantCollection}></Button>
      <Button title='create plant' onPress={addPlant}></Button>
      <Button title='update plant' onPress={updatePlant}></Button>
      <Button title='delete plant' onPress={deletePlant}></Button>
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
