import React, { useRef, useState } from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { CameraType, CameraView } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import { insertData } from "@/services/DatabaseService";
import { Plant } from "@/data/models";

export function AddPlantForm() {
  const [plantName, setPlantName] = useState<string>("");
  const [timesPerWeek, setTimesPerWeek] = useState<number>(0);
  const [amount, setAmount] = useState<number>(0);
  const [plantImage, setPlantImage] = useState<string>(""); // Store Base64 image string
  const [cameraScreenVisible, setCameraScreenVisible] =
    useState<boolean>(false);
  const [facing, setFacing] = useState<CameraType>("back");
  const cameraRef = useRef<CameraView>(null);

  const handlePlantNameChange = (text: string) => {
    setPlantName(text);
  };

  const handleTimesPerWeekChange = (text: string) => {
    setTimesPerWeek(Number(text)); // Convert string to number
  };

  const handleAmountChange = (text: string) => {
    setAmount(Number(text)); // Convert string to number
  };

  const handleCameraIconClick = () => {
    setCameraScreenVisible((prevState) => !prevState);
  };

  const toggleCameraFacing = () => {
    setFacing((current) => (current === "back" ? "front" : "back"));
  };

  const takePhoto = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync({ base64: true });
      const base64String = photo.base64 || "";
      setPlantImage(base64String);
      console.log(base64String);
    }
    setCameraScreenVisible(false);
  };

  const selectImageFromGallery = async () => {
    
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      // here you can do editable: 
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });
    console.log(result);
    
    if (!result.canceled && result.assets[0].base64) {
      setPlantImage(result.assets[0].base64);
      console.log(plantImage);
    }
  };

  const removeImage = () => {
    setPlantImage("");
  };

  const handleSubmit = async () => {
    let tableName = "Plant";
    let data: Plant = {
      title: plantName,
      frequency: timesPerWeek,
      waterAmount: amount,
      collectionId: 2,
      image: plantImage,
    };

    await insertData(tableName, data);
    console.log("inserted", data);
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
        <View style={styles.iconContainer}>
          <Ionicons name="camera" size={30} onPress={handleCameraIconClick} />
          <TouchableOpacity onPress={selectImageFromGallery}>
            <Ionicons name="image" size={30} />
          </TouchableOpacity>
        </View>
      )}

      {cameraScreenVisible && (
        <View>
          <Ionicons name="close" size={30} onPress={handleCameraIconClick} />
          <View style={styles.container}>
            <CameraView ref={cameraRef} style={styles.camera} facing={facing}>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={toggleCameraFacing}
                >
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

      {plantImage ? (
        <View>
          <Image
            source={{ uri: `data:image/jpeg;base64,${plantImage}` }}
            style={{ width: 100, height: 100 }}
          />
          <Ionicons
            name="close-circle"
            size={30}
            onPress={removeImage}
            style={{ position: "absolute", top: 0, left: 60 }}
          />
        </View>
      ) : null}
      <Button title="Save" onPress={handleSubmit} />
      <Button
        title="Back"
        onPress={() => console.log("Back button pressed")}
      />
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
    justifyContent: "center",
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
  },
});
