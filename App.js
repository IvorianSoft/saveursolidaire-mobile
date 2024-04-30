import { StyleSheet, Text, View } from 'react-native';
import {getUser} from "./app/storage/UserStorage";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import LoginScreen from "./app/screens/Account/LoginScreen";
import {ForgotPasswordScreen, RegisterScreen} from "./app/screens";
import MyTabs from "./app/components/BottomTabBar";
import RegisterSellerScreen from "./app/screens/Seller/RegisterScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  const [initialRouteName, setInitialRouteName] = useState(null);
  useEffect(() => {
    const checkUser = async () => {
      const user = await getUser();
      if (user) {
        setInitialRouteName('HomeTabs');
      }else {
        setInitialRouteName('Login');
      }
    }
    checkUser();
  }, []);

    return (
        <NavigationContainer>
        <Stack.Navigator initialRouteName="Login" screenOptions={{headerShown: false}}>
            <Stack.Screen name="Login" component={LoginScreen}/>
            <Stack.Screen name="Register" component={RegisterScreen}/>
            <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen}/>
            <Stack.Screen name="RegisterSeller" component={RegisterSellerScreen}/>
            <Stack.Screen name="HomeTabs" component={MyTabs}/>
        </Stack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
