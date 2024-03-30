

import React from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import AppNavigation from './navigation/appNavigation';
import { Provider } from 'react-redux';
import { store } from './redux/store';



function App() {


  return (
    <Provider store={store}>
       <AppNavigation />
    </Provider> 
  
  );
}


export default App;
