import { Image, StyleSheet, Platform } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/green-plant-background.jpeg')}
          style={styles.plantLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome!</ThemedText>
        <HelloWave />
      </ThemedView>  
      <ThemedView style={styles.stepContainer}>
        <ThemedText>
          Erstelle schnell Pflanzenprofile, erstelle individuelle Giesspläne und teile sie mit Freunden oder Nachbarn. So bleiben deine grünen Mitbewohner immer perfekt versorgt – ganz ohne Stress!        </ThemedText>
        <br></br><ThemedText type="subtitle">Mach Pflanzenpflege smart und einfach – mit PlantPals!</ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  plantLogo: {
    height: '150%',
    width: '200%',
    position: 'absolute',
    resizeMode: 'contain', 
  },
  text: {
    color: 'white',
  }
});
