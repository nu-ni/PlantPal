import { Image, StyleSheet, Pressable, Text, ScrollView, View } from 'react-native';
import React, { useEffect } from 'react';
import { HelloWave } from '@/components/HelloWave';
import * as FileSystem from 'expo-file-system';
import * as DocumentPicker from 'expo-document-picker';
import { insertData, insertMany, getIdOfLastInsert, Tables, initializeDatabase } from '@/services/DatabaseService';
import { Plant } from '@/data/models';
import { router } from 'expo-router';

export default function Index() {

  useEffect(() => {
    const initialize = async () => {
      await initializeDatabase();
    }
    initialize();
  }, []);

  const handleImport = async () => {
    const inputFiles = await DocumentPicker.getDocumentAsync({
      type: 'application/json',
      copyToCacheDirectory: true,
    });

    console.log('inputFiles', inputFiles)

    if (inputFiles.canceled) {
      console.log("No file selected");
      return;
    }

    for (let inputFile of inputFiles.assets) {
      if (inputFile.uri) {
        let uri = inputFile.uri;

        let fileContent = await FileSystem.readAsStringAsync(uri, {
          encoding: FileSystem.EncodingType.UTF8,
        });

        let data = JSON.parse(fileContent);

        if (!data) {
          console.log("No data imported");
          return;
        }

        let { collection, plants } = data;
        delete collection.id;

        await insertData(Tables.PLANT_COLLECTION, collection);

        let newId = await getIdOfLastInsert(collection);
        let newPlants = plants.map((plant: Plant[]) => ({ ...plant, collectionId: newId }));
        await insertMany(Tables.PLANT, newPlants);

        console.log("Import successful");
        alert("Import successful");
      }
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {/* Header mit Bild */}
        <View style={styles.roundedWrapper}>
          <Image
            source={require('@/assets/images/green-plant-background.jpeg')}
            style={styles.plantLogo}
          />
        </View>

        {/* Erster grosser, runder Button */}
        <View style={styles.roundButtonContainer}>
          <Pressable style={styles.roundButton}
            onPress={() =>
              router.push({
                pathname: "/collections",
              })
            }>
            <Text style={styles.roundButtonText}>+</Text>
          </Pressable>
        </View>

        {/* Willkommenstext und HelloWave-Komponente */}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Welcome!!!!</Text>
          <HelloWave />
        </View>

        {/* Beschreibungstext */}
        <View style={styles.stepContainer}>
          <Text style={styles.descriptionText}>
            Erstelle schnell Pflanzenprofile, erstelle individuelle Giesspläne und teile sie mit Freunden oder Nachbarn. So bleiben deine grünen Mitbewohner immer perfekt versorgt – ganz ohne Stress!
          </Text>
          <Text style={styles.subtitle}>Mach Pflanzenpflege smart und einfach – mit PlantPals!</Text>
        </View>

        {/* Import Button */}
        <View style={styles.centeredButtonContainer}>
          <Pressable
            style={styles.Button}
            onPress={handleImport}
          >
            <Text style={styles.buttonText}>Import</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollView: {
    alignItems: 'center', 
    paddingTop: 100, 
    paddingBottom: 50,
  },
  roundedWrapper: {
    width: 500,
    height: 500,
    borderRadius: 250,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: -200,
    zIndex: -1,
  },
  plantLogo: {
    height: '150%',
    width: '150%',
    resizeMode: 'contain',
  },
  roundButtonContainer: {
    marginTop: 170,
    marginBottom: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  roundButton: {
    backgroundColor: '#557F60',
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  roundButtonText: {
    color: 'white',
    fontSize: 50,
    textAlign: 'center',
    marginBottom: 5,
  },
  Button: {
    backgroundColor: '#557F60',
    padding: 25,
    borderRadius: 60,
    width: 200,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginRight: 10,
  },
  stepContainer: {
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  descriptionText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    marginTop: 15,
    fontWeight: 'normal',
    textAlign: 'center',
  },
  centeredButtonContainer: {
    marginTop: 30,
    marginBottom: 50,
    alignItems: 'center',
  },
});
