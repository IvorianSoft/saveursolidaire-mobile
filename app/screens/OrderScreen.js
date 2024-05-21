import React, { useEffect, useState } from 'react';
import {View, Text, FlatList, Image, StyleSheet, TouchableOpacity, Modal, Alert} from 'react-native';
import Loader from "../components/Loader";
import unpaidOrders from '../config/fake';
import PopupModal from "../components/PopupModal";
import {getAllOrdersByUserAndIsPaidFalse, getAllOrdersByUserAndIsPaidTrue} from "../services/OrderService";

const OrderScreen = ({navigation}) => {
    const [orders, setOrders] = useState(unpaidOrders);
    const [loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    useEffect(() => {
        getAllOrdersByUserAndIsPaidFalse()
            .then(data => {
                setOrders(data);
                setLoading(false);
            })
            .catch(error => {
                console.error(error);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getAllOrdersByUserAndIsPaidFalse()
                .then(data => {
                    setOrders(data);
                    setLoading(false);
                })
                .catch(error => {
                    console.error(error);
                    setLoading(false);
                });
        });

        return unsubscribe;

    }, [navigation]);

    const renderItem = ({ item }) => {
        const date = new Date(item.createdAt);
        const formattedDate = `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`;


        return (
        <TouchableOpacity onPress={() => {
            setSelectedItem(!item.isPaid ? item : null);
            setModalVisible(!item.isPaid);
        }}
            >
            <View style={styles.card}>
                <View style={styles.cardContent}>
                    <View style={styles.textContainer}>
                        <Text style={styles.title}>#{item.id} / {item.reference}</Text>
                        <Text>{item.totalPrice} XOF</Text>
                        <Text>{item.paymentMethod}</Text>
                        <Text>{formattedDate}</Text>
                        <Text>{item.store.name}</Text>
                    </View>
                    <Image source={{ uri: item.basket.image.url}} style={styles.image}
                    />
                </View>
            </View>
        </TouchableOpacity>
    )};



    const renderModal = () => (
        <PopupModal modalVisible={modalVisible} setModalVisible={setModalVisible} item={selectedItem}></PopupModal>
    );

    if (loading) {
        return <Loader loading/>;
    }

    return (
        <View>
            <FlatList
                data={orders}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
            {renderModal()}
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: 5,
        padding: 10,
        margin: 10,
    },
    cardContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    textContainer: {
        flex: 1,
        padding: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        fontFamily: 'Arial',
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 10,
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
});

export default OrderScreen;
