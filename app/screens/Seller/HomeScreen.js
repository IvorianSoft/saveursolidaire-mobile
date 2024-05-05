import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Screen from "../../components/Screen";
import {getStore} from "../../storage/StoreStorage";
import {getUser} from "../../storage/UserStorage";
import {Card, Icon} from "react-native-elements";
import colors from "../../config/colors";

function HomeScreen({navigation}) {
    const [user, setUser] = useState({});
    const [store, setStore] = useState({});

    useEffect(() => {
        const getStoreData = async () => {
            const store = await getStore();
            setStore(store);
        }

        const getUserData = async () => {
            const user = await getUser();
            setUser(user);
        }

        getStoreData();

        getUserData();
    }, []);

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
                        <Icon name='store' size={80} iconStyle={{color: colors.primary}}/>
                    </Card>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('Account')} style={styles.cardContainer}>
                    <Card containerStyle={styles.card}>
                        <Card.Title>Baskets</Card.Title>
                        <Card.Divider/>
                        <Icon name='shopping-basket' size={80} iconStyle={{color: colors.green}}/>
                    </Card>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('Account')} style={styles.cardContainer}>
                    <Card containerStyle={styles.card}>
                        <Card.Title>Orders</Card.Title>
                        <Card.Divider/>
                        <Icon name='list' size={80} iconStyle={{color: colors.blue}}/>
                    </Card>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('SellerLocation', {store: store, setStore: setStore})} style={styles.cardContainer}>
                    <Card containerStyle={styles.card}>
                        <Card.Title>Location</Card.Title>
                        <Card.Divider/>
                        <Icon name='location-on' size={80} iconStyle={{color: colors.orange}}/>
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
