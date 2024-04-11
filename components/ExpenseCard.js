import React, { useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import PencilSquareIcon from 'react-native-heroicons/solid/PencilSquareIcon';
import TrashIcon from 'react-native-heroicons/solid/TrashIcon';
import Snackbar from 'react-native-snackbar';
import { useNavigation } from '@react-navigation/native';
import { deleteDoc ,doc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { categoryBG } from '../theme';

export default function ExpenseCard({ item, expenseId, onDeleteSuccess }) {
    const navigation = useNavigation();
    const swipeableRef = useRef(null);

    const handleDelete = async (expenseId) => {
        try {
            Alert.alert(
                'Delete Expense',
                'Are you sure you want to delete this expense?',
                [
                    {
                        text: 'Cancel',
                        style: 'cancel',
                    },
                    {
                        text: 'Delete',
                        onPress: () => deleteExpense(expenseId),
                    },
                ]
            );
        } catch (error) {
            console.error('Error deleting expense:', error);
        }
    };

    const deleteExpense = async (expenseId) => {
        try {
            await deleteDoc(doc(db, 'expenses', expenseId));
            console.log('Expense deleted successfully!');
            Snackbar.show({
                text: 'Expense deleted successfully!',
                textColor: 'white',
                backgroundColor: 'green',
            });
            onDeleteSuccess();
        } catch (error) {
            console.error('Error deleting expense:', error);
        }
    };

    const leftSwipe = () => {
        return (
            <TouchableOpacity
                style={{ justifyContent: 'center', alignItems: 'center', height: '100%', width: '20%' }}
                onPress={() => {
                    handleDelete(item.id);
                    swipeableRef.current.close();
                }}
            >
                <TrashIcon color="red" size={30} />
            </TouchableOpacity>
        );
    };

    const rightSwipe = () => {
        return (
            <TouchableOpacity
                style={{ justifyContent: 'center', alignItems: 'center', height: '100%', width: '20%' }}
                onPress={() => {
                    navigation.navigate('EditExpense', { id: expenseId });
                    swipeableRef.current.close();
                }}
            >
                <PencilSquareIcon color="green" size={30} />
            </TouchableOpacity>
        );
    };

    return (
        <GestureHandlerRootView>
            <Swipeable
                ref={swipeableRef}
                renderLeftActions={leftSwipe}
                renderRightActions={rightSwipe}
                onSwipeableOpen={() => {
                    console.log(item.id);
                }}
            >
                <View style={{ backgroundColor: categoryBG[item.category] || categoryBG.default }} className="flex-row justify-between items-center bg-red-400 mx-0.5 my-1 p-2 px-4 rounded-2xl ">
          <View>
            <Text className="text-slate-700 font-bold text-lg">{item.title}</Text>
            <Text className="text-slate-800  text-s">{item.category}</Text>

          </View>
          <View>
            <Text className="text-gray-800 text-lg font-bold" > ₹{item.amount}</Text>

          </View>
        </View>
            </Swipeable>
        </GestureHandlerRootView>
    );
}
