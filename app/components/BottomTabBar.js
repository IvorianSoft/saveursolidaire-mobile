import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {StyleSheet} from "react-native";

import defaultStyles from "../config/styles";
import AccountScreen from "../screens/Account/AccountScreen";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import HomeScreen from "../screens/HomeScreen";
import OrderScreen from "../screens/OrderScreen";
import FavoriteScreen from "../screens/FavoriteScreen";
import BasketScreen from "../screens/BasketScreen";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faHome, faList, faUser} from "@fortawesome/free-solid-svg-icons";

const Tab = createBottomTabNavigator();

function MyTabs() {
    return (
        <Tab.Navigator style={styles.tab}>
            <Tab.Screen name="CustomerHomeTabs" component={HomeScreen} options={
                {
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color }) => (
                        <FontAwesomeIcon icon={faHome} color={color} style={{alignSelf: 'center'}}/>
                    ),
                    headerTitle: 'Home',
                    headerShown: true,
                    headerTitleAlign: 'center',
                }
            }/>
            <Tab.Screen name="Orders" component={OrderScreen} options={
                {
                    tabBarLabel: 'Orders',
                    tabBarIcon: ({ color }) => (
                        <FontAwesomeIcon icon={faList} color={color} style={{alignSelf: 'center'}}/>
                    ),
                    headerTitle: 'Orders',
                    headerTitleAlign: 'center',
                }
            }/>
            <Tab.Screen name="Account" component={AccountScreen} options={
                {
                    tabBarLabel: 'Account',
                    tabBarIcon: ({ color}) => (
                        <FontAwesomeIcon icon={faUser} color={color} style={{alignSelf: 'center'}}/>
                    ),
                    headerTitle: 'My Profile',
                    headerTitleAlign: 'center',
                }
            }/>
            <Tab.Screen name="Details" component={BasketScreen} options={
                {
                    tabBarButton: () => null,
                    headerTitle: null,
                    headerShown: false,
                }
            }/>
            <Tab.Screen name="Favorite" component={FavoriteScreen} options={
                {
                    tabBarButton: () => null,
                    headerTitle: "My Favorites stores",
                    headerShown: true,
                    headerTitleAlign: 'center',
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
