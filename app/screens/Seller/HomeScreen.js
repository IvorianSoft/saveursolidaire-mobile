import React, {useEffect, useState} from 'react';
import {Image, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Screen from "../../components/Screen";
import {getStore} from "../../storage/StoreStorage";
import {getUser} from "../../storage/UserStorage";
import {Card, Icon} from "react-native-elements";
import Icons from "../../constants/icons";
import colors from "../../config/colors";
import icons from "../../constants/icons";

function HomeScreen({navigation}) {
    const [user, setUser] = useState({});
    const [store, setStore] = useState({});

    useEffect(() => {
        getStoreData();
        getUserData();
    }, []);

    async function getStoreData() {
        const store = await getStore();
        setStore(store);

        if (isEmpty(store)) {
            navigation.reset({index: 0, routes: [{name: 'Login'}]});
        }
    }

    async function getUserData() {
        const user = await getUser();
        setUser(user);

        if (isEmpty(user)) {
            navigation.reset({index: 0, routes: [{name: 'Login'}]});
        }
    }

    function isEmpty(obj) {
        return Object.keys(obj).length === 0;
    }

    // ===============================
    return (
        <Screen>
            <Text style={styles.headTitle}>
                Welcome, {user.name} to <Text style={styles.boldText}>{store.name}</Text>
            </Text>

            <ScrollView contentContainerStyle={styles.scrollViewContainer}>
                <TouchableOpacity onPress={() => navigation.navigate('StoreInformation', {store: store, setStore: setStore})} style={styles.cardContainer}>
                    <Card containerStyle={styles.card}>
                        <Card.Title>Store Information</Card.Title>
                        <Card.Divider/>
                        {Platform.OS === 'ios' ? <Icon name='store' size={80} iconStyle={{color: colors.primary}}/> : <Image source={icons.bakery} style={{width: 60, height: 60, alignSelf: 'center'}}/>}
                    </Card>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('SellerBasket')} style={styles.cardContainer}>
                    <Card containerStyle={styles.card}>
                        <Card.Title>Baskets</Card.Title>
                        <Card.Divider/>
                        {Platform.OS === 'ios' ? <Icon name='shopping-basket' size={80} iconStyle={{color: colors.green}}/> : <Image source={icons.basket} style={{width: 60, height: 60, alignSelf: 'center'}}/>}
                    </Card>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('Account')} style={styles.cardContainer}>
                    <Card containerStyle={styles.card}>
                        <Card.Title>Orders</Card.Title>
                        <Card.Divider/>
                        {Platform.OS === 'ios' ? <Icon name='list' size={80} iconStyle={{color: colors.blue}}/> : <Image source={icons.list} style={{width: 60, height: 60, alignSelf: 'center'}}/>}
                    </Card>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('SellerLocation', {store: store, setStore: setStore})} style={styles.cardContainer}>
                    <Card containerStyle={styles.card}>
                        <Card.Title>Location</Card.Title>
                        <Card.Divider/>
                        {Platform.OS === 'ios' ? <Icon name='location-on' size={80} iconStyle={{color: colors.orange}}/> : <Image source={icons.location} style={{width: 60, height: 60, alignSelf: 'center'}}/>}
                    </Card>
                </TouchableOpacity>
            </ScrollView>
        </Screen>
    );
}

const styles = StyleSheet.create({
    headTitle: {
        fontSize: 24,
        padding: 20
    },
    boldText: {
        fontWeight: 'bold',
    },
    cardContainer: {
        width: '50%',
        padding: 10,
    },
    card: {
        width: '90%',
        height: 150,
        borderRadius: 20,
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        padding: 20,
        backgroundColor: '#fff',
    },
    scrollViewContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
    }
});
export default HomeScreen;
