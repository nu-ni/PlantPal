import ParallaxScrollView from '@/components/ParallaxScrollView';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RadioButton } from 'react-native-paper';

export default function ExportScreen() {
  const [selectedCards, setSelectedCards] = useState([]);

  const handleCardSelection = (card) => {
    if (selectedCards.includes(card)) {
      setSelectedCards(selectedCards.filter((c) => c !== card));
    } else {
      setSelectedCards([...selectedCards, card]);
    }
  };

  return (
    <ParallaxScrollView headerText={'Export'}>
      <Ionicons name="information-circle-outline" size={30} />

      <View style={styles.card}>
        <Text>Zuhause</Text>
        <RadioButton
          value="zuhause"
          status={selectedCards.includes('zuhause') ? 'checked' : 'unchecked'}
          onPress={() => handleCardSelection('zuhause')}
        />
      </View>
      <View style={styles.card}>
        <Text>Zuhause</Text>
        <RadioButton
          value="zuhause"
          status={selectedCards.includes('zuhaduse') ? 'checked' : 'unchecked'}
          onPress={() => handleCardSelection('zuhaduse')}
        />
      </View>
      <View style={styles.card}>
        <Text>Zuhause</Text>
        <RadioButton
          value="zuhause"
          status={selectedCards.includes('zushause') ? 'checked' : 'unchecked'}
          onPress={() => handleCardSelection('zushause')}
        />
      </View>
      {/* Add more cards with radio buttons here */}
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
