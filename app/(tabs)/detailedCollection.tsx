import React, { useState, useEffect } from 'react';
import { Text, Pressable, StyleSheet, View } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { Plant } from '@/data/models';
import { getPlantsByCollectionId } from '@/services/DatabaseService';
import PlantCard from '@/components/PlantCard';
import { useFocusEffect } from '@react-navigation/native';

export default function DetailedCollectionScreen() {
  const [plants, setPlants] = useState<Plant[]>([]);

  useFocusEffect(
    React.useCallback(() => {
      let isActive = true;

      fetchPlants(isActive );

      return () => {
        isActive = false;
      };
    }, [])
  );

  const fetchPlants = async (isActive: boolean) => {
    const result = await getPlantsByCollectionId(2);
    if (!result) {
      console.log('No plants found');
      return;
    }

    if (isActive) {
      setPlants(result as Plant[]);
    }
  }

  const navigateToDetailPage = (id: number) => {
    console.log('Navigate to detail page with id: ', id);
  };

  return (
    <ParallaxScrollView headerText={'Placeholder'}>
      {plants.map((plant) => {
        return (
          <PlantCard
            key={plant.id}
            item={plant}
            onItemSelected={() => navigateToDetailPage(plant.id!)}
          />
        )
      })}
      <View style={styles.roundButtonContainer}>
        <Pressable
          style={styles.roundButton}
          onPress={() => console.log("Hier sollte ein Modal sein.")}
        >
          <Text style={styles.roundButtonText}>+</Text>
        </Pressable>
      </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  roundButtonContainer: {
    marginBottom: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  roundButton: {
    backgroundColor: '#66AE54',
    width: 50,
    height: 50,
    borderRadius: 50,
    display: 'flex',
  },
  roundButtonText: {
    top: '-10%',
    color: 'white',
    fontSize: 40,
    textAlign: 'center',
  },
});
