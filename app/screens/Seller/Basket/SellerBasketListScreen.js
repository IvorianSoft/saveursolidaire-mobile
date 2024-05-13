import React, {useEffect, useState} from 'react';
import Screen from "../../../components/Screen";
import {Button, FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {getStore} from "../../../storage/StoreStorage";
import {getBasketsList} from "../../../services/seller/BasketService";
import AppButton from "../../../components/AppButton";
import {ListItem} from "react-native-elements";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faPlusCircle} from "@fortawesome/free-solid-svg-icons";
import colors from "../../../config/colors";

function SellerBasketListScreen({navigation}) {
    const [store, setStore] = useState(null);
    const [baskets, setBaskets] = useState([]);

    async function getStoreData() {
        const store = await getStore();
        setStore(store);

        if (isEmpty(store)) {
            navigation.reset({index: 0, routes: [{name: 'Login'}]});
        }
    }

    useEffect(() => {
        getStoreData();
    }, []);

    useEffect(() => {
        if (store) {
            getBasketsList(store.id).then((baskets) => {
                setBaskets(baskets);
            });
        }
    }, [store]);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getStoreData();
        });

        return unsubscribe;
    }, [navigation]);

    function isEmpty(obj) {
        return Object.keys(obj).length === 0;
    }

    // ------------------------------
    return (
        <Screen>
            <Text style={styles.headTitle}>You have {baskets.length} basket(s) in your store</Text>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('AddBasket')}
                >
                    <FontAwesomeIcon icon={faPlusCircle} size={30} color={colors.primary}/>
                </TouchableOpacity>

            </View>

            <ScrollView contentInset={{bottom: 80}}>
                {
                    baskets.map((basket, index) => (
                        <ListItem
                            key={index}
                            bottomDivider
                            onPress={() => navigation.navigate('UpdateBasket', {basketId: basket.id})}
                            style={styles.item}
                        >
                            <ListItem.Content>
                                <ListItem.Title>{basket.name}</ListItem.Title>
                                <ListItem.Subtitle>{basket.description}</ListItem.Subtitle>
                                <ListItem.Subtitle>Price : {basket.price}</ListItem.Subtitle>
                                <ListItem.Subtitle>Quantity: {basket.quantity}</ListItem.Subtitle>
                                <ListItem.Subtitle>{basket.category}</ListItem.Subtitle>
                            </ListItem.Content>
                            <ListItem.Chevron/>
                        </ListItem>
                    ))
                }
            </ScrollView>
        </Screen>
    );
}

const styles = StyleSheet.create({
    headTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 20,
    },
    buttonContainer: {
        alignItems: 'center',
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    addBasketButton: {
        width: '30%',
        height: 50,
    },
    item: {
        padding: 10,
        fontSize: 18,
    },
    containerStyle: {
        flexGrow: 1,
    }
});

export default SellerBasketListScreen;
