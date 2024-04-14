import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector, useDispatch } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { setUser } from '../redux/slices/user';
import { auth } from '../config/firebase';
import HomeScreen from '../screens/HomeScreen';
import AddTripScreen from '../screens/AddTripScreen';
import AddExpenseScreen from '../screens/AddExpenseScreen';
import TripExpense from '../screens/TripExpense';
import WelcomeScreen from '../screens/WelcomeScreen';
import SignupScreen from '../screens/SignupScreen';
import SigninScreen from '../screens/SigninScreen';
import EditExpense from '../screens/EditExpense';
import ExpenseSummary from '../screens/ExpenseSummary';

const Stack = createNativeStackNavigator();

export default function AppNavigation() {
  const { user } = useSelector(state => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      console.log('got user:', user);
      if (user) {
        dispatch(setUser(user));
      } else {
        dispatch(setUser(null));
      }
    });

    // Clean up subscription on unmount
    return unsubscribe;
  }, [dispatch]);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={user ? 'Home' : 'Welcome'}>
        {user ? (
          <>
            <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
            <Stack.Screen name="AddTrip" component={AddTripScreen} options={{ headerShown: false }} />
            <Stack.Screen name="AddExpense" component={AddExpenseScreen} options={{ headerShown: false }} />
            <Stack.Screen name="TripExpense" component={TripExpense} options={{ headerShown: false }} />
            <Stack.Screen name="EditExpense" component={EditExpense} options={{ headerShown: false }} />
            <Stack.Screen name="ExpenseSummary" component={ExpenseSummary} options={{ headerShown: false }} />
          </>
        ) : (
          <>
            <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
            <Stack.Screen name="SignIn" component={SigninScreen} options={{ headerShown: false, presentation: 'modal' }} />
            <Stack.Screen name="SignUp" component={SignupScreen} options={{ headerShown: false, presentation: 'modal' }} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
