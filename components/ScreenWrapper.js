import { View, Text, StatusBar, Platform } from 'react-native'
import React from 'react'

export default function ScreenWrapper( {children} ) {
    let StatusBarHeight = StatusBar.currentHeight? StatusBar.currentHeight:Platform.OS == 'ios'? 20:0;
  return (
    <View style={{paddingTop:0}}>
    {
        children
    }
    </View>
  )
}