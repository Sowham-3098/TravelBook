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
import LottieView from 'lottie-react-native'
import { Dimensions } from 'react-native'
const { width, height } = Dimensions.get('window');


export default function ExpenseSummary(props) {
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
                setFoodExpenses((prevFoodExpenses) => prevFoodExpenses + parseInt(expense.amount.replace('₹', '')));
            } else if (expense.category === 'Transportation') {
                setTransportationExpenses((prevTransportationExpenses) => prevTransportationExpenses + parseInt(expense.amount.replace('₹', '')));
            } else if (expense.category === 'Accomodation') {
                setAccomodationExpenses((prevAccomodationExpenses) => prevAccomodationExpenses + parseInt(expense.amount.replace('₹', '')));
            } else if (expense.category === 'Miscellaneous') {
                setMiscellaneousExpenses((prevMiscellaneousExpenses) => prevMiscellaneousExpenses + parseInt(expense.amount.replace('₹', '')));
            } else if (expense.category === 'Entertainment') {
                setEntertainmentExpenses((prevEntertainmentExpenses) => prevEntertainmentExpenses + parseInt(expense.amount.replace('₹', '')));
            }
        });

        setTotalExpenses(totalAmount);
        setExpenses(expenses);
    }
    useEffect(() => {
        fetchExpenses();
    }, []);
       
    return (
        <ScreenWrapper className="flex-1">
            <View className="flex px-4 bg-green-900 py-4 rounded-b-[15]">
                <View className="flex-3 flex-row items-center justify-between  ">
                    <View className="relative top-0 left-0 mx-2" >
                        <BackButton />
                    </View>
                    <View className="mr-10 mt-2">
                        <Text className="text-white text-2xl font-bold text-center">{place}</Text>
                    
                    </View>
                    <View>

                    </View>

                </View>
                <View className="flex-row justify-between mt-5 bg-lime-300 py-2 px-3 rounded-xl">
                    <Text className="text-green-950 font-bold text-xl">Total Expenses</Text>
                    <Text className="text-green-900 font-bold text-xl">₹ {totalExpenses}</Text>
                </View>

            </View>

            <View className="flex-row justify-center align-center bg-white-200    rounded-xl ">
                <Image source={require('../assets/images/expense.png')} className="w-80 h-60 " />
            </View>
            <View className=" space-y-2 ">
                <View className="px-4 flex-row justify-around items-center ">
                    <Text className="text-green-900 font-bold text-2xl">Expense Summary</Text>
                    
                </View>
                <View style={{height: height/2}}className="bg-green-800 p-5 rounded-t-[30]">
                    <View  className="flex-row  justify-between bg-white px-4 py-2 my-2 rounded-full">
                        <Text className="text-green-900 font-bold text-xl">No of Expenses</Text>
                        <Text className="text-green-900 font-bold text-xl">{expenses.length}</Text>
                    </View>
                    <View className="flex-row  justify-between bg-white px-4 py-2 my-2 rounded-full">
                        <Text className="text-red-900 font-bold text-xl">Food 🍰</Text>
                        <Text className="text-red-900 font-bold text-xl">₹ {foodExpenses}</Text>
                    </View>
                    <View className="flex-row  justify-between bg-white px-4 py-2 my-2 rounded-full">
                        <Text className="text-yellow-500 font-bold text-xl">Transportation 🚌</Text>
                        <Text className="text-yellow-500 font-bold text-xl">₹ {transportationExpenses}</Text>
                        </View>
                    <View className="flex-row  justify-between bg-white px-4 py-2 my-2 rounded-full">
                        <Text className="text-blue-900 font-bold text-xl">Accomodation 🏠</Text>
                        <Text className="text-blue-900 font-bold text-xl">₹ {accomodationExpenses}</Text>
                    </View>
                    <View className="flex-row  justify-between bg-white px-4 py-2 my-2 rounded-full">
                        <Text className="text-emerald-900 font-bold text-xl">Entertainment 🍿</Text>
                        <Text className="text-emerald-900 font-bold text-xl">₹ {entertainmentExpenses}</Text>
                    </View>
                    <View className="flex-row  justify-between bg-white px-4 py-2 my-2 rounded-full">
                        <Text className="text-slate-900 font-bold text-xl">Miscellaneous</Text>
                        <Text className="text-slate-900 font-bold text-xl">₹ {miscellaneousExpenses}</Text>
                    </View>
                    
                </View>



            </View>
        </ScreenWrapper>
    )
}