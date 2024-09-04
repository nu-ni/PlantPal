import ParallaxScrollView from "@/components/ParallaxScrollView";
import { PlantCollection } from "@/data/models";
import { deleteData, fetchAllCollectionsWithPlantCount, insertData, Tables } from "@/services/DatabaseService";
import React, { useState, useEffect } from 'react';
import { Ionicons } from "@expo/vector-icons";
import { Link, useFocusEffect } from "expo-router";
import { View, StyleSheet, Image, Text, Modal, TextInput, Pressable, TouchableOpacity } from "react-native";
import { GestureHandlerRootView, Swipeable } from "react-native-gesture-handler";
import { useRouter } from "expo-router";
import { ActionButton } from "@/components/actionButtton";

export default function CollectionScreen() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isInputValid, setIsInputValid] = useState(false);
  const router = useRouter();

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
    <TouchableOpacity
      style={styles.card} // Use TouchableOpacity instead of View
      onPress={() => {
        router.push(`/collectionDetails/${id}`);
      }}
    >
      <View style={styles.cardTextContainer}>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardDescription}>{description}</Text>
      </View>
      <Image
        style={styles.cardAvatar}
        source={require('@/assets/images/user-solid.png')}
      />
    </TouchableOpacity>
  </Swipeable>
);

  useEffect(() => {
    const firstTime = true;
    if (firstTime) {
      // setIsModalVisible(true);
    }
  }, []);

  const handleInputChange = (text: string) => {
    setInputValue(text);
    const isValid = /[a-zA-Z0-9]/.test(text);
    setIsInputValid(isValid);
  };

  const handleModalClose = async () => {
    if (isInputValid) {
      setIsModalVisible(false);
      await insertData(Tables.PLANT_COLLECTION, { title: inputValue, lastActive: new Date() });
      await fetchCollections();
    } else {
      alert(
        "Please enter a valid name containing at least one letter or number."
      );
    }
  };

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

      {/* Erster grosser, runder Button */}
      <View style={styles.roundButtonContainer}>
        <Pressable style={styles.roundButton}
          onPress={() => setIsModalVisible(true)}>
          <Text style={styles.roundButtonText}>+</Text>
        </Pressable>
      </View>

      {/* Popup Modal */}
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={handleModalClose}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Enter a name for your Collection!</Text>
            <TextInput
              style={styles.input}
              placeholder="f.e. Home"
              value={inputValue}
              onChangeText={handleInputChange}
            />
            <ActionButton
              title="Submit"
              onPress={handleModalClose}
              disabled={!isInputValid}
            />
          </View>
        </View>
      </Modal>

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
  roundButtonContainer: {
    marginTop: 10,
    marginBottom: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  roundButton: {
    backgroundColor: "#66AE54",
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  roundButtonText: {
    color: "white",
    fontSize: 50,
    textAlign: "center",
    marginBottom: 5,
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
});
