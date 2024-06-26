import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, TouchableOpacity} from "react-native";
import Screen from "../../components/Screen";
import {getStore} from "../../storage/StoreStorage";
import {getUser} from "../../storage/UserStorage";
import {Card} from "react-native-elements";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import {faStore, faBasketShopping, faList, faMapPin} from "@fortawesome/free-solid-svg-icons";
import '@fortawesome/free-solid-svg-icons'
import colors from "../../config/colors";

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
                Welcome to <Text style={styles.boldText}>{store.name}</Text>, {user.name}
            </Text>

            <ScrollView contentContainerStyle={styles.scrollViewContainer}>
                <TouchableOpacity onPress={() => navigation.navigate('StoreInformation', {store: store, setStore: setStore})} style={styles.cardContainer}>
                    <Card containerStyle={styles.card}>
                        <Card.Title>Store Information</Card.Title>
                        <Card.Divider/>
                        <FontAwesomeIcon icon={faStore} size={70} color={colors.primary} style={{alignSelf: 'center'}}/>
                    </Card>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('SellerBasket')} style={styles.cardContainer}>
                    <Card containerStyle={styles.card}>
                        <Card.Title>Baskets</Card.Title>
                        <Card.Divider/>
                        <FontAwesomeIcon icon={faBasketShopping} size={70} color={colors.green} style={{alignSelf: 'center'}}/>
                    </Card>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('SellerOrder')} style={styles.cardContainer}>
                    <Card containerStyle={styles.card}>
                        <Card.Title>Orders</Card.Title>
                        <Card.Divider/>
                        <FontAwesomeIcon icon={faList} size={70} color={colors.blue} style={{alignSelf: 'center'}}/>
                    </Card>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('SellerLocation', {store: store, setStore: setStore})} style={styles.cardContainer}>
                    <Card containerStyle={styles.card}>
                        <Card.Title>Location</Card.Title>
                        <Card.Divider/>
                        <FontAwesomeIcon icon={faMapPin} size={70} color={colors.orange} style={{alignSelf: 'center'}}/>
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
