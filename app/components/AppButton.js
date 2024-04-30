import React from 'react';
import {Button, Platform, StyleSheet, TouchableOpacity, Text} from "react-native";
import colors from "../config/colors";

function AppButton({title, onPress, style}) {
    return (
        <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        width: '100%',
        height: 70,
        backgroundColor: colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
    },
    text: {
        color: colors.white,
        fontSize: 18,
        textAlign: 'center',
    }
});

export default AppButton;