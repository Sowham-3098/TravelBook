import React from 'react';
import { View, Image, Text, TouchableOpacity,Dimensions, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';

import ScreenWrapper from '../components/ScreenWrapper';
import { useNavigation } from '@react-navigation/native';

export default function WelcomeScreen() {
    const navigation = useNavigation();
    return (
        <ScreenWrapper>
            <View className="h-full flex  bg-white">
                <View className="py-8 bg-green-900 rounded-b-[40] shadow-lg ">
                    <Text className="text-green-100 text-4xl font-bold text-center">Travel Book</Text>
                </View>
                <View className="flex-row justify-start">
                    <LottieView source={require('../assets/images/welcome.json')} autoPlay loop style={{ width: "100%", height: 300 ,marginBottom:20}} />
                </View>
                <View style={styles.container} className="space-y-5 mb-20 bg-green-800  flex justify-around rounded-t-[40]">
                <Text className="text-white text-3xl font-bold text-center mb-10 my-8">Let's start your journey</Text>
                 <View className="space-y-5 mb-20">
                    <TouchableOpacity  onPress={() => navigation.navigate('SignIn')} className="bg-white p-4 mx-10 rounded-2xl shadow-lg">
                        <Text className=" text-center text-gray-800 text-2xl font-bold">
                            Sign In
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('SignUp')} className="bg-white p-4 mx-10  rounded-2xl shadow-lg">
                        <Text className="text-center text-gray-800 text-2xl font-bold">
                            Sign Up
                        </Text>
                    </TouchableOpacity></View>   
                </View>


            </View>
        </ScreenWrapper>
    );
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
   container:{
        height: height-400,
   }
});