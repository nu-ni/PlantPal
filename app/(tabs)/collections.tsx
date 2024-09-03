import ParallaxScrollView from "@/components/ParallaxScrollView";
import React, { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TextInput,
  Button,
  Pressable,
  TouchableOpacity,
} from "react-native";
import {
  GestureHandlerRootView,
  Swipeable,
} from "react-native-gesture-handler";
import { Link, useRouter } from "expo-router";
import { ActionButton } from "@/components/actionButtton";
import { AddPlantForm } from "@/components/addPlantForm";

export default function CollectionScreen() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isInputValid, setIsInputValid] = useState(false);
  const router = useRouter();

  const handleDelete = () => {
    console.log("almost deleted");
  };

  const renderLeftActions = () => (
    <TouchableOpacity style={styles.swipeAction} onPress={handleDelete}>
      <Text style={styles.swipeText}>Delete</Text>
    </TouchableOpacity>
  );

  const renderSwipeableCard = (title: string, description: string) => (
    <Swipeable renderRightActions={renderLeftActions}>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardDescription}>{description}</Text>
      </View>
    </Swipeable>
  );

  useEffect(() => {
    const firstTime = true;
    if (firstTime) {
      setIsModalVisible(true);
    }
  }, []);

  const handleInputChange = (text: string) => {
    setInputValue(text);
    const isValid = /[a-zA-Z0-9]/.test(text);
    setIsInputValid(isValid);
  };

  const handleModalClose = () => {
    if (isInputValid) {
      setIsModalVisible(false);
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
          {renderSwipeableCard("Zuhause", "12 Pflanzen")}
          {renderSwipeableCard("Müllers", "4 Pflanzen")}
          {renderSwipeableCard("Büro", "2 Pflanzen")}
        </View>
      </GestureHandlerRootView>
      {/* Popup Modal */}

      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={handleModalClose}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              Enter a name for your first Collection!
            </Text>
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

      {/* Erster grosser, runder Button */}
      <View style={styles.roundButtonContainer}>
        <Pressable
          style={styles.roundButton}
          onPress={() =>
            router.push({
              pathname: "/collectionDetails[id]",
            })
          }
        >
          <Text style={styles.roundButtonText}>+</Text>
        </Pressable>
      </View>
      <Link href="/collectionDetails/1">View first user details</Link>
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
    padding: 16,
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
    fontWeight: "bold",
    marginBottom: 8,
    flex: 1,
  },
  cardDescription: {
    fontSize: 14,
    marginBottom: 12,
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
  roundButtonContainer: {
    marginTop: 170,
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
