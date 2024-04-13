import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import ScreenWrapper from '../components/ScreenWrapper'
import BackButton from '../components/BackButton'
const { useNavigation } = require('@react-navigation/native');
import Snackbar from 'react-native-snackbar';
import { createUserWithEmailAndPassword,sendEmailVerification,signOut } from 'firebase/auth';
import { auth } from '../config/firebase';
import { useSelector, useDispatch } from 'react-redux';
import { setUserLoading } from '../redux/slices/user';
import Loading from '../components/loading';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { EyeIcon, EyeSlashIcon } from 'react-native-heroicons/outline';
import { StatusBar } from 'react-native';

import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');
export default function SignupScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const { userLoading } = useSelector(state => state.user);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const handleSubmit = async () => {
    if (email && password) {
      try {
        dispatch(setUserLoading(true));
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        
        await sendEmailVerification(userCredential.user);
        await signOut(auth);
        navigation.navigate('SignIn')
        Alert.alert(
          'Email verification',
          'A verification email has been sent to your email address. Please verify your email to continue',
          [
            {
              text: 'OK',
            },
          ],
        );
        
        
        
        
        dispatch(setUserLoading(false));
        
       
      } catch (e) {
        dispatch(setUserLoading(false));
        Snackbar.show({
          text: e.message,
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
      <View style={{ height: height }} className="flex justify-between">
        <View>
          <View style={{ height: height * 0.13 }} className="flex-3 flex-row items-center justify-between py-8 px-5 bg-green-900 rounded-br-[50]">
            <View className=" top-0 left-0" >
              <BackButton />
            </View>
            <Text className="text-white text-2xl font-bold text-center mr-5">Create Account</Text>
            <View>

            </View>
          </View>
          <View style={{height:height*0.30}} className="flex-row justify-center" >
            <Image source={require('../assets/images/signup.png')} className="w-60 h-60" />
          </View>
          <View style={{ height: height * 0.70 }} className="bg-green-900  rounded-tl-[50]">
            <View className="space-y-2 mx-6 mt-6">
              <Text className="text-white   text-xl  ml-2 font-bold" >Name</Text>
              <TextInput placeholder='Enter name' placeholderTextColor={"gray"} className="border border-gray-400 rounded-3xl p-2 px-5 bg-white text-slate-800 text-xl" />
              <Text className="text-white   text-xl ml-2 font-bold" >Email</Text>
              <TextInput value={email} placeholder='Enter email' placeholderTextColor={"gray"} onChangeText={value => setEmail(value)} className="border border-gray-400 rounded-3xl p-2 px-5 bg-white text-slate-800 text-xl" />
              <Text className="text-white   text-xl ml-2 font-bold"> Password </Text>
              <View className="flex-row justify-center items-center bg-white rounded-3xl"><TextInput style={{ width: width - 110, marginLeft: 20 }} placeholder='Enter password' placeholderTextColor={"gray"} value={password} secureTextEntry={!showPassword} onChangeText={value => setPassword(value)} className=" rounded-3xl p-2 px-5  text-slate-800 text-xl" />
                <TouchableOpacity className="mx-4 mr-6 p-2" onPress={toggleShowPassword}>{showPassword ? <EyeSlashIcon size="30" color="black" /> : <EyeIcon size="30" color="black" />}</TouchableOpacity>
              </View>

              <View>
                {
                  userLoading ? (
                    <Loading />
                  ) : (<TouchableOpacity onPress={handleSubmit} className="bg-lime-300 shadow-sm  mt-5  p-4 rounded-full ">
                    <Text className="text-slate-800 font-bold text-center text-xl">Sign Up</Text>
                  </TouchableOpacity>)
                }

              </View>
            </View>

          </View>

        </View>

      </View>

    </KeyboardAwareScrollView>
  )
}

