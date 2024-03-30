import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import ScreenWrapper from '../components/ScreenWrapper'
import BackButton from '../components/BackButton'
const { useNavigation } = require('@react-navigation/native');
import Snackbar from 'react-native-snackbar';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';
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
  const handleSubmit = async () => {
    if (email && password) {
      // navigation.navigate('Home');
      try {
        dispatch(setUserLoading(true));
        await signInWithEmailAndPassword(auth, email, password);
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
  }
  return (
    <KeyboardAwareScrollView>
      <View className="flex justify-between h-full ">
        <View>
          <View className="flex-3 flex-row items-center justify-between py-6 px-5 bg-green-900 rounded-br-[50]">
            <View className=" top-0 left-0" >
              <BackButton />
            </View>
            <Text className="text-green-100 text-3xl font-bold text-center mr-5 ">Sign In</Text>
            <View>

            </View>
          </View>
          <View className="flex-row justify-center my-3 mt-3" >
            <Image source={require('../assets/images/login.png')} className="w-80 h-80" />
          </View>
          <View>

          </View>
          <View style={{ height: height - 425 }} className="bg-green-800 rounded-tl-[40]">
            <View className="space-y-3 mx-6 mt-7">
              <Text className="text-white   text-xl font-bold" >Email</Text>
              <TextInput value={email} onChangeText={value => setEmail(value)} className="border border-green-600 rounded-2xl p-2 px-5 bg-white text-slate-800 text-xl" />
              <Text className="text-white   text-xl font-bold"> Password </Text>
              <View className="flex-row justify-center items-center"><TextInput style={{ width: width - 110, marginLeft: 20 }} value={password} secureTextEntry={!showPassword} onChangeText={value => setPassword(value)} className="border border-gray-400 rounded-2xl p-2 px-5 bg-white text-slate-800" />
                <TouchableOpacity className="mx-4 bg-white rounded-xl p-2" onPress={toggleShowPassword}>{showPassword ? <EyeSlashIcon size="30" color="black" /> : <EyeIcon size="30" color="black" />}</TouchableOpacity></View>

            <TouchableOpacity className="flex-row justify-end ">
              <Text className="text-white  text-sm font-bold text-right">Forgot Password?</Text>
            </TouchableOpacity>
          </View>
          <View>
            {
              userLoading ? (
                < Loading />
              ) : (<TouchableOpacity onPress={handleSubmit} className="bg-green-400 shadow-sm  p-4 rounded-full mx-6 my-5">
                <Text className="text-slate-900 text-center font-bold text-2xl">Sign In</Text>
              </TouchableOpacity>)
            }

          </View>
        </View>
</View>
      </View>



    </KeyboardAwareScrollView>
  )
}

