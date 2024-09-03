import ParallaxScrollView from "@/components/ParallaxScrollView";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { View, StyleSheet, Text, TouchableOpacity, Pressable } from "react-native";
import { GestureHandlerRootView, Swipeable } from "react-native-gesture-handler";
import { useRouter } from "expo-router";

export default function CollectionScreen() {
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
      {/* Erster grosser, runder Button */}
      <View style={styles.roundButtonContainer}>
        <Pressable style={styles.roundButton}
        onPress={() =>
          router.push({
            pathname: "/detailedCollection",
          })
        }>
            <Text style={styles.roundButtonText}>+</Text>
          </Pressable>
        </View>
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
    alignItems: 'center', 
    justifyContent: 'center',
  },
  roundButton: {
    backgroundColor: '#66AE54',
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
});
