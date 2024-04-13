import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native'
import React,{useState} from 'react'
import { Screen } from 'react-native-screens'
import ScreenWrapper from '../components/ScreenWrapper'
import BackButton from '../components/BackButton'
import { useNavigation } from '@react-navigation/native'
import Loading from '../components/loading.js'
import Snackbar from 'react-native-snackbar'
import { tripsRef } from '../config/firebase.js'
import { useSelector } from 'react-redux'
import { addDoc } from 'firebase/firestore'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Dimensions } from 'react-native'
const { width, height } = Dimensions.get('window');
import { StatusBar } from 'react-native'
export default function AddTripScreen() {

  const [place, setPlace] =useState('');
  const [country, setCountry] =useState('');
  const [budget, setBudget] =useState('');
  const [loading, setLoading] = useState(false);
  const {user} = useSelector(state => state.user);
const navigation = useNavigation();
  const handleAddTrip = async() => {
      if(place && country){
          // navigation.navigate('Home');
          setLoading(true);
          let doc = await addDoc(tripsRef, {
              place,
              country,
              budget,
              userId: user.uid,
          });
          setLoading(false);
          if(doc && doc.id){
              navigation.goBack();
          }
      }else{
          Snackbar.show({
              text: 'Place and Country are required',
              backgroundColor: 'red',
          });
      } 
      }

  return (
    <KeyboardAwareScrollView>
      <View className="flex justify-between h-full ">
        <View>
        <View style={{height:height*0.13}} className="flex-3 flex-row items-center justify-between py-6 px-5 bg-green-900 rounded-br-[50]">
            <View className=" top-0 left-0" >
              <BackButton />
            </View>
            <Text className="text-green-100 text-3xl font-bold text-center mr-5 ">Add Trip</Text>
            <View>

            </View>
          </View>
          <View className="flex-row justify-center my-3 mt-3 mx-4" >
            <Image source={require('../assets/images/4.png')} className="w-60 h-60 " />
          </View>
          <View className="space-y-3 mx-6">
            <Text className="text-green-900 ml-2  text-xl font-bold" >Where on Earth? *</Text>
            <TextInput value={place} onChangeText={value=>setPlace(value)} placeholder="Enter the place" placeholderTextColor={"gray"} className="border border-green-900 rounded-full p-2 px-5 text-lg bg-white text-slate-800  " />
            <Text className="text-green-900 ml-2  text-xl font-bold"> Which Country? * </Text>
            <TextInput value={country} onChangeText={value=>setCountry(value)} placeholder="Enter the country" placeholderTextColor={"gray"} className="border border-green-900 rounded-full p-2 px-5 text-lg bg-white text-slate-800" />
            <Text className="text-green-900  ml-2 text-xl font-bold" >Estimated Budget </Text>
            <TextInput value={budget} onChangeText={value=>setBudget(value)} placeholder="Enter amount in INR" placeholderTextColor={"gray"} className="border border-green-900 rounded-full p-2 px-5 text-lg bg-white text-slate-800" />
          </View>
        </View>


        <View>
          {
              loading?(
                <Loading />
              ):(
                <TouchableOpacity onPress={handleAddTrip}  className="bg-green-800 shadow-sm mx-6 p-2 rounded-full my-5">
                <Text className="text-white text-center font-bold text-lg my-2">Add Trip</Text>
            </TouchableOpacity>
              )
          }
             
        </View>
      </View>
    </KeyboardAwareScrollView>
  )
}