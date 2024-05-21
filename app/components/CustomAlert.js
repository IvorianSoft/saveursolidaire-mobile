import React from 'react';
import { Modal, Text, TouchableHighlight, View, StyleSheet } from 'react-native';
import theme from "../constants/theme";
import colors from "../config/colors";

const CustomAlert = ({ modalVisible, setModalVisible, setParentModalVisible, title, message }) => {
    const handleYesPress = () => {
        setModalVisible(!modalVisible);
        setParentModalVisible(false);
    };

    const handleNoPress = () => {
        setModalVisible(!modalVisible);
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(!modalVisible);
            }}>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalTitle}>{title}</Text>
                    <Text style={styles.modalText}>{message}</Text>
                    <View style={styles.buttonContainer}>
                        <TouchableHighlight
                            style={{ ...styles.openButton, backgroundColor: colors.blue }}
                            onPress={handleYesPress}>
                            <Text style={styles.textStyle}>Yes</Text>
                        </TouchableHighlight>
                        <TouchableHighlight
                            style={{ ...styles.openButton, backgroundColor: colors.red }}
                            onPress={handleNoPress}>
                            <Text style={styles.textStyle}>No</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    openButton: {
        borderRadius: 20,
        padding: 15,
        elevation: 2,
        margin: 20,
        justifyContent: 'center',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalTitle: {
        marginBottom: 15,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20,
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
    },
});

export default CustomAlert;
