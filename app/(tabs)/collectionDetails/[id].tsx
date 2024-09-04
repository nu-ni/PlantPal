import React, { useState, useEffect } from "react";
import {
  Text,
  Pressable,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { Plant } from "@/data/models";
import {
  deleteData,
  getPlantsByCollectionId,
  Tables,
} from "@/services/DatabaseService";
import PlantCard from "@/components/PlantCard";
import { useFocusEffect } from "@react-navigation/native";
import { router, useLocalSearchParams } from "expo-router";
import { AddPlantForm } from "@/components/addPlantForm";
import { GestureHandlerRootView, Swipeable } from "react-native-gesture-handler";

export default function DetailedCollectionScreen() {
  const [plants, setPlants] = useState<Plant[]>([]);
  const [isFormVisible, setIsFormVisible] = useState<boolean>(false);
  const { id } = useLocalSearchParams();

  useFocusEffect(
    React.useCallback(() => {
      let isActive = true;

      fetchPlants(isActive);

      return () => {
        isActive = false;
      };
    }, [])
  );
// here you could remove is act
  const fetchPlants = async (isActive: boolean) => {
    const result = await getPlantsByCollectionId(Number(id));
    if (!result) {
      console.log("No plants found");
      return;
    }

    if (isActive) {
      setPlants(result as Plant[]);
    }
  };

  const handleButtonClick = () => {
    setIsFormVisible(!isFormVisible);
    
  };

  const handleDelete = async (plantId: number) => {
    await deleteData(Tables.PLANT, plantId);
    // look again at last active
    await fetchPlants(true);
    console.log("deleted id:", plantId);
  };

  const renderLeftActions = (plantId: number) => (
    <TouchableOpacity
      style={styles.swipeAction}
      onPress={() => handleDelete(plantId)}
    >
      <Text style={styles.swipeText}>Delete</Text>
    </TouchableOpacity>
  );

  const renderSwipeableCard = (title: string, frequency: number,  amount: number, id: string, image: string) => (
    <Swipeable renderRightActions={() => renderLeftActions(Number(id))}>
      <TouchableOpacity
        style={styles.card} // Use TouchableOpacity instead of View
        onPress={() => {
          router.push(`/collectionDetails/${id}`);
        }}
      >
        <View style={styles.cardTextContainer}>
          <Text style={styles.cardTitle}>{title}</Text>
          <Text style={styles.cardDescription}>{frequency} per week</Text>
          <Text style={styles.cardDescription}>{amount} dl</Text>
          <Image source={{ uri: `data:image/jpeg;base64,${image}` }} style={styles.image} />

        </View>
      </TouchableOpacity>
    </Swipeable>
  );
  return (
    <ParallaxScrollView headerText={id?.toString() || 'loading'}>
      {!isFormVisible && (
        <>
        <GestureHandlerRootView style={{ flex: 1 }}>

          {plants.map((plant) => {
            const plantId = plant.id!.toString();
            return (
              
              renderSwipeableCard(plant.title, plant.frequency, plant.waterAmount, plantId, plant.image)
              
            )
          })}
        </GestureHandlerRootView>
          
          <View style={styles.roundButtonContainer}>
            <Pressable style={styles.roundButton} onPress={handleButtonClick}>
              <Text style={styles.roundButtonText}>+</Text>
            </Pressable>
          </View>
        </>
      )}
      {isFormVisible && <AddPlantForm onButtonClick={handleButtonClick} />}
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  roundButtonContainer: {
    marginBottom: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  roundButton: {
    backgroundColor: "#66AE54",
    width: 50,
    height: 50,
    borderRadius: 50,
    display: "flex",
  },
  roundButtonText: {
    top: "-10%",
    color: "white",
    fontSize: 40,
    textAlign: "center",
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
  },cardContainer: {
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
  
  cardAvatar: {
    width: 65,
    height: 75,
    opacity: 0.7,
  },
  cardTextContainer: {
    flex: 1,
  },
  image: {
    height: 20,
    width: 20,
    alignSelf: 'center',
  },
});
