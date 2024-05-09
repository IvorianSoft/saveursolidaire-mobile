import React from 'react';
import {Button, Platform, StyleSheet, TouchableOpacity, Text} from "react-native";
import colors from "../config/colors";
import {Icon} from "react-native-elements";

function AppButton({title, onPress, style, disabled = false, icon}) {
    return (

        <TouchableOpacity style={[styles.button, style]} onPress={onPress} disabled={disabled}>
            {/*if icon is provided, show icon*/}
            {icon && <Icon name={icon} size={30} iconStyle={{color: colors.white}} />}
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
