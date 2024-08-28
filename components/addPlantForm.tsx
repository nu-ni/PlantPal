import React, { useState } from "react";
import { View, TextInput, Button, Text, StyleSheet } from "react-native";
import { ActionButton } from "./actionButtton";

export function AddPlantForm() {
  const [plantName, setPlantName] = useState("");
  const [timesPerWeek, setTimesPerWeek] = useState("");
  const [plantImage, setPlantImage] = useState("");
  const [amount, setAmount] = useState("");

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
        <TextInput
          style={styles.input}
          value={plantImage}
          onChangeText={handlePlantImageChange}
        />
      </View>
      <Button title="Submit" onPress={handleSubmit} />
      <ActionButton></ActionButton>
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
    color: '#E3E3E3',
    marginRight: 10,
    fontSize: 16,
    fontWeight: "bold",
  },
  input: {
    flex: 1,
    backgroundColor: 'white',
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
});
