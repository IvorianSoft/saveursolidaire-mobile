import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {StyleSheet} from "react-native";

import defaultStyles from "../config/styles";
import AccountScreen from "../screens/Account/AccountScreen";
import HomeScreen from "../screens/Seller/HomeScreen";
import StoreInformationScreen from "../screens/Seller/Store/StoreInformationScreen";
import SellerLocationScreen from "../screens/Seller/Store/SellerLocationScreen";
import SellerBasketListScreen from "../screens/Seller/Basket/SellerBasketListScreen";
import SellerAddBasketFormScreen from "../screens/Seller/Basket/SellerAddBasketFormScreen";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faHome, faUser} from "@fortawesome/free-solid-svg-icons";
import SellerUpdateBasketFormScreen from "../screens/Seller/Basket/SellerUpdateBasketFormScreen";
import SellerOrderListScreen from "../screens/Seller/Order/SellerOrderListScreen";

const Tab = createBottomTabNavigator();

function SellerBottomTabBar() {
    return (
        <Tab.Navigator style={styles.tab}>
            <Tab.Screen name="HomeTabs" component={HomeScreen} options={
                {
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color }) => (
                        <FontAwesomeIcon icon={faHome} color={color} style={{alignSelf: 'center'}}/>
                    ),
                    headerTitle: 'Home',
                }
            }/>
            <Tab.Screen name="Account" component={AccountScreen} options={
                {
                    tabBarLabel: 'Account',
                    tabBarIcon: ({ color}) => (
                        <FontAwesomeIcon icon={faUser} color={color} style={{alignSelf: 'center'}}/>
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
            <Tab.Screen name="UpdateBasket" component={SellerUpdateBasketFormScreen} options={
                {
                    tabBarButton: () => null,
                    tabBarLabel: 'Update Basket',
                    headerTitle: 'Update Basket',
                }
            }/>
            <Tab.Screen name="SellerOrder" component={SellerOrderListScreen} options={
                {
                    tabBarButton: () => null,
                    tabBarLabel: 'Orders',
                    headerTitle: 'Orders',
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
