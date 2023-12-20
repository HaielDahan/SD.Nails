import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, KeyboardAvoidingView, Platform  } from 'react-native';
import { Input, Icon, Button } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { app, auth, firestore  } from './firebase';
import { signInWithEmailAndPassword  } from "firebase/auth";

export const IDictionary = {
  authID: '',
};

// import { firebase } from '@react-native-firebase/auth';

// Request password reset
const resetPassword = async (email) => {
  try {
    await auth().sendPasswordResetEmail(email);
    // Email sent successfully
  } catch (error) {
    // Handle error
  }
};

// Verify token and reset password
const verifyTokenAndResetPassword = async (token, newPassword) => {
  try {
    // Verify token on the server
    // If valid, reset password
    await auth().confirmPasswordReset(token, newPassword);
    // Password reset successful
  } catch (error) {
    // Handle error
  }
};


export default function LoginPage() {
  const [userData, setUserData] = useState({email:'',password:''});
  
  const navigation = useNavigation();
  // const auth = firebase.auth();

  const handleLogin = () => {
    // const { email, password } = userData;
    // if (!email || !password) {
    //   // Handle empty email or password
    //   console.error('Email and password are required.');
    //   return;
    // }

    // signInWithEmailAndPassword(auth,email, password)
    //   .then((userCredential) => {
    //     // Signed in successfully
    //     const user = userCredential.user;
    //     IDictionary['authID'] = user.uid;
    //     // Navigate to the Home screen or perform other actions
    //     navigation.navigate('Home');
    //   })
    //   .catch((error) => {
    //     // Handle authentication errors
    //     console.error('Authentication error:', error);
    //   });
    //   setUserData({email:'', phoneNumber: '',password:''});
    //   // navigation.navigate('Home');
    navigation.navigate('phone');
    };

  
  const handleSignUp = () => {

    navigation.navigate('Sign');
  };

      return (
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.container}
        >
          <Text style={styles.h1Style}>Welcome!</Text>
          <Input
            placeholder='Email'
            leftIcon={{ type: 'alternate_email', name: 'mail' }}
            value={userData.email}
            onChangeText={(text) => setUserData({ ...userData, email: text })}
            containerStyle={styles.inputContainer}
          />
          <Input
            placeholder="Password"
            secureTextEntry={true}
            value={userData.password}
            onChangeText={(text) => setUserData({ ...userData, password: text })}
            keyboardType="numeric"
            containerStyle={styles.inputContainer}
          />
          <Button
            title="LOG IN"
            onPress={handleLogin} // Handle Google login
            buttonStyle={styles.loginButton}
            containerStyle={styles.buttonContainer}
            titleStyle={styles.buttonTitle}
          />
          <Button
            title="Registration"
            onPress={handleSignUp} // Handle Google login
            buttonStyle={styles.loginButton}
            containerStyle={styles.buttonContainer}
            titleStyle={styles.buttonTitle}
          />
          <Button
            title="Forgot Password"
            onPress={resetPassword} // Handle Google login
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

//   <Input
//   placeholder="Phone Number"
//   value={userData.phoneNumber}
//   onChangeText={(text) => setUserData({ ...userData, phoneNumber: text })}
//   keyboardType="numeric"
//   containerStyle={styles.inputContainer}
// />