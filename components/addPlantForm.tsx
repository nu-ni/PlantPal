import React, { useState } from "react";
import { View, TextInput, Button, Text, StyleSheet } from "react-native";
import CameraScreen from "./CameraScreen";
import { Ionicons } from "@expo/vector-icons";

export function AddPlantForm() {
  const [plantName, setPlantName] = useState("");
  const [timesPerWeek, setTimesPerWeek] = useState("");
  const [plantImage, setPlantImage] = useState("");
  const [amount, setAmount] = useState("");
  const [cameraScreenVisible, setCameraScreenVisible] = useState(false); // Correct state management

  const handlePlantNameChange = (text: string) => {
    setPlantName(text);
  };

  const handleTimesPerWeekChange = (text: string) => {
    setTimesPerWeek(text);
  };

  const handlePlantImageChange = (text: string) => {
    setPlantImage(text);
  };

  const handleAmountChange = (text: string) => {
    setAmount(text);
  };

  const handleSubmit = () => {
    console.log("submitted");
  };

  const handleCameraIconClick = () => {
    setCameraScreenVisible((prevState) => !prevState);
  };

  return (
    <View>
      <View style={styles.row}>
        <Text style={styles.label}>Plant Name:</Text>
        <TextInput
          style={styles.input}
          value={plantName}
          onChangeText={handlePlantNameChange}
        />
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Times Per Week:</Text>
        <TextInput
          style={styles.input}
          value={timesPerWeek}
          onChangeText={handleTimesPerWeekChange}
        />
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Amount:</Text>
        <TextInput
          style={styles.input}
          value={amount}
          onChangeText={handleAmountChange}
        />
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Plant Image:</Text>
      </View>
      
      {!cameraScreenVisible && (
        <Ionicons name="camera" size={30} onPress={handleCameraIconClick} />
      )}
      
      {cameraScreenVisible && (
        <View>
          <Ionicons name="close" size={30} onPress={handleCameraIconClick} />
          <CameraScreen />
        </View>
      )}
      <Button title="Save" onPress={handleSubmit} />
      <Button title="Back" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  label: {
    color: "#E3E3E3",
    marginRight: 10,
    fontSize: 16,
    fontWeight: "bold",
  },
  input: {
    flex: 1,
    backgroundColor: "white",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
});
