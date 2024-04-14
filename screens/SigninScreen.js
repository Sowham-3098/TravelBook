import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Alert, StatusBar } from 'react-native'
import React, { useState } from 'react'
import ScreenWrapper from '../components/ScreenWrapper'
import BackButton from '../components/BackButton'
const { useNavigation } = require('@react-navigation/native');
import Snackbar from 'react-native-snackbar';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword,signOut } from 'firebase/auth';
import { auth } from '../config/firebase';
import { sendPasswordResetEmail } from 'firebase/auth';

import { useSelector, useDispatch } from 'react-redux';
import { setUserLoading } from '../redux/slices/user';
import Loading from '../components/loading';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Dimensions } from 'react-native';
import { EyeIcon, EyeSlashIcon } from 'react-native-heroicons/outline';
const { width, height } = Dimensions.get('window');
export default function SigninScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { userLoading } = useSelector(state => state.user);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  
  const ForgotPassword = async () => {
    if (email) {
      try {
        await sendPasswordResetEmail(auth, email);
        Snackbar.show({
          text: 'Password reset email sent',
          backgroundColor: 'green',
        });
      } catch (e) {
        Snackbar.show({
          text: e.message,
          backgroundColor: 'red',
        });
      }
    } else {
      Snackbar.show({
        text: 'Please enter your email',
        backgroundColor: 'red',
      });
    }
  }
  const handleSubmit = async () => {
    if (email && password) {
      try {
        dispatch(setUserLoading(true));
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        
        // Check if email is verified
        if (!userCredential.user.emailVerified) {
          await signOut(auth);
          navigation.navigate('SignIn');
          dispatch(setUserLoading(false));
          Snackbar.show({
            text: 'Please verify your email before logging in',
            backgroundColor: 'red',
          });

          return; // Exit the function if email is not verified
        }else{
          navigation.navigate('Home');
        }
        
        // Proceed with logging in
        dispatch(setUserLoading(false));
        
      } catch (e) {
        dispatch(setUserLoading(false));
        Snackbar.show({
          text: 'Incorrect password or email',
          backgroundColor: 'red',
        });
      }
    } else {
      Snackbar.show({
        text: 'Please fill in all the fields',
        backgroundColor: 'red',
      });
    }
  };
  return (
    <KeyboardAwareScrollView>
      <StatusBar barStyle="light-content" backgroundColor="#14532d" />
      <View style={{height: height}} className="flex justify-between">
       
          <View style={{height:height*0.13}} className="flex-3 flex-row items-center justify-between py-6 px-5 bg-green-900 rounded-br-[50]">
            <View className=" top-0 left-0" >
              <BackButton />
            </View>
            <Text className="text-green-100 text-3xl font-bold text-center mr-5 ">Sign In</Text>
            <View>

            </View>
          </View>
          <View style={{height:height*0.35}} className="flex-row justify-center " >
            <Image style={{ height: height*0.4 , width:width}}source={require('../assets/images/login.png')} />
          </View>
          <View>

          </View>
          <View style={{ height: height*0.60}} className="bg-green-800 rounded-tl-[40]">
            <View className="space-y-2 mx-6 mt-7">
              <Text className="text-white  ml-2 text-xl font-bold" >Email</Text>
              <TextInput value={email} placeholder='Enter email' placeholderTextColor={"gray"} onChangeText={value => setEmail(value)} className="border border-green-600 rounded-3xl p-2 px-5 bg-white text-slate-800 text-xl" />
              <Text className="text-white  ml-2 text-xl font-bold"> Password </Text>
              <View className="flex-row justify-center items-center bg-white rounded-3xl"><TextInput style={{ width: width - 110, marginLeft: 20 }} placeholder='Enter password'  placeholderTextColor={"gray"} value={password} secureTextEntry={!showPassword} onChangeText={value => setPassword(value)} className=" rounded-3xl p-2 px-5 text-xl text-slate-800" />
                <TouchableOpacity className="mx-4 mr-6 rounded-2xl p-2" onPress={toggleShowPassword}>{showPassword ? <EyeSlashIcon size="30" color="black" /> : <EyeIcon size="30" color="black" />}</TouchableOpacity></View>

              <TouchableOpacity className="flex-row justify-end " onPress={()=> {ForgotPassword()}}>
                <Text className="text-white  text-sm font-bold text-right">Forgot Password?</Text>
              </TouchableOpacity>
            </View>
            <View style={{marginBottom:height*0.15}}>
              {
                userLoading ? (
                  < Loading />
                ) : (<TouchableOpacity onPress={handleSubmit} className="bg-lime-300 shadow-sm  p-4 rounded-full mx-6 my-5">
                  <Text className="text-slate-900 text-center font-bold text-2xl">Sign In</Text>
                </TouchableOpacity>)
              }

            </View>
          </View>
        
      </View>



    </KeyboardAwareScrollView>
  )
}

