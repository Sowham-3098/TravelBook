import React from 'react';
import { View, Image, Text, TouchableOpacity, Dimensions, StyleSheet, StatusBar } from 'react-native';
import LottieView from 'lottie-react-native';

import ScreenWrapper from '../components/ScreenWrapper';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

let { width, height } = Dimensions.get('window');
export default function WelcomeScreen() {
    const navigation = useNavigation();
    return (
        <SafeAreaView>
            <StatusBar barStyle="light-content" backgroundColor="#14532d" />
            <View style={{ height: height }} className="flex bg-white">
                <View style={{ height: height * 0.16 }} >
                    <Image source={require('../assets/images/bannertitle.png')} style={{ width: width * 0.8, height: height * 0.2, marginHorizontal: width * 0.10 }} />
                </View>
                <View style={{ marginHorizontal: width * 0.1, marginBottom: height * 0.08 }} className="space-y-2">
                    <Text className="text-green-900 text-2xl font-medium text-center">Maintain Your Expenses</Text>

                </View>
                <View style={{ height: height * 0.35 }} className="flex-row justify-start">
                    <LottieView source={require('../assets/images/welcome.json')} autoPlay loop style={{ width: "100%", height: height * 0.35 }} />
                </View>


                <View style={{ height: height * 0.45 }} className=" mb-20 bg-green-800  flex justify-around rounded-t-[40]">

                    <View style={{ marginBottom: height * 0.1, marginHorizontal: width * 0.1 }} className="space-y-5">
                        <TouchableOpacity onPress={() => navigation.navigate('SignIn')} className="bg-lime-300 p-4  rounded-3xl shadow-lg">
                            <Text className=" text-center text-gray-800 text-2xl font-bold">
                                Sign In
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('SignUp')} className="bg-lime-300 p-4   rounded-3xl shadow-lg">
                            <Text className="text-center text-gray-800 text-2xl font-bold">
                                Create Account
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>


            </View>
        </SafeAreaView>
    );
}



const styles = StyleSheet.create({
    container: {
        height: height - 400,
    }
});