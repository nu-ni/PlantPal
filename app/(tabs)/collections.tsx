import ParallaxScrollView from "@/components/ParallaxScrollView";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { GestureHandlerRootView, Swipeable } from "react-native-gesture-handler";

export default function CollectionScreen() {
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
});
