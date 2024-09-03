import React, { useRef, useState } from "react";
import { View, TextInput, Button, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { CameraType, CameraView } from "expo-camera";
import { Plant } from "@/data/models";
import { insertData } from "@/services/DatabaseService";

export function AddPlantForm() {
  const [plantName, setPlantName] = useState<string>("");
  const [timesPerWeek, setTimesPerWeek] = useState<number>(0);
  const [amount, setAmount] = useState<number>(0);
  const [plantImage, setPlantImage] = useState<Blob | null>(null);
  const [cameraScreenVisible, setCameraScreenVisible] = useState<boolean>(false);
  const [facing, setFacing] = useState<CameraType>('back');

  const cameraRef = useRef<CameraView>(null);

  const handlePlantNameChange = (text: string) => {
    setPlantName(text);
  };

  const handleTimesPerWeekChange = (text: string) => {
    setTimesPerWeek(Number(text));
  };

  const handleAmountChange = (text: string) => {
    setAmount(Number(text));
  };

  const handleCameraIconClick = () => {
    setCameraScreenVisible((prevState) => !prevState);
  };

  const toggleCameraFacing = () => {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  };

  const takePhoto = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync({ base64: true });
      const response = await fetch(photo.uri);
      const blob = await response.blob();
      setPlantImage(blob);
      setCameraScreenVisible(false);
      alert('successfully')
    }
  };

  

  const handleSubmit = async () => {
    console.log('Add plant button pressed');
    let tableName = "Plant";
    let data: Plant = {
      title: plantName,
      frequency: timesPerWeek,
      waterAmount: amount,
      collectionId: 2, 
      image: plantImage || new Blob(), 
    };

    await insertData(tableName, data);
    console.log('inserted: ', data);
  
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
          value={timesPerWeek.toString()}
          onChangeText={handleTimesPerWeekChange}
          keyboardType="numeric"
        />
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Amount:</Text>
        <TextInput
          style={styles.input}
          value={amount.toString()}
          onChangeText={handleAmountChange}
          keyboardType="numeric"
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
          <View style={styles.container}>
            <CameraView ref={cameraRef} style={styles.camera} facing={facing}>
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
                  <Text style={styles.text}>Flip Camera</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={takePhoto}>
                  <Text style={styles.text}>Take Photo</Text>
                </TouchableOpacity>
              </View>
            </CameraView>
          </View>
        </View>
      )}
      <Button title="Save" onPress={handleSubmit}/>
      <Button title="Back" onPress={() => console.log("Back button pressed")} />
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
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});
