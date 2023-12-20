// Appointments.js

import React from 'react';
import { View, Text,  Button} from 'react-native';
import { app, auth, firestore  } from './firebase';
import { useState, useEffect } from 'react';
import { collection, onSnapshot, getDocs, query, where} from 'firebase/firestore';
import { IDictionary } from './phonelogin';

export default function Appointments() {
  
  const [userdetails, setUserDetails] = useState([]);
  
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    var sec = new Date().getSeconds(); //Current Seconds
    setCurrentDate(
      date + '/' + month + '/' + year 
      + ' ' + hours + ':' + min + ':' + sec
    );
  }, []);



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

  
  const handlePress = () => false
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {/* <Text>Welcome to the Home Page!</Text> */}
      <Text>hello {userdetails.FirstName} good to see you agian</Text>
      <Text>the date is: {currentDate}</Text>
    </View>
  );
}