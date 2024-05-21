import React, {useEffect, useRef} from 'react';
import {TouchableOpacity, View, Modal, StyleSheet, Text, Image, Animated} from "react-native";

function Popup({modalVisible,setModalVisible,text, navigation}) {
    const position = useRef(new Animated.ValueXY({ x: 0, y: 1000 })).current;

    const handleClose = () => {
        Animated.timing(position, {
            toValue: { x: 0, y: -1000 },
            duration: 2000,
            useNativeDriver: false
        }).start(() => setModalVisible(false));

        navigation.navigate('CustomerHomeTabs');
    }

    useEffect(() => {
        if (modalVisible) {
            Animated.timing(position, {
                toValue: { x: 0, y: 0 },
                duration: 2000,
                useNativeDriver: false
            }).start();
        } else {
            Animated.timing(position, {
                toValue: { x: 0, y: 1000 },
                duration: 2000,
                useNativeDriver: false
            }).start();
        }
    }, [modalVisible]);

    return (
        <Modal
            animationType="none"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(!modalVisible);
            }}>
            <Animated.View style={[styles.centeredView, position.getLayout()]}>
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>{text}</Text>
                    <Image
                        source={require('../../assets/icons/approved.png')}
                        style={styles.icon}
                    />
                    <TouchableOpacity
                        style={styles.openButton}
                        onPress={
                            handleClose
                        }
                    >
                        <Text style={styles.textStyle}>Fermer</Text>
                    </TouchableOpacity>
                </View>
            </Animated.View>
        </Modal>
    );
}


const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        width: '100%',
        height: '50%',
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
    openButton: {
        backgroundColor: "#2196F3",
        borderRadius: 40,
        padding: 10,
        elevation: 2,
        marginTop: 20,

    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
        //augmente la taille
        fontSize: 25
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    icon: {
        width: 200,
        height: 200,
    }
});

export default Popup;
