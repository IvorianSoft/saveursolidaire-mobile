import React, { useEffect, useState } from 'react';
import {View, Text, FlatList, Image, StyleSheet, TouchableOpacity, Modal, Alert} from 'react-native';
import Loader from "../components/Loader";
import unpaidOrders from '../config/fake';
import PopupModal from "../components/PopupModal";

const OrderScreen = () => {
    const [orders, setOrders] = useState(unpaidOrders);
    const [loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        fetch('URL_DE_VOTRE_API')
            .then(response => response.json())
            .then(data => {
                setOrders(data);
                setLoading(false);
            })
            .catch(error => {
                console.error(error);
                setLoading(false);
            });
    }, []);

    const renderItem = ({ item }) => {
        const date = new Date(item.created_at);
        const formattedDate = `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`;


        return (
        <TouchableOpacity onPress={() => setModalVisible(true)}>
            <View style={styles.card}>
                <View style={styles.cardContent}>
                    <View style={styles.textContainer}>
                        <Text style={styles.title}>N°{item.id}</Text>
                        <Text>{item.total_price} XOF</Text>
                        <Text>{item.payment_method}</Text>
                        <Text>{formattedDate}</Text>
                        <Text>{item.store_name}</Text>
                    </View>
                    <Image source={{ uri: 'https://cdn.socleo.org/media/ED5FD9CX/P/images-4.jpg'}} style={styles.image}/>
                </View>
            </View>
        </TouchableOpacity>
    )};



    const renderModal = () => (
        <PopupModal modalVisible={modalVisible} setModalVisible={setModalVisible}></PopupModal>
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
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    image: {
        width: 100,
        height: 100,
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
