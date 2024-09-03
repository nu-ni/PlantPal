import CollectionCard from '@/components/CollectionCard';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { getAll, getPlantsByCollectionId, Tables } from '@/services/DatabaseService';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { PlantCollection } from '@/data/models';
import { Errors } from '@/Errors/error-messages';
import { Pressable } from 'react-native';

export default function ExportScreen() {
  const [collections, setCollections] = useState<PlantCollection[]>([]);
  const [selectedId, setSelectedId] = useState<number | undefined>(1);

  useEffect(() => {
    (async () => {
      const result = await getAll(Tables.PLANT_COLLECTION);
      setCollections(result as PlantCollection[]);
    })();
  }, []);

  const generateJsonFile = async () => {
    if (!selectedId) {
      console.log('No collection selected');
      return;
    }

    const selectedCollection = collections.find(c => c.id === selectedId);
    const relatedPlants = await getPlantsByCollectionId(Tables.PLANT, selectedId);

    const dataToExport = {
      collection: selectedCollection,
      plants: relatedPlants,
    };

    return JSON.stringify(dataToExport, null, 2);
  };

  const handleSaveToFile = async () => {
    try {
      const jsonString = await generateJsonFile();
      if (!jsonString) return;

      const fileUri = FileSystem.documentDirectory + `collection_${collections[selectedId!].title}.json`;

      await FileSystem.writeAsStringAsync(fileUri, jsonString, { encoding: FileSystem.EncodingType.UTF8 });

      return fileUri
    } catch (error) {
      console.log(Errors.shareFileError, error);
    }
  };

  const handleExportAndShare = async () => {
    try {
      const fileUri = await handleSaveToFile();

      if (!fileUri) return;

      await Sharing.shareAsync(fileUri);
    } catch (error) {
      console.log(Errors.saveFileError, error);
    }
  };

  return (
    <ParallaxScrollView headerText={'Export'}>
      {collections.map((collection) => {
        return (
          <CollectionCard
            key={collection.id}
            item={collection}
            isSelected={collection.id === selectedId}
            onItemSelected={() => setSelectedId(collection.id)}
          />
        )
      })}
      <View style={styles.ButtonContainer}>
          <Pressable
            style={styles.Button}
            onPress={handleExportAndShare}>
            <Text style={styles.buttonText}>Share</Text>
          </Pressable>
        </View>
    </ParallaxScrollView>
  );
}


const styles = StyleSheet.create({
  ButtonContainer: {
    marginBottom: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  Button: {
  backgroundColor: "white",
  width: "80%",
  alignItems: 'center',
  justifyContent: 'center',
  padding: 20,
  borderRadius: 25,
  },
  buttonText: {
  color: "black",
  fontSize: 20
  }
});

