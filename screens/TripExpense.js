import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList, ScrollView, props, Alert } from 'react-native'
import React from 'react'
import { Screen } from 'react-native-screens'
import ScreenWrapper from '../components/ScreenWrapper'
import { colors } from '../theme/index.js'
import randomImage from '../assets/images/randomImage.js'
import EmptyList from '../components/emptyList.js'
import Snackbar from 'react-native-snackbar';
import firebase from '../config/firebase.js'
import { useIsFocused, useNavigation } from '@react-navigation/native';
import BackButton from '../components/BackButton.js'
import ExpenseCard from '../components/ExpenseCard.js'
import { PropsWithChildren } from 'react'
import { db,expensesRef, tripsRef } from '../config/firebase.js'
import { getDocs, query, where, collection, doc, deleteDoc } from 'firebase/firestore'
import firestore from '@react-native-firebase/firestore'
import { useState } from 'react'
import { useEffect } from 'react'
import { Dimensions } from 'react-native'
import { TrashIcon } from 'react-native-heroicons/outline'
import { StatusBar } from 'react-native'
import app from '../config/firebase.js'



const { width, height } = Dimensions.get('window');


const items = [
    {
        id: 1,
        title: 'Ate at a restaurant',
        amount: '₹1000',
        category: 'Food',
    },
    {
        id: 2,
        title: 'Taxi ride',
        amount: '₹500',
        category: 'Transportation',

    },
    {
        id: 3,
        title: 'Hotel stay',
        amount: '₹2000',
        category: 'Accomodation',
    },
    {
        id: 4,
        title: 'Shopping',
        amount: '₹3000',
        category: 'Miscellaneous',
    },
    {
        id: 5,
        title: 'Kurkure and Pepsi',
        amount: '₹50',
        category: 'Food',

    },
    {
        id: 6,
        title: 'Train ticket',
        amount: '₹500',
        category: 'Transportation',
    }
]

