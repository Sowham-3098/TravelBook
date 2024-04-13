import { View, Text, Image, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { categories } from '../constants/index.js'
import { addDoc, updateDoc, doc ,getDoc} from 'firebase/firestore'
import Snackbar from 'react-native-snackbar'
import Loading from '../components/loading.js'
import { expensesRef } from '../config/firebase.js'
import BackButton from '../components/BackButton'
import { Dimensions } from 'react-native'
import { StatusBar } from 'react-native'

const { width, height } = Dimensions.get('window');
   
export default function EditExpense(props) { 
    const { id } = props.route.params || {}; 
   
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [amount, setAmount] = useState('');
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();

    useEffect(() => {
        
        const fetchExpenseDetails = async () => {
            try {
                setLoading(true);
               
                const expenseSnapshot = await getDoc(doc(expensesRef, id));
                if (expenseSnapshot.exists()) {
                    const expenseData = expenseSnapshot.data();
                    // Update state variables with fetched data
                    setTitle(expenseData.title);
                    setCategory(expenseData.category);
                    setAmount(expenseData.amount);
                } else {
                    // Handle case when expense document doesn't exist
                    Snackbar.show({
                        text: 'Expense not found',
                        backgroundColor: 'red',
                    });
                }
                setLoading(false);
            } catch (error) {
                setLoading(false);
                console.error('Error fetching expense details:', error);
                Snackbar.show({
                    text: 'Error fetching expense details',
                    backgroundColor: 'red',
                });
            }
        };
        fetchExpenseDetails();
    }, [id]); 
    

    const handleUpdateExpense = async () => {
        if (title && category && amount) {
            setLoading(true);
            try {
                const expenseRef = doc(expensesRef, id); // Reference to the expense document using the id
                await updateDoc(expenseRef, { // Update the expense document with new data
                    title,
                    category,
                    amount,
                });
                setLoading(false);
                navigation.goBack(); // Navigate back after updating the expense
            } catch (error) {
                setLoading(false);
                Snackbar.show({
                    text: error.message,
                    backgroundColor: 'red',
                });
            }
        } else {
            Snackbar.show({
                text: 'Title, Category, and Amount are required',
                backgroundColor: 'red',
            });
        }
    };

    return (
        <ScrollView>
            <StatusBar barStyle="light-content" backgroundColor={"#14532d"} />
            <View className="flex justify-between h-full ">
                <View>
                    <View style={{height:height*0.13}} className="flex-3 flex-row items-center justify-between py-6 px-5 bg-green-900 rounded-br-[50]">
                        <View className=" top-0 left-0" >
                            <BackButton />
                        </View>
                        <Text className="text-green-100 text-3xl font-bold text-center mr-5 ">Edit Expense</Text>
                        <View>
                        </View>
                    </View>
                    <View className="flex-row justify-center mx-4 my-3 mt-3">
                        <Image source={require('../assets/images/expenseBanner.png')} className="w-40 h-40 " />
                    </View>
                    <View className="space-y-2 mx-6">
                        <Text className="text-green-900   text-xl font-bold" >Expense Description </Text>
                        <TextInput value={title}  onChangeText={value => setTitle(value)} className="border  border-gray-400 rounded-full p-2 px-5 bg-white text-slate-800" />

                        <Text className="text-green-900   text-xl font-bold"> Amount </Text>
                        <TextInput value={amount}  onChangeText={value => setAmount(value)} className="border border-gray-400 rounded-full p-2 px-5 bg-white text-slate-800" />
                    </View>
                    <View className="mx-6 space-y-2 mt-2">
                        <Text className="text-green-900   text-xl font-bold"> Category </Text>
                        <View className="flex-row flex-wrap items-center gap-2 ">
                            {
                                categories.map(cat => {
                                    let bgColor = 'bg-white';
                                    if (cat.value == category) {
                                        bgColor = 'bg-green-200';
                                    }
                                    return (
                                        <TouchableOpacity onPress={() => setCategory(cat.value)} key={cat.value} className={`rounded-full ${bgColor} px-4 py-2 mr-2 mb-2`}>
                                            <Text className="text-green-950" >{cat.title}</Text>
                                        </TouchableOpacity>
                                    )
                                })
                            }
                        </View>
                    </View>
                </View>
                <View>
                    {
                        loading ? (
                            <Loading />
                        ) : (<TouchableOpacity onPress={handleUpdateExpense} className="bg-green-800 shadow-sm mx-6 p-2 rounded-full my-5">
                            <Text className="text-white text-center py-1 text-lg">Update Expense</Text>
                        </TouchableOpacity>)
                    }
                </View>
            </View>
        </ScrollView>
    )
}
