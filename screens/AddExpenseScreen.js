import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Screen } from 'react-native-screens'
import ScreenWrapper from '../components/ScreenWrapper'
import BackButton from '../components/BackButton'
import { useNavigation } from '@react-navigation/native'
import { categories } from '../constants/index.js'
import { colors } from '../theme/index.js'
import { addDoc } from 'firebase/firestore'
import Snackbar from 'react-native-snackbar'
import Loading from '../components/loading.js'
import { expensesRef } from '../config/firebase.js'
import { useSelector } from 'react-redux'
import params from 'prop-types';
import props from 'prop-types';
import { PropsWithChildren } from 'react'


export default function AddExpenseScreen(props) {
let {id} =props.route.params || {};
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState(null);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
 
  const handleAddTrip = async () => {
    if (title && category && amount) {
      // navigation.navigate('TripExpense');
      setLoading(true);
      let doc = await addDoc(expensesRef, {
        title,
        category,
        amount,
        tripId: id,
       
      });
      setLoading(false);
      if(doc && doc.id){
        navigation.goBack();
      }
    } else {
      Snackbar.show({
        text: 'Title, Category and Amount are required',
        backgroundColor: 'red',
      });
    }
  }

  return (
    <ScreenWrapper>
      <View className="flex justify-between h-full mx-4">
        <View>
          <View className="flex-3 flex-row items-center justify-between mt-4  ">
            <View className=" top-0 left-0" >
              <BackButton />
            </View>
            <Text className="text-slate-800 text-2xl font-bold text-center mr-5">Add Expense</Text>
            <View></View>
          </View>
          <View className="flex-row justify-center my-3 mt-3">
            <Image source={require('../assets/images/expenseBanner.png')} className="w-60 h-60 " />
          </View>
          <View className="space-y-2 mx-2">
            <Text className="text-slate-500   text-xl font-bold" >Expense Description </Text>
            <TextInput value={title} placeholder='Ex- Flight Ticket' onChangeText={value => setTitle(value)} className="border border-gray-400 rounded-full p-2 px-5 bg-white text-slate-800" />

            <Text className="text-slate-500   text-xl font-bold"> Amount </Text>
            <TextInput value={amount} placeholder='Enter the amount in ₹' onChangeText={value => setAmount(value)} className="border border-gray-400 rounded-full p-2 px-5 bg-white text-slate-800" />

          </View>
          <View className="mx-2 space-y-2 mt-2">
            <Text className="text-slate-500   text-xl font-bold"> Category </Text>
            <View className="flex-row flex-wrap items-center gap-2 ">
              {

                categories.map(cat => {
                  let bgColor = 'bg-white';
                  if (cat.value == category) {
                    bgColor = 'bg-green-200';
                  }
                  return (
                    <TouchableOpacity onPress={() => setCategory(cat.value)} key={cat.value} className={`rounded-full ${bgColor} px-4 py-2 mr-2 mb-2`}>
                      <Text style={{ color: (colors.heading) }} >{cat.title}</Text>
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
            ) : (<TouchableOpacity onPress={handleAddTrip} className="bg-green-800 shadow-sm mx-2 p-2 rounded-full my-5">
              <Text className="text-white text-center text-lg">Add Expense</Text>
            </TouchableOpacity>)
          }

        </View>
      </View>
    </ScreenWrapper>
  )
}