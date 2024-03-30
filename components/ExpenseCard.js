import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { categoryBG } from '../theme'

export default function ExpenseCard({item}) {
  return (
    <View style={{backgroundColor: categoryBG[item.category]}} className="flex-row justify-between items-center bg-red-400 mx-0.5 my-1 p-2 px-4 rounded-2xl ">
      <View>
        <Text className="text-slate-700 font-bold text-lg">{item.title}</Text>
        <Text className="text-slate-800  text-s">{item.category}</Text>  
        
      </View>
      <View>
        <Text className="text-gray-800 text-lg font-bold" > ₹{item.amount}</Text>
        
      </View>
    </View>
  )
}

