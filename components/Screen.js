import React from 'react';
import {StyleSheet, SafeAreaView} from "react-native";
import Constants from "expo-constants/src/Constants";

function Screen({children, style}) {
    return (
        <SafeAreaView style={[styles.screen, style]}>
            {children}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    screen: {
        paddingTop: Constants.statusBarHeight,
    }
});

export default Screen;