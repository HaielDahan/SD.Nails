// Appointments.js

import React from 'react';
import { View, Text,  Button, Platform} from 'react-native';
import { app, auth, firestore  } from './firebase';
import { useState, useEffect } from 'react';
import { collection, onSnapshot, getDocs, query, where} from 'firebase/firestore';
import { IDictionary } from './phonelogin';
import  DateTimePicker from '@react-native-community/datetimepicker';
import DatePicker from 'react-native-date-picker';

const times = [
  {id:1,time: '09:00',isAvilable:true},
  {id:2,time: '10:00',isAvilable:false},
  {id:3,time: '11:00',isAvilable:true},
  {id:4,time: '12:00',isAvilable:true},
  {id:5,time: '13:00',isAvilable:true},
 
];
const filteredTimes = times.filter((time)=>time.isAvilable)
const filteredTimes2 = []




export default function Appointments() {
  
  const [userdetails, setUserDetails] = useState([]);
  
  // const [currentDate, setCurrentDate] = useState('');
  const [scheduled, setScheduled] = useState(false);
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [text, setText] = useState('Empty');

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;

    if (event.type === 'set') {
      if (mode === 'date') {
        setDate(currentDate);
        setScheduled(true);
        showMode('time');
      } else if (mode === 'time') {
        let tempDate = new Date(currentDate);
        let fDate = tempDate.getDate() + '/' + (tempDate.getMonth() + 1) + '/' + tempDate.getFullYear();
        let fTime = 'Hours: ' + tempDate.getHours() + ' | Minutes: ' + tempDate.getMinutes();
        setText(fDate + '\n' + fTime);
        setShow(false);
      }
    } else if (event.type === 'dismissed') {
      setShow(false);
    }
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontWeight: 'bold', fontSize: 20 }}>{text}</Text>
      <View style={{ margin: 20 }}>
        <Button title='DatePicker' onPress={() => showMode('date')} />
      </View>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display='default'
          onChange={onChange}
        />
      )}
      {/* {date&&<></>} */}
      {scheduled && filteredTimes.map((time)=>{return <View key={time.id}>
        <Button 
          title={time.time} 
          onPress={() => handleTimeClick(time)} 
        />
      </View>})}
    </View>
  );
}



  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const userCollectionRef = collection(firestore, 'User');
  //       const q = query(userCollectionRef, where('userID', '==', IDictionary['authID']));
  //       const querySnapshot = await getDocs(q);

  //       querySnapshot.forEach((doc) => {
  //         // Access data inside each document using doc.data()
  //         const data = doc.data();
  //         setUserDetails(data)
  //         console.log('Document data:', userdetails);
  //       });
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   };

  //   fetchData(); // Call the function to fetch data when the component mounts
  // }, []);

