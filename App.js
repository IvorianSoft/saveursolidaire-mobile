import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

import {Store, OrderDelivery} from './screens';
import Tabs from './navigation/tabs';
import AccountScreen from './screens/Account/AccountScreen';
import RegisterScreen from './screens/Account/RegisterScreen';
import LoginScreen from './screens/Account/LoginScreen';
import ForgotPasswordScreen from './screens/Account/ForgotPasswordScreen';
import {StatusBar} from 'react-native';
import SearchScreen from './screens/Search';

const Stack = createStackNavigator();

const App = () => {
  //log
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName={'Home'}>
        <Stack.Screen name="HomeTabs" component={Tabs} />
        <Stack.Screen name="Store" component={Store} />
        <Stack.Screen name="Search" component={SearchScreen} />
        <Stack.Screen name="OrderDelivery" component={OrderDelivery} />
        <Stack.Screen name="Account" component={AccountScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
