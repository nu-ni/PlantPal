import ParallaxScrollView from "@/components/ParallaxScrollView";
import { PlantCollection } from "@/data/models";
import { deleteData, fetchAllCollectionsWithPlantCount, Tables } from "@/services/DatabaseService";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "expo-router";
import React, { useState } from "react";
import { View, StyleSheet, Image, Text, TouchableOpacity } from "react-native";
import { GestureHandlerRootView, Swipeable } from "react-native-gesture-handler";

export default function CollectionScreen() {
  const [collections, setCollections] = useState<PlantCollection[]>([]);

  const fetchCollections = async () => {
    const collectionData = await fetchAllCollectionsWithPlantCount();
    setCollections(collectionData as PlantCollection[]);
  }

  useFocusEffect(
    React.useCallback(() => {
      let isActive = true;

      fetchCollections();

      return () => {
        isActive = false;
      };
    }, [])
  );

  const handleDelete = async (collectionId: number) => {
    await deleteData(Tables.PLANT_COLLECTION, collectionId);
    await fetchCollections();
    console.log("deleted id:", collectionId);
  };

const renderLeftActions = (collectionId: number) => (
    <TouchableOpacity 
        style={styles.swipeAction} 
        onPress={() => handleDelete(collectionId)}
    >
      <Text style={styles.swipeText}>Delete</Text>
    </TouchableOpacity>
);

  const renderSwipeableCard = (title: string, description: string, id: string) => (
    <Swipeable renderRightActions={() => renderLeftActions(Number(id))}>
      <View style={styles.card}>
        <View style={styles.cardTextContainer}>
          <Text style={styles.cardTitle}>{title}</Text>
          <Text style={styles.cardDescription}>{description}</Text>
        </View>
              <Image
        style={styles.cardAvatar}
        source={require('@/assets/images/user-solid.png')}
      />
      </View>
    </Swipeable>
  );

  return (
    <ParallaxScrollView headerText={"Your Collections"}>
      <Ionicons name="information-circle-outline" size={30}></Ionicons>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <View style={styles.cardContainer}>
          {collections.map((collection) => {
            const collectionId = collection.id!.toString();
            return (
              renderSwipeableCard(collection.title, `${collection.count} Pflanzen`, collectionId)
            )
          })}
        </View>
      </GestureHandlerRootView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    paddingHorizontal: 10,
    marginTop: 16,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 17,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    flexDirection: "row",
    alignItems: "center",
  },
  cardTitle: {
    fontSize: 18,
    marginTop: 6,
    marginLeft: 10,
    fontWeight: "bold",
    marginBottom: 2,
    flex: 1,
  },
  cardDescription: {
    marginLeft: 10,
    fontSize: 14,
    marginBottom: 28,
  },
  swipeAction: {
    backgroundColor: "#FF3B30",
    justifyContent: "center",
    alignItems: "center",
    width: 80,
    borderRadius: 8,
    marginBottom: 16,
  },
  swipeText: {
    color: "#fff",
    fontWeight: "bold",
  },
  cardAvatar: {
    width: 65,
    height: 75,
    opacity: 0.7,
  },
  cardTextContainer: {
    flex: 1,
  },
});
