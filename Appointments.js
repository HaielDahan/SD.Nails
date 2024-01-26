// Appointments.js

import React from 'react';
import { View, Text,  Button, Platform, Alert, Modal, StyleSheet, Pressable} from 'react-native';
import { app, auth, firestore  } from './firebase';
import { useState, useEffect } from 'react';
import { collection, onSnapshot, getDocs, query, where, setDoc, doc} from 'firebase/firestore';
import { IDictionary } from './phonelogin';
import  DateTimePicker from '@react-native-community/datetimepicker';
import DatePicker from 'react-native-date-picker';

const times = [
  {id:1,time: '09:00',isAvilable:true},
  {id:2,time: '10:00',isAvilable:true},
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
  const [avilabletime, setAvilabletime] = useState([]);
  const [unavailable, setUnavailable] = useState(false);
  const [appdata, setAppdata] = useState({ 
    date: '',
    hour:'',
    notes: '', 
    userID: IDictionary['authID'],
    });


  const [modalVisible, setModalVisible] = useState(false);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const appointmentCollectionRef = collection(firestore, 'Appointment');    
  //       const q = query(appointmentCollectionRef, where('', '==',);
  //       const querySnapshot = await getDocs(q);

  //       querySnapshot.forEach((doc) => {
  //         // Access data inside each document using doc.data()
  //         const data = doc.data();
  //         setAppdata(data)
  //         console.log('Document data:', appdata);
  //       });
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   };

  //   fetchData(); // Call the function to fetch data when the component mounts
  // }, []);


  const onChange = async (event, selectedDate) => {
    const currentDate = selectedDate || date;

    if (event.type === 'set') {
      // console.log("i am here:");
      setDate(currentDate);
      setModalVisible(true);
      let tempDate = new Date(currentDate);
      let fDate = tempDate.getDate() + '/' + (tempDate.getMonth() + 1) + '/' + tempDate.getFullYear();
      setDatetext(fDate);
      setAppdata({...appdata,date:fDate});
      const filteredResult = await filteredavailabletime(fDate);
      setScheduled(true);
    } else if (event.type === 'dismissed') {
      setShow(false);
    }
  };

  const filteredavailabletime = async (date) => {
    console.log("i am here:",date);
    const datetextWithoutSlashes = date.replace(/\//g, '-');
    const collectionRef = collection(firestore, 'Appointment');
    const timecol = await getDocs(collectionRef);
    // const filteredDocs = timecol.docs.filter(doc => doc.id === datetextWithoutSlashes);
    const filteredDocs = timecol.docs.filter(doc => {
      const idParts = doc.id.split(':');
      const datePart = idParts[0];
      return datePart === datetextWithoutSlashes;
    });    
    if (filteredDocs.length !== 0) {
      const updatedTimes = times.map(time => {
        const matchingDoc = filteredDocs.find(doc => doc.data().hour === time.time);
        if (matchingDoc) {
          return { ...time, isAvilable: false };
        }
        return time;
      });

      if (updatedTimes.every(time => !time.isAvilable)) {
        setUnavailable(true);
      }else{
        setUnavailable(false);
      }
      setAvilabletime(updatedTimes);
    } else {
      setAvilabletime(times);
    }
  
    // Return the result if needed
    return timecol;
  }

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  }
  const handleTimeClick = (time) => {
    setTimetext(time);
    setAppdata({...appdata,hour:time.time})
  }

  const handleDateTime = async () => {
    const collectionRef = collection(firestore, 'Appointment');
    // const dataToSave = {
    //   date: datetext,
    //   // other properties from appdata that you want to save
    // };
    const datetextWithoutSlashes = datetext.replace(/\//g, '-');
    const newDocRef = doc(collectionRef, datetextWithoutSlashes+ ":" +timetext.time);
    let dateid = datetext;
    try {
      await setDoc(newDocRef, appdata);
      console.log('Document successfully written!');
    } catch (error) {
      console.error('Error writing document: ', error);
    }
  
    setModalVisible(!modalVisible);
    setShow(false);
  }
  

  const handleHideModel = () => {
    setTimetext({});
    // console.log("date:", date);
    // console.log("time: ", timetext);
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
            {scheduled && !unavailable && avilabletime.map((time)=>{
              if (time.isAvilable) {
              return <View key={time.id}>
                        <Button 
                        title={time.time} 
                        onPress={() => handleTimeClick(time)} />
                      </View>
              }})}
              {scheduled && unavailable && (
                <View>
                  <Text>Unavailability of appointments</Text>
                </View>
              )}
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => handleHideModel()}>
              <Text style={styles.textStyle}>cancel</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => handleDateTime()}>
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


        // showMode('time');
      // } else if (mode === 'time') {
      //   let tempDate = new Date(currentDate);
      //   let fDate = tempDate.getDate() + '/' + (tempDate.getMonth() + 1) + '/' + tempDate.getFullYear();
      //   let fTime = 'Hours: ' + tempDate.getHours() + ' | Minutes: ' + tempDate.getMinutes();
      //   setText(fDate + '\n' + fTime);
      //   setShow(false);


      // if(filteredDocs.length != 0){    
      //   filteredDocs.forEach(doc => {
      //     console.log(doc.id, " => ", doc.data());
      //     const timeToUpdate = doc.data().hour;
      //     const updatedTimes = times.map(time => {
      //       if (time.time === timeToUpdate) {
      //         return { ...time, isAvilable: false };
      //       }
      //       return time;
      //     });
      //     console.log(updatedTimes);
      //     setAvilabletime(updatedTimes);
      //   });
      // }
      // else{
      //   setAvilabletime(times)
      //   return times;
      // }
