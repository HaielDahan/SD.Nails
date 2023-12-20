import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, KeyboardAvoidingView, Platform, TouchableOpacity  } from 'react-native';
import { Input, Icon, Button } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { firestore  } from './firebase';
import { collection, doc, setDoc } from 'firebase/firestore';
import {createUserWithEmailAndPassword } from "firebase/auth";
import { IDictionary } from './phonelogin';


export default function SignUp() {
  const [userData, setUserData] = useState({ 
  FirstName: '',
  LastName:'',
  Phone: IDictionary['phone'], 
  isAdmin: false, 
  userID: IDictionary['authID'],
  });
  
  //const [showPassword, setShowPassword] = useState(false);

  const navigation = useNavigation();


  
  const handleSignUp = async () => {

    console.log('User Data:', userData);
    const collectionRef = collection(firestore, 'User');
    const newDocRef = doc(collectionRef, '1');
    try {
      await setDoc(newDocRef, userData);
      console.log('Document successfully written!');
    } catch (error) {
      console.error('Error writing document: ', error);
    }
    setUserData({ FirstName: '',LastName:'', Phone:'',isAdmin: false, userID:''});
    navigation.navigate('Home');
  };

  // const togglePasswordVisibility = () => {
  //   setShowPassword(!showPassword);
  // };

      return (
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.container}
        >
          <Text style={styles.h1Style}>Registration</Text>
          <Input
            placeholder='First Name'
            value={userData.FirstName}
            onChangeText={(text) => setUserData({ ...userData, FirstName: text })}
            containerStyle={styles.inputContainer}
          />
          <Input
            placeholder='Last Name'
            value={userData.LastName}
            onChangeText={(text) => setUserData({ ...userData, LastName: text })}
            containerStyle={styles.inputContainer}
          />

          <Input
            placeholder="Phone Number"
            leftIcon={{ type: 'phone', name: 'phone' }}
            value={userData.Phone}
            onChangeText={(text) => setUserData({ ...userData, Phone: text })}
            keyboardType="numeric"
            containerStyle={styles.inputContainer}
          />

 
          <Button
            title="Sign Up"
            onPress={handleSignUp} // Handle Google login
            buttonStyle={styles.loginButton}
            containerStyle={styles.buttonContainer}
            titleStyle={styles.buttonTitle}
          />
        </KeyboardAvoidingView>
      );
    }

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    h1Style: {
      fontWeight: 'bold',
      fontSize: 24,
      marginBottom: 20,
    },
    inputContainer: {
      width: '80%',
      marginBottom: 20,
    },
    loginButton: {
      backgroundColor: 'black',
      borderWidth: 2,
      borderColor: 'white',
      borderRadius: 30,
    },
    buttonContainer: {
      width: 200,
      marginVertical: 10,
    },
    buttonTitle: {
      fontWeight: 'bold',
    },
  });


//   <TouchableOpacity onPress={togglePasswordVisibility}>
//   <Icon name={showPassword ? 'visibility_off ' : 'visibility'} size={20} />
// </TouchableOpacity>

{/* <Input
  placeholder='Email'
  leftIcon={{ type: 'alternate_email', name: 'mail' }}
  value={userData.Email}
  onChangeText={(text) => setUserData({ ...userData, Email: text })}
  containerStyle={styles.inputContainer}
/> */}

{/* <Input
placeholder="Password"
leftIcon={{ type: 'password', name: 'lock' }}
secureTextEntry={!showPassword}
value={userData.Password}
onChangeText={(text) => setUserData({ ...userData, Password: text })}
keyboardType="numeric"
containerStyle={styles.inputContainer}
/> */}