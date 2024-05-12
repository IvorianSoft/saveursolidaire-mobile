import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {StyleSheet} from "react-native";

import defaultStyles from "../config/styles";
import AccountScreen from "../screens/Account/AccountScreen";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import HomeScreen from "../screens/Seller/HomeScreen";
import StoreInformationScreen from "../screens/Seller/Store/StoreInformationScreen";
import SellerLocationScreen from "../screens/Seller/Store/SellerLocationScreen";
import SellerBasketListScreen from "../screens/Seller/Basket/SellerBasketListScreen";
import SellerAddBasketFormScreen from "../screens/Seller/Basket/SellerAddBasketFormScreen";
import Icon from 'react-native-vector-icons/FontAwesome';

const Tab = createBottomTabNavigator();

function SellerBottomTabBar() {
    return (
        <Tab.Navigator style={styles.tab}>
            <Tab.Screen name="HomeTabs" component={HomeScreen} options={
                {
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color }) => (
                        <Icon name="home" color={color} size={35} />
                    ),
                    headerTitle: 'Home',
                }
            }/>
            <Tab.Screen name="Account" component={AccountScreen} options={
                {
                    tabBarLabel: 'Account',
                    tabBarIcon: ({ color}) => (
                        <MaterialCommunityIcons name="account-circle" color={color} size={35} />
                    ),
                    headerTitle: 'My Profile',
                }
            }/>
            <Tab.Screen name="StoreInformation" component={StoreInformationScreen} options={
                {
                    tabBarButton: () => null,
                    tabBarLabel: 'Information',
                    headerTitle: 'Store Information',
                }
            }/>
            <Tab.Screen name="SellerLocation" component={SellerLocationScreen} options={
                {
                    tabBarButton: () => null,
                    tabBarLabel: 'Location',
                    headerTitle: 'Store Location',
                }
            }/>
            <Tab.Screen name="SellerBasket" component={SellerBasketListScreen} options={
                {
                    tabBarButton: () => null,
                    tabBarLabel: 'Baskets',
                    headerTitle: 'Baskets',
                }
            }/>
            <Tab.Screen name="AddBasket" component={SellerAddBasketFormScreen} options={
                {
                    tabBarButton: () => null,
                    tabBarLabel: 'Add Basket',
                    headerTitle: 'Add Basket',
                }
            }/>
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    tab: {
        backgroundColor: defaultStyles.colors.gray,
    }
});

export default SellerBottomTabBar;
