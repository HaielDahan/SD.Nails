// HomeScreen.js

import React from 'react';
import { View, Text,  Button} from 'react-native';
import { app, auth, firestore  } from './firebase';
import { useState, useEffect } from 'react';
import { collection, onSnapshot, getDocs, query, where} from 'firebase/firestore';
import { IDictionary } from './phonelogin';
import { useNavigation } from '@react-navigation/native';

export default function HomePage() {
  
  const [userdetails, setUserDetails] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userCollectionRef = collection(firestore, 'User');
        const q = query(userCollectionRef, where('userID', '==', IDictionary['authID']));
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) => {
          // Access data inside each document using doc.data()
          const data = doc.data();
          setUserDetails(data)
          console.log('Document data:', userdetails);
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData(); // Call the function to fetch data when the component mounts
  }, []);
  // useEffect(() => {
  //   // Log the updated userdetails value
  //   console.log("userdetails:", userdetails);
  // }, [userdetails]);
  const handlePress = () => navigation.navigate('Appointments');
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {/* <Text>Welcome to the Home Page!</Text> */}
      <Text>hello {userdetails.FirstName} good to see you agian</Text>
      <Button
         onPress = {handlePress}
         title = "appointments"
         color = "black"
      />
    </View>
  );
}
// {Appointment.map((obj) => (
//   <View key={obj.id}>
//     <Text>ID: {obj.id}</Text>
//     <Text>Notes: {obj.notes}</Text>
//     <Text>Hour: {obj.hour}</Text>
//     <Text>Date: {obj.date}</Text>
//     <Text>UserID: {obj.userID}</Text>
//   </View>
// ))}


// .then((querySnapshot) => {
//   const objs = [];
//   querySnapshot.forEach((doc) => {
//     objs.push({
//       id: doc.id,
//       ...doc.data(),
//     });
//   });