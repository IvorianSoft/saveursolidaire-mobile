import React, {useEffect} from 'react';
import {View, Text, StyleSheet, Alert, Button, Modal, Animated, Image, Dimensions, FlatList} from 'react-native';
import theme from "../constants/theme";
import CustomAlert from "./CustomAlert";
import {updateIsPaidOrder} from "../services/OrderService";

const PopupModal = ({ modalVisible, setModalVisible, item, navigation }) => {
    const [confirm, setConfirm] = React.useState(false);

        const confirmOrder = async () => {
            updateIsPaidOrder(item.id).then(
                () => {
                    Alert.alert('Order confirmed successfully.');
                    navigation.navigate('CustomerHomeTabs');
                }
            )
            .catch(error => {
                console.error(error);
                Alert.alert('error', error.message);
            });
        }

    const handleConfirm = () => {
        return(
            <CustomAlert modalVisible={confirm} confirmOrder={confirmOrder} setModalVisible={setConfirm} setParentModalVisible={setModalVisible} title="Confirmation" message="Do you confirm the cash payment?"/>
        );
    };

    const renderItem = ({ item }) => (
        <View style={styles.card}>
            <View style={styles.cardContent}>
                <View style={styles.textContainer}>
                    <Text style={styles.title}>{item?.name}</Text>
                    <Text>{item?.price} XOF</Text>
                </View>
                <Image source={{ uri: item.image.url}} style={styles.image}/>
            </View>
        </View>
    );

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(!modalVisible);
            }}>
            <Animated.View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>Seller Validation</Text>
                    <Text style={styles.title}>Order ID: {item?.id}</Text>
                    <Text>Total Price: {item?.totalPrice} XOF</Text>
                    <Text>Payment Method: {item?.paymentMethod}</Text>
                    <Text>Store Name: {item?.store.name}</Text>
                    <Button title="Confirm" onPress={() => setConfirm(true)} />
                </View>
            </Animated.View>
            {handleConfirm()}
        </Modal>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        width: '90%',
        height: Dimensions.get('window').height / 2,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: theme.COLORS.lightGreen,
        borderRadius: 20,
        padding: 20,
    },
    modalText: {
        fontSize: 24,
        fontWeight: 'bold',
    },
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
});

export default PopupModal;
