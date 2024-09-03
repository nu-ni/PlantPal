import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Modal, TextInput, Button } from 'react-native';
import { AddPlantForm } from '@/components/addPlantForm';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { ActionButton } from '@/components/actionButtton';

export default function DetailedCollectionScreen() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isInputValid, setIsInputValid] = useState(false);

  useEffect(() => {
    const firstTime = true;
    if (firstTime) {
      setIsModalVisible(true);
    }
  }, []);

  const handleInputChange = (text) => {
    setInputValue(text);
    const isValid = /[a-zA-Z0-9]/.test(text);
    setIsInputValid(isValid);
  };

  const handleModalClose = () => {
    if (isInputValid) {
      setIsModalVisible(false);
    } else {
      alert("Please enter a valid name containing at least one letter or number.");
    }
  };

  return (
    <ParallaxScrollView headerText={inputValue}>
      <Text>Detailed Collection Page</Text>
      <AddPlantForm />

      {/* Popup Modal */}
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={handleModalClose}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Enter a name for your first Collection!</Text>
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
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});
