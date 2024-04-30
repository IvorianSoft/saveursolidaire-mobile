import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {StyleSheet} from "react-native";

import defaultStyles from "../config/styles";
import AccountScreen from "../screens/Account/AccountScreen";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import HomeScreen from "../screens/HomeScreen";
import StoreScreen from "../screens/StoreScreen";

const Tab = createBottomTabNavigator();

function MyTabs() {
    return (
        <Tab.Navigator style={styles.tab}>
            <Tab.Screen name="HomeTabs" component={HomeScreen} options={
                {
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="home-circle" color={color} size={35} />
                    ),
                    headerTitle: 'Home',
                    headerShown: false,
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
            <Tab.Screen name="Details" component={StoreScreen} options={
                {
                    tabBarButton: () => null,
                    headerTitle: null,
                    headerShown: false,
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

export default MyTabs;
