import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, KeyboardAvoidingView, Platform ,TextInput ,Button, Alert, TouchableOpacity} from 'react-native';
// import { Input, Icon, Button } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect, useRef} from 'react';
import { app, auth, firestore, firebaseConfig} from './firebase';
import { PhoneAuthProvider,RecaptchaVerifier,signInWithCredential} from "firebase/auth";
import {FirebaseRecaptchaVerifierModal,FirebaseRecaptchaBanner} from 'expo-firebase-recaptcha';
import { collection, getDocs, query, where } from 'firebase/firestore';

// const users = firestore;

if (!app?.options || Platform.OS === 'web') {
    throw new Error(
    'This example only works on Android or iOS, and requires a valid Firebase config.'
    );
}



export const IDictionary = {
    authID: '',
    phone:'',
  };



export default function Phonelogin() {
    const recaptchaVerifier = useRef(null);

    const [phoneNumber,setPhoneNumber] = useState('');
    const [verificationId,setVerificationID] = useState('');
    const [verificationCode,setVerificationCode] = useState('');

    const firebaseConfig = app ? app.options : undefined;
    const [info,setInfo] = useState("");
    const attemptInvisibleVerification = false;
    const navigation = useNavigation();


    // Define the function for sending the verification code
    const handleSendVerificationCode = async () => {
        try{
            const fullPhoneNumber = `+972${phoneNumber}`;
            const phoneProvider = new PhoneAuthProvider(auth); // initialize the phone provider.
            //await
            const verificationId = await phoneProvider.verifyPhoneNumber(fullPhoneNumber,recaptchaVerifier.current); // get the verification idS
            setVerificationID(verificationId); // set the verification id
            setInfo('Success : Verification code has been sent to your phone'); // If Ok, show message.
        }catch(error){
            console.error("Error occurred during phone number verification:", error);
            setInfo(`Error : ${error.message}`); // show the error
        }
        console.log('i done');
    };

    // Define the function for verifying the entered verification code

    const handleVerifyVerificationCode = async () => {
        try{
            const credential = PhoneAuthProvider.credential(verificationId,verificationCode); // get the credential
            const userCredential = await signInWithCredential(auth,credential); // verify the credential
            const user = userCredential.user;
            let phoneNumber = user.phoneNumber;
            phoneNumber = phoneNumber.replace('+972', '0');

            IDictionary['authID'] = user.uid;
            IDictionary['phone'] = phoneNumber;
            
            // Checking whether the user exists and switching to the appropriate page
            try {
                console.log(phoneNumber);
                const querySnapshot = await getDocs(
                    query(collection(firestore, 'User'),where('Phone','==',phoneNumber))
                );
                if (querySnapshot.docs.length > 0) {
                    navigation.navigate("Home"); // navigate to the welcome screen
                } else {
                    navigation.navigate("Sign"); // navigate to the Sign up screen
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }


            setInfo('Success: Phone authentication successful'); // if OK, set the message
        }catch(error){
            setInfo(`Error : ${"i am:"+error.message}`); // show the error.
        }
    }

    return (
       <View style={styles.container}>

        <FirebaseRecaptchaVerifierModal 
            ref={recaptchaVerifier}
            firebaseConfig={firebaseConfig}
        />

        {
            info && <Text style={styles.text}>{info}</Text>
        }

        { // show the phone number input field when verification id is not set.
            !verificationId && (
                <View>
                    <Text style={styles.text}>Enter the phone number</Text>

                        <TextInput
                            placeholder='+972'
                            autoFocus
                            autoCompleteType='tel'
                            keyboardType='phone-pad'
                            textContentType='telephoneNumber'
                            onChangeText={ (phoneNumber) => setPhoneNumber(phoneNumber)}
                        />

                        <Button 
                            onPress={ () => handleSendVerificationCode()}
                            title= "Send Verification Code"
                            disabled={!phoneNumber}
                        />
                </View>
            )
            
        }

        { // if verification id exists show the confirm code input field.
            verificationId && (
                <View>
                    <Text style={styles.text}>Enter the verification code</Text>

                    <TextInput
                        editable={!!verificationId}
                        placeholder= "******"
                        onChangeText={setVerificationCode}
                    />

                    <Button
                        title= "Confirm Verification Code"
                        disabled={!verificationCode}
                        onPress = {() => handleVerifyVerificationCode()}
                    />
                </View>
            )
        }

        {attemptInvisibleVerification && <FirebaseRecaptchaBanner/>}
    </View>
    );
}


const styles = StyleSheet.create({
    text:{
        color: "#aaa"
    },
    container:{
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }
    })







    
// export default function Phonelogin() { 
//     const [phoneNumber, setPhoneNumber] = useState('');
//     const [code, setCode] = useState(''); 
//     const [verificationId, setVerificationId] = useState(null);
//     const recaptchaVerifier = useRef(null);
    
//     const SendVerification = () => {
//         const fullPhoneNumber = `+972${phoneNumber}`;
//         const phoneProvider = new PhoneAuthProvider(auth);
//         phoneProvider.verifyPhoneNumber(phoneNumber, recaptchaVerifier.current)
//         .then(setVerificationId);
//         setPhoneNumber('');
//     }
    
//     const confirmCode = () =>{
//         const credential = auth.PhoneAuthProvider.credential(verificationId, code);
//         signInWithCredential(auth,credential)
//         .then(()=>{
//             setCode('');
//         })
//         .catch((error)=>{
//             alert(error);
//         })
//         Alert.alert(
//             'login successful',
//         );
//     }
    
//     return (
//         <View style={styles.container}>
//             <FirebaseRecaptchaVerifierModal 
//                 ref={recaptchaVerifier}
//                 firebaseConfig={firebaseConfig}
//             />
//             <Text style={styles.otpText}>
//                 Login using OTP
//             </Text>
//             <TextInput 
//                 placeholder='+972'
//                 onChangeText={setPhoneNumber}
//                 keyboardType='phone-pad'
//                 autoCompleteType='tel'
//                 style={styles.textInput}
//             />
//             <TouchableOpacity style={styles.sendVerification} onPress={SendVerification}>
//                 <Text style={styles.buttonText}>
//                     Send Verification
//                 </Text>
//             </TouchableOpacity>
//             <TextInput 
//                 placeholder='Confirm Code'
//                 onChangeText={setCode}
//                 keyboardType='number-pad'
//                 style={styles.textInput}
//             />
//             <TouchableOpacity style={styles.sendCode} onPress={confirmCode}>
//                 <Text style={styles.buttonText}>
//                     confirm Verification
//                 </Text>
//             </TouchableOpacity>
//         </View>
//     );
// }


// const styles = StyleSheet.create({
//     container:{
//         flex:1,
//         backgroundColor: '#fff',
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     textInput:{
//         paddingTop:40,
//         paddingBottom:20,
//         paddingHorizontal:20,
//         fontSize:24,
//         borderBottomColor:'#fff',
//         borderBottomWidth:2,
//         marginBottom:20,
//         textAlign:'center',
//         color:'#000',
//     },
//     sendVerification:{
//         padding:20,
//         backgroundColor:'#3498',
//         borderRadius:10,
//     },
//     sendCode:{
//         padding:20,
//         backgroundColor:'#9b59',
//         borderRadius:10,
//     },
//     buttonText:{
//         textAlign:'center',
//         color:'#fff',
//         fontWeight:'bold',
//     },
//     otpText:{
//         fontSize:24,
//         fontWeight:'bold',
//         color:'#fff',
//         margin:20,
//     },
// });



    // useEffect(() => {
    //     const fetchData = async () => {
    //       try {
    //         const querySnapshot = await getDocs(
    //           query(collection(firestore, 'User'),where('Phone', '==', '0547689236'))
    //         );
    //         if (querySnapshot.docs.length > 0) {
    //             console.log('yes:', querySnapshot.docs);
    //         } else {
    //             console.log('no');
    //         }
            
    //         // querySnapshot.forEach((doc) => {
    //         //   // doc.data() is an object with the document data
    //         //   console.log('User data:', doc.data());
    //         // });
    //       } catch (error) {
    //         console.error('Error fetching data:', error);
    //       }
    //     };
    
    //     fetchData(); // Call the function to fetch data when the component mounts
    //   }, []); 
