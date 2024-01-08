// Appointments.js

import React from 'react';
import { View, Text,  Button, Platform, Alert, Modal, StyleSheet, Pressable} from 'react-native';
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
  const [datetext, setDatetext] = useState('Empty');
  const [timetext, setTimetext] = useState({});


  const [modalVisible, setModalVisible] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;

    if (event.type === 'set') {
      if (mode === 'date') {
        setDate(currentDate);
        setScheduled(true);
        setModalVisible(true);
        let tempDate = new Date(currentDate);
        let fDate = tempDate.getDate() + '/' + (tempDate.getMonth() + 1) + '/' + tempDate.getFullYear();
        setDatetext(fDate);
        // showMode('time');
      // } else if (mode === 'time') {
      //   let tempDate = new Date(currentDate);
      //   let fDate = tempDate.getDate() + '/' + (tempDate.getMonth() + 1) + '/' + tempDate.getFullYear();
      //   let fTime = 'Hours: ' + tempDate.getHours() + ' | Minutes: ' + tempDate.getMinutes();
      //   setText(fDate + '\n' + fTime);
      //   setShow(false);
      }
    } else if (event.type === 'dismissed') {
      setShow(false);
    }
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  }
  const handleTimeClick = (time) => {
    setTimetext(time);
    console.log("time: ", time.time);
  }

  const handleDateTime = (date ,time) => {
    console.log("date:", date);
    console.log("time: ", time.time);
    setModalVisible(!modalVisible);
    setShow(false);
  }

  const handleHideModel = () => {
    setTimetext({});
    console.log("date:", date);
    console.log("time: ", timetext);
    setModalVisible(!modalVisible);
  }
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontWeight: 'bold', fontSize: 20 }}>{datetext}, {timetext.time}</Text>
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
      {/* {scheduled && filteredTimes.map((time)=>{return <View key={time.id}>
        <Button 
          title={time.time} 
          onPress={() => handleTimeClick(time)} 
        />
      </View>})} */}
      <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>choose a time:</Text>
            <Pressable>
            {scheduled && filteredTimes.map((time)=>{return <View key={time.id}>
             <Button 
            title={time.time} 
            onPress={() => handleTimeClick(time)} />
            </View>})}
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => handleHideModel()}>
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => handleDateTime(datetext, timetext)}>
              <Text style={styles.textStyle}>ok</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      {/* <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}>
        <Text style={styles.textStyle}>Show Modal</Text>
      </Pressable> */}
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});


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

