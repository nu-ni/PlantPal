import CollectionCard from '@/components/CollectionCard';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { PlantCollection } from '@/services/Database';
import { getAll } from '@/services/DatabaseService';
import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import InfoButton from '../../components/InfoButton';

export default function ExportScreen() {
  const [collections, setCollections] = useState<PlantCollection[]>([]);
  const [selectedId, setSelectedId] = useState<number | undefined>(1);

  useEffect(() => {
    (async () => {
      const result = await getAll('PlantCollection');
      console.log(result)
      setCollections(result as PlantCollection[]);
    })();
  }, []);

  return (
    <ParallaxScrollView headerText={'Export'}>
    <InfoButton onClick={() => console.log('InfoButton clicked')} />
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
      <View style={styles.roundButtonContainer}>
        <Pressable
          style={styles.roundButton}
          onPress={() => console.log("Großer runder Button gedrückt")}
        >
          <Text style={styles.roundButtonText}>+</Text>
        </Pressable>
      </View>
    </ParallaxScrollView>
  );
}


const styles = StyleSheet.create({
  titleContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
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
