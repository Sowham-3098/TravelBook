import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import { useSelector } from 'react-redux';
import AddTripScreen from '../screens/AddTripScreen';
import AddExpenseScreen from '../screens/AddExpenseScreen';
import TripExpense from '../screens/TripExpense';
import WelcomeScreen from '../screens/WelcomeScreen';
import SignupScreen from '../screens/SignupScreen';
import SigninScreen from '../screens/SigninScreen';
import EditExpense from '../screens/EditExpense';
import { store } from '../redux/store';
import {user} from '../redux/slices/user'
import { onAuthStateChanged } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/slices/user';
import { auth } from '../config/firebase';
import ExpenseSummary from '../screens/ExpenseSummary';

const Stack = createNativeStackNavigator();
export default function AppNavigation() {
  const { user } = useSelector(state => state.user)

  const dispatch = useDispatch();

  onAuthStateChanged(auth, u => {
    console.log('got user: ', u)
    dispatch(setUser(u))
  })
  if (user) {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Home'>

          <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />

          <Stack.Screen name="AddTrip" component={AddTripScreen} options={{ headerShown: false }} />
          <Stack.Screen name="AddExpense" component={AddExpenseScreen} options={{ headerShown: false }} />
          <Stack.Screen name="TripExpense" component={TripExpense} options={{ headerShown: false }} />
          <Stack.Screen  name="EditExpense" component={EditExpense} options={{ headerShown: false }} />
          <Stack.Screen name="ExpenseSummary" component={ExpenseSummary} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Welcome'>

          <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
          <Stack.Screen name="SignIn" component={SigninScreen} options={{ headerShown: false, presentation: 'modal' }} />
          <Stack.Screen name="SignUp" component={SignupScreen} options={{ headerShown: false, presentation: 'modal' }} />
        
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

}