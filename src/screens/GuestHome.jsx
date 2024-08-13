import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image } from 'react-native';
import { guest } from '../api/mockData'
const GuestHome = () => {
  const [userName, setUserName] = useState('88/290'); 
  const [guests, setGuests] = useState([]);

  useEffect(() => {
    
    setGuests(guest);
    // fetch('http://127.0.0.1:8000/api/guests')  // เปลี่ยน URL นี้เป็น URL ของ API ที่คุณใช้
    //   .then(response => response.json())
    //   .then(data => setGuests(data))
    //   .catch(error => console.error('Error fetching guests:', error));
  }, []);

  const renderGuestItem = ({ item }) => (
    <View style={styles.guestItem}>
      <Text style={styles.guestName}>{item.name}</Text>
      <Text style={styles.guestInfo}>{item.reason}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../image/home.png')} style={styles.icon}/>
        {/* <Image source={{ uri: 'https://your-icon-url.com/icon.png' }} style={styles.icon} /> */}
        <Text style={styles.userName}>{userName}</Text>
      </View>

      <FlatList
        data={guests}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderGuestItem}
        contentContainerStyle={styles.guestList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8f8f8',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  icon: {
    width: 30,
    height: 30,
    borderRadius: 0,
    marginRight: 10,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'gray'
  },
  guestList: {
    paddingBottom: 20,
  },
  guestItem: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  guestName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  guestInfo: {
    marginTop: 4,
    color: '#555',
  },
});

export default GuestHome;
