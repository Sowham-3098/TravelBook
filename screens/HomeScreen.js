import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Screen } from 'react-native-screens'
import ScreenWrapper from '../components/ScreenWrapper'
import { colors } from '../theme/index.js'
import randomImage from '../assets/images/randomImage.js'
import EmptyList from '../components/emptyList.js'
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { auth } from '../config/firebase';
import { signOut } from 'firebase/auth';
import { useSelector } from 'react-redux'
import { query } from 'firebase/firestore'
import { tripsRef } from '../config/firebase'
import { getDocs, where } from 'firebase/firestore'
import { Dimensions } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
const { width, height } = Dimensions.get('window');
const items = [
    {
        id: 1,
        place: 'Gujarat',
        country: 'India',
    },
    {
        id: 2,
        place: 'Kerala',
        country: 'India',

    },
    {
        id: 3,
        place: 'Goa',
        country: 'India',
    },
    {
        id: 4,

        place: 'Rajasthan',
        country: 'India',
    },
    {
        id: 5,
        place: 'Gujarat',
        country: 'India',

    },
    {
        id: 6,
        place: 'Kerala',
        country: 'India',
    }
]
export default function HomeScreen() {
    const { user } = useSelector(state => state.user);
    const navigation = useNavigation()
    const [trips, setTrips] = useState([]);
    const isFocused = useIsFocused();
    const handleLogout = async () => {
        await signOut(auth);
    }
    const fetchTrips = async () => {
        // fetch trips from firestore
        const q = query(tripsRef, where('userId', '==', user.uid));
        const querySnapshot = await getDocs(q);

        let data = [];
        querySnapshot.forEach((doc) => {
            data.push({...doc.data(),id: doc.id});
        });
        setTrips(data);
    }
    useEffect(() => {
        if (isFocused){
            fetchTrips();
        }
        
    }, [isFocused])
    return (
        <SafeAreaView style={{height:height}} className="flex-1">
            <View className="flex-row justify-between items-center px-4 py-4 mb-4 bg-green-900">
                <Text className="text-white font-bold text-3xl shadow-sm">Travel Book</Text>
                <TouchableOpacity onPress={handleLogout} className="p-2 px-3 bg-white border-green-100 rounded-full">
                    <Text className="text-green-900 font-bold">Log out</Text>
                </TouchableOpacity>
            </View>

            <View className="flex-row justify-center align-center bg-gray-100 mx-5  mb-5 rounded-xl ">
                <Image source={require('../assets/images/banner.png')} className="w-80 h-60 " />
            </View>
            <View style={{height:height*0.7}}  className="px-4 space-y-3 ">
                <View className="flex-row justify-between items-center mb-2">
                    <Text className="text-slate-800 font-bold text-2xl">Recent Trips</Text>
                    <TouchableOpacity onPress={() => { navigation.navigate('AddTrip') }} className="p-2 px-3 bg-green-800 border border-gray-400 rounded-full">
                        <Text className="text-white"> Add Trip</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ height: height*0.4 }}>
                    <FlatList
                        data={trips}
                        numColumns={3}
                        keyExtractor={item => item.id}
                        ListEmptyComponent={<EmptyList message={"You have not recorded any trips yet"} />}
                        showsVerticalScrollIndicator={true}
                        columnWrapperStyle={{ justifyContent: 'space-between' }}
                        style={{ marginHorizontal:width*0.01 } }
                        renderItem={({ item }) => {
                            return (
                                <TouchableOpacity onPress={() => navigation.navigate('TripExpense', { ...item })} className="bg-white p-1.5 rounded-xl mb-3  shadow-sm ">
                                    <Image source={randomImage()} className="w-20 h-20 px-4 " />
                                    <Text className="text-slate-800 font-bold ml-2">{item.place}</Text>
                                    <Text className="text-slate-800 font-xs mb-2 ml-2">{item.country}</Text>
                                </TouchableOpacity>
                            )
                        }}
                    />
                </View>


            </View>
        </SafeAreaView>
    )
}