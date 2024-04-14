import { View, Text, Image, } from 'react-native'
import React from 'react'

export default function EmptyList({message}) {
  return (
    <View className="flex items-center my-10">
        <Image source={require('../assets/images/empty.png')} className="w-60 h-60 shadowOffset: 10" />
      <Text className="text-green-900 font-medium">{message || 'data not found'}</Text>
    </View>
  )
}