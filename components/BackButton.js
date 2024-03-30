import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import {ChevronLeftIcon} from 'react-native-heroicons/outline'
import { useNavigation } from '@react-navigation/native'
import { NativeWindStyleSheet } from 'nativewind'
export default function BackButton() {
    const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={()=> navigation.goBack()} 
    className="bg-white rounded-full h-8 w-8">
      <ChevronLeftIcon size="30" color="black" />
    </TouchableOpacity>
  )
}

