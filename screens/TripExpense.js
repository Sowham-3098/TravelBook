import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList, ScrollView, props } from 'react-native'
import React from 'react'
import { Screen } from 'react-native-screens'
import ScreenWrapper from '../components/ScreenWrapper'
import { colors } from '../theme/index.js'
import randomImage from '../assets/images/randomImage.js'
import EmptyList from '../components/emptyList.js'
import { useIsFocused, useNavigation } from '@react-navigation/native';
import BackButton from '../components/BackButton.js'
import ExpenseCard from '../components/ExpenseCard.js'
import { PropsWithChildren } from 'react'
import { expensesRef } from '../config/firebase.js'
import { getDocs, query, where } from 'firebase/firestore'
import { useState } from 'react'
import { useEffect } from 'react'


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
    const { id, place, country } = props.route.params || {};
    const navigation = useNavigation()
    const [expenses, setExpenses] = useState([]);
    const isFocused = useIsFocused();
    const [totalExpenses, setTotalExpenses] = useState(0);
    const [foodExpenses, setFoodExpenses] = useState(0);
    const [transportationExpenses, setTransportationExpenses] = useState(0);
    const [accomodationExpenses, setAccomodationExpenses] = useState(0);
    const [miscellaneousExpenses, setMiscellaneousExpenses] = useState(0);
    const [entertainmentExpenses, setEntertainmentExpenses] = useState(0);
    const fetchExpenses = async () => {
        // fetch expenses from firestore
        const q = query(expensesRef, where('tripId', '==', id));
        const querySnapshot = await getDocs(q);
        let expenses = [];

        querySnapshot.forEach((doc) => {
            expenses.push(doc.data());
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
    return (
        <ScreenWrapper className="flex-1">
            <View className="flex px-4 bg-green-900 py-4 rounded-b-[15]">
                <View className="flex-3 flex-row items-center justify-between  ">
                    <View className="relative top-0 left-0 mx-2" >
                        <BackButton />
                    </View>
                    <View className="mr-10 mt-2">
                        <Text className="text-white text-2xl font-bold text-center">{place}</Text>
                        <Text className="text-white text-lg font-lg text-center ">{country}</Text>
                    </View>
                    <View>

                    </View>

                </View>
                <View className="flex-row justify-between mt-5 bg-lime-300 py-2 px-3 rounded-xl">
                    <Text className="text-green-950 font-bold text-xl">Total Expenses</Text>
                    <Text className="text-green-900 font-bold text-xl">₹ {totalExpenses}</Text>
                </View>

            </View>

            <View className="flex-row justify-center align-center bg-white-200 mx-2   rounded-xl ">
                <Image source={require('../assets/images/5.png')} className="w-60 h-60 " />
            </View>
            <View className="px-4 space-y-3 ">
                <View className="flex-row justify-between items-center">
                    <Text className="text-green-900 font-bold text-2xl">Expenses</Text>
                    <TouchableOpacity onPress={() => { navigation.navigate('AddExpense', { id, place, country }) }} className="p-2 px-3 bg-green-800 border border-gray-400 rounded-full">
                        <Text className="text-white"> Add Expense</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ height: 260 }}>
                    <FlatList
                        data={expenses}

                        keyExtractor={item => item.id}
                        ListEmptyComponent={<EmptyList message={"You have not recorded any expenses yet"} />}
                        showsVerticalScrollIndicator={true}

                        className=" mx-1"
                        renderItem={({ item }) => {

                            return (
                                <ExpenseCard item={item} />
                            )
                        }}
                    />
                </View>

                <TouchableOpacity onPress={() => {navigation.navigate('ExpenseSummary',{id,place,country})}} className="w-100 mx-12 px-5 py-3 bg-green-950 rounded-xl">
                    <Text className="text-white font-bold text-xl ">Check Expense Summary</Text>
                </TouchableOpacity>



            </View>
        </ScreenWrapper>
    )
}