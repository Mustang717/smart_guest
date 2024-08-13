import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const GuardFill = () => {
  const [numPlate, setNumPlate] = useState('');
  const [homeAddress, setHomeAddress] = useState('');
  const [vehicleBrand, setVehicleBrand] = useState('');
  const [photo, setPhoto] = useState(null);

  const pickImage = async () => {
    // Ask for permission to access the camera
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert('Permission to access camera is required!');
      return;
    }

    // Open the camera
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setPhoto(result.assets[0].uri); // Set the photo URI
    }
  };

  const onSubmit = () => {
    if (!numPlate || !homeAddress || !vehicleBrand || !photo) {
      Alert.alert('All fields are required!');
      return;
    }

    // Create FormData object
    const formData = new FormData();
    formData.append('num_plate', numPlate);
    formData.append('home_address', homeAddress);
    formData.append('vehicle_brand', vehicleBrand);
    formData.append('photo', {
      uri: photo,
      name: 'vehicle_photo.jpg',
      type: 'image/jpeg',
    });

    console.log('FormData:', formData);

    // You can test this by sending the formData to your API or logging it to the console
    fetch('http://127.0.0.1:8000/vehicle-logs', {
      method: 'POST',
      body: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        Alert.alert('Success', 'Vehicle log created successfully');
      })
      .catch((error) => {
        console.error('Error:', error);
        Alert.alert('Error', 'Something went wrong');
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Vehicle Log</Text>

      <TextInput
        style={styles.input}
        placeholder="Number Plate"
        value={numPlate}
        onChangeText={setNumPlate}
      />

      <TextInput
        style={styles.input}
        placeholder="Home Address"
        value={homeAddress}
        onChangeText={setHomeAddress}
      />

      <TextInput
        style={styles.input}
        placeholder="Vehicle Brand"
        value={vehicleBrand}
        onChangeText={setVehicleBrand}
      />

      <Button title="Take Photo" onPress={pickImage} />

      {photo && <Text style={styles.photoText}>Photo selected</Text>}

      <Button title="Submit" onPress={onSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  photoText: {
    marginTop: 10,
    marginBottom: 15,
    fontStyle: 'italic',
    textAlign: 'center',
  },
});

export default GuardFill;
