import { StyleSheet } from 'react-native';
import {getUser} from "./app/storage/UserStorage";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import LoginScreen from "./app/screens/Account/LoginScreen";
import {ForgotPasswordScreen, RegisterScreen} from "./app/screens";
import MyTabs from "./app/components/BottomTabBar";
import RegisterSellerScreen from "./app/screens/Seller/RegisterScreen";
import SellerBottomTabBar from "./app/components/SellerBottomTabBar";
import 'react-native-reanimated';
import FavoriteScreen from "./app/screens/FavoriteScreen";


const Stack = createNativeStackNavigator();

export default function App() {
  const [initialRouteName, setInitialRouteName] = useState(null);
  useEffect(() => {
    const checkUser = async () => {
      const user = await getUser();
      if (user) {
          if (user.role.name === 'SELLER') {
              setInitialRouteName('SellerHomeTabs');
          }
          setInitialRouteName('HomeTabs');
      }else {
        setInitialRouteName('Login');
      }
    }
    checkUser();
  }, []);

    return (
        <NavigationContainer>
        <Stack.Navigator initialRouteName="HomeTabs" screenOptions={{headerShown: false}}>
            <Stack.Screen name="Login" component={LoginScreen}/>
            <Stack.Screen name="Register" component={RegisterScreen}/>
            <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen}/>
            <Stack.Screen name="RegisterSeller" component={RegisterSellerScreen}/>
            <Stack.Screen name="Favorite" component={FavoriteScreen} options={
                {
                    headerTitle: 'My Favorites Recipes',
                }
            }/>
            <Stack.Screen name="HomeTabs" component={MyTabs}/>
            <Stack.Screen name="SellerHomeTabs" component={SellerBottomTabBar}/>
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
