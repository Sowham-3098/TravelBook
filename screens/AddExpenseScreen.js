import { View, Text, Image, TextInput, TouchableOpacity, ScrollView, Button, Alert } from 'react-native'
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
import { categories as initialCategories } from '../constants/index.js';
import params from 'prop-types';
import props from 'prop-types';
import { PropsWithChildren } from 'react'
import PlusIcon from 'react-native-heroicons/solid/PlusIcon';
import { Dimensions } from 'react-native'
import { Modal } from 'react-native'
import { Picker } from '@react-native-picker/picker';
import { StatusBar } from 'react-native'

const { width, height } = Dimensions.get('window');


export default function AddExpenseScreen(props) {
  let { id } = props.route.params || {};

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState(null);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryColor, setNewCategoryColor] = useState('');
  const [expenseCategories, setExpenseCategories] = useState(initialCategories);

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
      if (doc && doc.id) {
        navigation.goBack();
      }
    } else {
      Snackbar.show({
        text: 'Title, Category and Amount are required',
        backgroundColor: 'red',
      });
    }
  }

  const handleAddCategory = () => {

    if (newCategoryName) {

      const categoryExists = initialCategories.some(
        (cat) => cat.title.toLowerCase() === newCategoryName.toLowerCase()
      );

      if (!categoryExists) {
        // Add the new category to the categories constant
        initialCategories.push({
          title: newCategoryName,
          value: newCategoryName,
        });


        setModalVisible(false); // Close the modal
        setNewCategoryName(''); // Clear the input field
        setNewCategoryColor(''); // Clear the color picker
      } else {
        Snackbar.show({
          text: 'Category already exists',
          backgroundColor: 'red',
        });
      }
    } else {
      Snackbar.show({
        text: 'Please provide both category name and color',
        backgroundColor: 'red',
      });
    }
  };
  const onDismiss = () => {
    setModalVisible(false);
    setNewCategoryName('');
    setNewCategoryColor('');
  };

  // const deleteCategory = (catValue) => {
  //   // Display an alert to confirm deletion
  //   Alert.alert(
  //     'Confirm Deletion',
  //     'Are you sure you want to delete this category?',
  //     [
  //       {
  //         text: 'Cancel',
  //         style: 'cancel',
  //       },
  //       {
  //         text: 'Delete',
  //         onPress: () => {
  //           const updatedCategories = expenseCategories.filter(cat => cat.value !== catValue);
  //         // Update the state with the new array of categories
  //         setExpenseCategories(updatedCategories);
  //         // Clear the selected category if it's the one being deleted
  //         if (category === catValue) {
  //           setCategory('');
  //         }
  //         },
  //       },
  //     ],
  //     { cancelable: false }
  //   );
  // };


  return (
    <ScrollView>
      <StatusBar barStyle="light-content" backgroundColor={"#14532d"} />
      <View className="flex justify-between h-full ">
        <View>
          <View style={{ height: height * 0.13 }} className="flex-3 flex-row items-center justify-between py-6 px-5 bg-green-900 rounded-br-[50]">
            <View className=" top-0 left-0" >
              <BackButton />
            </View>
            <Text className="text-green-100 text-3xl font-bold text-center mr-5 ">Add Expense</Text>
            <View>

            </View>

          </View>
          <View className="flex-row justify-center mx-4 my-3 mt-3">
            <Image source={require('../assets/images/expenseBanner.png')} className="w-40 h-40 " />
          </View>
          <View className="space-y-2 mx-6">
            <Text className="text-green-900   text-xl font-bold" >Expense Description </Text>
            <TextInput value={title} placeholder='Ex- Flight Ticket' placeholderTextColor="gray" onChangeText={value => setTitle(value)} className="border  border-gray-400 rounded-full p-2 px-5 bg-white text-slate-800" />

            <Text className="text-green-900   text-xl font-bold"> Amount </Text>
            <TextInput value={amount} placeholder='Enter the amount in INR' placeholderTextColor="gray" onChangeText={value => setAmount(value)} className="border border-gray-400 rounded-full p-2 px-5 bg-white text-slate-800" />
          </View>
          <View className="mx-6 space-y-2 mt-3">
            <View className="flex-row justify-between items-center">
              <Text className="text-green-900   text-xl font-bold"> Category </Text>
              <TouchableOpacity
                onPress={() => setModalVisible(true)}
                className="bg-green-800 p-1 rounded-full"
              >
                <PlusIcon color="white" size={20} />
              </TouchableOpacity>
            </View>

            <View style={{ maxHeight: height * 0.3 }} className="flex-row flex-wrap items-center gap-2   ">
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
            ) : (<TouchableOpacity onPress={handleAddTrip} className="bg-green-800 shadow-sm mx-6 p-2 rounded-full my-5">
              <Text className="text-white text-center text-lg my-2">Add Expense</Text>
            </TouchableOpacity>)
          }

        </View>
      </View>
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}

      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 50 }}>
          <View
            className="bg-green-600 rounded-xl"
            style={{

              padding: 20,
              borderRadius: 20,
              width: '80%',

            }}
          >
            <TextInput
              placeholder="Enter category name"
              value={newCategoryName}
              onChangeText={(value) => setNewCategoryName(value)}
              style={{ marginBottom: 10, borderWidth: 1, borderColor: 'white', fontSize: 20, borderRadius: 5, padding: 10, backgroundColor: 'white', color: 'black' }}
            />
            {/* <Picker
              selectedValue={newCategoryColor}
              
              onValueChange={(itemValue) => setNewCategoryColor(itemValue)}
            >
              <Picker.Item label="Select color" color='black' value="" />
              <Picker.Item label="Red" color='red' value="#fb7185" />
              <Picker.Item label="Blue" color='blue' value="#67e8f9" />
              <Picker.Item label="Green" color='purple' value="#86efac" />
              <Picker.Item label="Yellow" color='yellow' value="#fde68a" />
              <Picker.Item label="Purple" color='purple' value="#a5b4fc" />
            </Picker> */}
            <View className=" flex-row justify-between mx-2">
              <TouchableOpacity className="bg-green-900 rounded-full py-2 px-2 " onPress={onDismiss}>
                <Text className="text-center text-white">Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity className="bg-green-900 rounded-full py-2 px-2  " onPress={handleAddCategory}>
                <Text className="text-center text-white">Add Category</Text>
              </TouchableOpacity>

            </View>

          </View>
        </View>
      </Modal>
    </ScrollView>
  )
}