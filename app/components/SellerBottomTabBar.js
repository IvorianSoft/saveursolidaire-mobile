import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {StyleSheet} from "react-native";

import defaultStyles from "../config/styles";
import AccountScreen from "../screens/Account/AccountScreen";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import HomeScreen from "../screens/Seller/HomeScreen";
import StoreInformationScreen from "../screens/Seller/Store/StoreInformationScreen";
import SellerLocationScreen from "../screens/Seller/Store/SellerLocationScreen";

const Tab = createBottomTabNavigator();

function SellerBottomTabBar() {
    return (
        <Tab.Navigator style={styles.tab}>
            <Tab.Screen name="HomeTabs" component={HomeScreen} options={
                {
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="home-circle" color={color} size={35} />
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
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    tab: {
        backgroundColor: defaultStyles.colors.gray,
    }
});

export default SellerBottomTabBar;