export default function TripExpense(props) {
    const { id, place, country, budget } = props.route.params || {};
    const navigation = useNavigation()
    const [expenses, setExpenses] = useState([]);
    const isFocused = useIsFocused();
    const [totalExpenses, setTotalExpenses] = useState(0);
    const [foodExpenses, setFoodExpenses] = useState(0);
    const [transportationExpenses, setTransportationExpenses] = useState(0);
    const [accomodationExpenses, setAccomodationExpenses] = useState(0);
    const [miscellaneousExpenses, setMiscellaneousExpenses] = useState(0);
    const [entertainmentExpenses, setEntertainmentExpenses] = useState(0);

    const handleDelete = async () => {
        try{
            Alert.alert(
                'Delete Trip',
                'Are you sure you want to delete this trip?',
                [
                    {
                        text: 'Cancel',
                        style: 'cancel'
                    },
                    {
                        text: 'Delete',
                        onPress: () => deleteTrip()
                    }
                ]
            )
        }catch(error){
            console.error('Error deleting trip:', error);
        }
    
}

    const deleteTrip = async () => {
        try {
            // delete trip from firestore
            await deleteDoc(doc(db, "trips", id));
            console.log('Trip deleted successfully!');
            Snackbar.show({
                text: 'Trip deleted successfully!',
                textColor: 'white',
                backgroundColor: 'green',
            });
            navigation.goBack();
        } catch (error) {
            console.error('Error deleting trip:', error);
        }
    }
    
    const fetchExpenses = async () => {
        // fetch expenses from firestore
        const q = query(expensesRef, where('tripId', '==', id));
        const querySnapshot = await getDocs(q);
        let expenses = [];

        querySnapshot.forEach((doc) => {
            expenses.push({ id: doc.id, ...doc.data() });
        });
        let totalAmount = 0;
        expenses.forEach((expense) => {
            totalAmount += parseInt(expense.amount.replace('₹', ''));
            if (expense.category === 'Food') {
                setFoodExpenses(foodExpenses + parseInt(expense.amount.replace('₹', '')));
            } else if (expense.category === 'Transportation') {
                setTransportationExpenses(transportationExpenses + parseInt(expense.amount.replace('₹', '')));
            } else if (expense.category === 'Accomodation') {
                setAccomodationExpenses(accomodationExpenses + parseInt(expense.amount.replace('₹', '')));
            } else if (expense.category === 'Miscellaneous') {
                setMiscellaneousExpenses(miscellaneousExpenses + parseInt(expense.amount.replace('₹', '')));
            } else if (expense.category === 'Entertainment') {
                setEntertainmentExpenses(entertainmentExpenses + parseInt(expense.amount.replace('₹', '')));
            }
        });

        setTotalExpenses(totalAmount);
        setExpenses(expenses);

    }
   

    useEffect(() => {
        if (isFocused) {

            fetchExpenses();
        }
    }
        , [isFocused])

    if (totalExpenses == 0) {
        return (
            <ScreenWrapper style={{ height: height }} className="flex-1">
                <View className="flex px-4 bg-green-900 py-3 rounded-b-[15]">
                    <View className="flex-3 flex-row items-center justify-between  ">
                        <View className="relative top-0 left-0 mx-2" >
                            <BackButton />
                        </View>
                        <View className="mt-2">
                            <Text className="text-white text-2xl font-bold text-center">{place}</Text>
                            <Text className="text-white text-lg font-lg text-center ">{country}</Text>
                        </View>

                        <TouchableOpacity onPress={() => handleDelete()}
                            className="bg-white rounded-full h-8 w-8 p-1">
                            <TrashIcon size="25" color="black" />
                        </TouchableOpacity>
                    </View>
                    {budget ? (<View className="flex-row justify-between mt-1 bg-white py-1 px-3 rounded-xl">
                        <Text className="text-green-950 font-bold text-lg">Your Budget</Text>
                        <Text className="text-green-900 font-bold text-lg">₹ {budget}</Text>
                    </View>) : null}

                    <View className="flex-row justify-between mt-2 bg-white py-1 px-3 rounded-xl">
                        <Text className="text-green-950 font-bold text-lg">Total Expenses</Text>
                        <Text className="text-green-900 font-bold text-lg">₹ {totalExpenses}</Text>
                    </View>

                </View>

                <View className="flex-row justify-center align-center bg-white-200 mx-2   rounded-xl ">
                    <Image source={require('../assets/images/bill.png')} className="w-40 h-40 " />
                </View>
                <View className="px-4 space-y-3 ">
                    <View className="flex-row justify-between items-center">
                        <Text className="text-green-900 font-bold text-2xl">Expenses</Text>
                        <TouchableOpacity onPress={() => { navigation.navigate('AddExpense', { id, place, country, budget }) }} className="p-2 px-3 bg-green-800 border border-gray-400 rounded-full">
                            <Text className="text-white"> Add Expense</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ height: 260 }}>
                        <FlatList
                            data={expenses}

                            keyExtractor={item => item.id.toString()}
                            ListEmptyComponent={<EmptyList message={"You have not recorded any expenses yet"} />}
                            showsVerticalScrollIndicator={true}

                            className=" mx-1"
                            renderItem={({ item }) => {

                                return (
                                    <ExpenseCard item={item} expenseId={item.id} onDeleteSuccess={fetchExpenses}/>
                                )
                            }}
                        />
                    </View>
                </View>
            </ScreenWrapper>
        )
    } else if (totalExpenses > 0 && (totalExpenses <= budget || budget == null)) {

        return (
            <ScreenWrapper style={{ height: height }} className="flex-1">
                <View style={{ height: budget ? height * 0.25 : height * 0.20 }} className="flex px-4 bg-green-900 py-4 rounded-b-[15]">
                    <View className="flex-3 flex-row items-center justify-between  ">
                        <View className="relative top-0 left-0 mx-2" >
                            <BackButton />
                        </View>
                        <View className="mt-2">
                            <Text className="text-white text-2xl font-bold text-center">{place}</Text>
                            <Text className="text-white text-lg font-lg text-center ">{country}</Text>
                        </View>

                        <TouchableOpacity onPress={() => handleDelete()}
                            className="bg-white rounded-full h-8 w-8 p-1">
                            <TrashIcon size="25" color="black" />
                        </TouchableOpacity>

                    </View>

                    {budget ? (<View className="flex-row justify-between mt-1 bg-white py-1 px-3 rounded-xl">
                        <Text className="text-green-950 font-bold text-lg">Your Budget</Text>
                        <Text className="text-green-900 font-bold text-lg">₹ {budget}</Text>
                    </View>) : null}

                    <View className="flex-row justify-between mt-2 bg-white py-1 px-3 rounded-xl">
                        <Text className="text-green-950 font-bold text-lg">Total Expenses</Text>
                        <Text className="text-green-900 font-bold text-lg">₹ {totalExpenses}</Text>
                    </View>

                </View>

                <View style={{ height: height * 0.20 }} className="flex-row justify-center align-center bg-white-200 mx-2   rounded-xl ">
                    <Image source={require('../assets/images/bill.png')} className="w-40 h-40 " />
                </View>
                <View style={{ height: height * 0.1 }} className="px-4 space-y-3 ">
                    <View className="flex-row justify-between items-center">
                        <Text className="text-green-900 font-bold text-2xl">Expenses</Text>
                        <TouchableOpacity onPress={() => { navigation.navigate('AddExpense', { id, place, country, budget }) }} className="p-2 px-3 bg-green-800 border border-gray-400 rounded-full">
                            <Text className="text-white"> Add Expense</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ height: budget ? height * 0.35 : height * 0.40 }}>
                        <FlatList
                            data={expenses}

                            keyExtractor={item => item.id.toString()}
                            ListEmptyComponent={<EmptyList message={"You have not recorded any expenses yet"} />}
                            showsVerticalScrollIndicator={true}

                            className=" mx-1"
                            renderItem={({ item }) => {

                                return (
                                    <ExpenseCard item={item} expenseId={item.id} onDeleteSuccess={fetchExpenses}/>
                                )
                            }}
                        />
                    </View>

                    <TouchableOpacity
                        onPress={() => { navigation.navigate('ExpenseSummary', { id, place, country }) }} className="w-100 mx-12 px-5 py-3 bg-green-950 rounded-xl">
                        <Text className="text-white text-xl text-center ">Expense Summary</Text>
                    </TouchableOpacity>


                </View>
            </ScreenWrapper>
        )
    } else {
        return (
            <ScreenWrapper style={{ height: height }} className="flex-1">
                <View style={{ height: height * 0.30 }} className="flex px-4 bg-green-800 py-2 rounded-b-[15]">
                    <View className="flex-3 flex-row items-center justify-between  ">
                        <View className="relative top-0 left-0 mx-2" >
                            <BackButton />
                        </View>
                        <View className=" mt-2">
                            <Text className="text-white text-2xl font-bold text-center">{place}</Text>
                            <Text className="text-white text-lg font-lg text-center ">{country}</Text>
                        </View>

                        <TouchableOpacity onPress={() => handleDelete()}
                            className="bg-white rounded-full h-8 w-8 p-1">
                            <TrashIcon size="25" color="black" />
                        </TouchableOpacity>

                    </View>
                    {budget ? (<View className="flex-row justify-between mt-2 bg-white py-1 px-3 rounded-xl">
                        <Text className="text-black font-bold text-lg">Your Budget</Text>
                        <Text className="text-black font-bold text-lg">₹ {budget}</Text>
                    </View>) : null}
                    <View className="flex-row justify-between mt-2 bg-white py-1 px-3 rounded-xl">
                        <Text className="text-black font-bold text-lg">Total Expenses</Text>
                        <Text className="text-black font-bold text-lg">₹ {totalExpenses}</Text>
                    </View>
                    <View className="flex-row justify-center ">
                        <Text className="text-white font-bold text-lg my-4">Budget exceeded</Text>
                        <Text className="text-red-600 bg-white rounded-full px-2 font-bold text-lg ml-2 my-4">₹{totalExpenses - budget}</Text>

                    </View>

                </View>

                <View style={{ height: height / 5 }} className="flex-row justify-center align-center bg-white-200 mx-2   rounded-xl ">
                    <Image source={require('../assets/images/bill.png')} className="w-40 h-40 " />
                </View>
                <View style={{ height: height * 0.50 }} className="px-4 space-y-3 ">
                    <View className="flex-row justify-between items-center">
                        <Text className="text-green-900 font-bold text-2xl">Expenses</Text>
                        <TouchableOpacity onPress={() => { navigation.navigate('AddExpense', { id, place, country, budget }) }} className="p-2 px-3 bg-green-800 border border-gray-400 rounded-full">
                            <Text className="text-white"> Add Expense</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ height: height * 0.30 }}>
                        <FlatList
                            data={expenses}

                            keyExtractor={item => item.id.toString()}
                            ListEmptyComponent={<EmptyList message={"You have not recorded any expenses yet"} />}
                            showsVerticalScrollIndicator={true}

                            className=" mx-1"
                            renderItem={({ item }) => {

                                return (
                                    <ExpenseCard item={item} expenseId={item.id} onDeleteSuccess={fetchExpenses}/>
                                )
                            }}
                        />
                    </View>

                    <TouchableOpacity
                        onPress={() => { navigation.navigate('ExpenseSummary', { id, place, country }) }} className="w-100 mx-12 px-5 py-3 bg-green-950 rounded-xl">
                        <Text className="text-white text-lg text-center">Expense Summary</Text>
                    </TouchableOpacity>


                </View>
            </ScreenWrapper>
        )
    }

}