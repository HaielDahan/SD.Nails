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
    navigation.navigate('phone');
    };

  
  const handleSignUp = () => {

    navigation.navigate('Sign');
  };

      return (
        <View style={styles.container}>
         <View style={styles.h1Container}>
        <Text style={styles.h1Style}>Welcome!</Text>
      </View>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.container}
        >
          <Button
            title="LOG IN"
            onPress={handleLogin} // Handle Google login
            buttonStyle={styles.loginButton}
            containerStyle={styles.buttonContainer}
            titleStyle={styles.buttonTitle}
          />
          {/* <Button
            title="Registration"
            onPress={handleSignUp} // Handle Google login
            buttonStyle={styles.loginButton}
            containerStyle={styles.buttonContainer}
            titleStyle={styles.buttonTitle}
          /> */}
        </KeyboardAvoidingView>
      </View>
      );
    }
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
      h1Container: {
        flex: 1, // Adjust the flex value as needed to position the Text component
        justifyContent: 'center', // Align the Text component to the bottom of the container
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