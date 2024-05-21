import React from 'react';
import {View, Text, StyleSheet, Alert, Button, Modal, Animated, Image, Dimensions} from 'react-native';
import theme from "../constants/theme";
import CustomAlert from "./CustomAlert";

const PopupModal = ({ modalVisible, setModalVisible }) => {
    const [confirm, setConfirm] = React.useState(false);

    const handleConfirm = () => {
        return(
            <CustomAlert modalVisible={confirm} setModalVisible={setConfirm} setParentModalVisible={setModalVisible} title="Confirmation" message="Do you confirm the cash payment?"/>
        );
    };
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
    }
});

export default PopupModal;
