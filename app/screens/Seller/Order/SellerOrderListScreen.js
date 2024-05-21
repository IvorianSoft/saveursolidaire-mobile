import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from "react-native";
import {getStore} from "../../../storage/StoreStorage";
import {getOrdersList} from "../../../services/seller/OrderService";
import {Avatar, ListItem} from "react-native-elements";

function SellerOrderListScreen({navigation, route}) {
    const [store, setStore] = useState(null);
    const [orders, setOrders] = useState([]);

    async function getStoreData() {
        const store = await getStore();
        setStore(store);

        if (isEmpty(store)) {
            navigation.reset({index: 0, routes: [{name: 'Login'}]});
        }

        return store;
    }

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getStoreData().then(
                (store) => getOrdersList(store.id).then(
                    orders => setOrders(orders)
                )
            );
        });

        return unsubscribe;
    }, [navigation]);

    useEffect(() => {
        getStoreData().then(
            (store) => getOrdersList(store.id).then(
                (orders) => setOrders(orders)
            )
        );
    }, []);

    function isEmpty(obj) {
        return Object.keys(obj).length === 0;
    }

    return (
        <View>
            <Text style={styles.headTitle}>You have {orders.length} order(s) in {store?.name}</Text>

            <ScrollView contentInset={{bottom: 80}}>
                {
                    orders.map((order, index) => (
                        <ListItem
                            key={index}
                            bottomDivider
                            onPress={() => console.log('Order details')}
                            style={styles.item}
                        >
                            <ListItem.Content>
                                <ListItem.Title># {order?.id} / {order?.reference}</ListItem.Title>
                                <ListItem.Subtitle>{order?.paymentMethod} - {order?.totalPrice} XOF</ListItem.Subtitle>
                                <ListItem.Subtitle>Basket: {order?.basket?.name} - Qte: {order?.quantity}</ListItem.Subtitle>
                                <ListItem.Subtitle>Paid: {order?.isPaid ? 'Yes' : 'No'} - Recovered: {order?.isRecovered ? 'Yes' : 'No'}</ListItem.Subtitle>
                                <ListItem.Subtitle>Customer: {order?.user?.name} - {order?.user?.contact}</ListItem.Subtitle>

                                <ListItem.Subtitle>Created at: {new Date(order?.createdAt).toLocaleString()}</ListItem.Subtitle>
                                <ListItem.Subtitle>Recovered at: {new Date(order?.updatedAt).toLocaleString()}</ListItem.Subtitle>
                            </ListItem.Content>

                            <Avatar source={{uri: order?.basket?.image?.url}} size="large" rounded/>
                        </ListItem>
                    ))
                }
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    headTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 10,
    },
    item: {
        padding: 10,
        fontSize: 18,
    }
});

export default SellerOrderListScreen;