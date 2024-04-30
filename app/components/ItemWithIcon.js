import React from 'react';
import {StyleSheet, View} from "react-native";
import AppText from "./AppText";

function ItemWithIcon({icon, title, onPress, style}) {
    return (
        <View style={[styles.container, style]}>
            <View>
                {icon}
            </View>
            <View style={styles.title}>
                <AppText style={{fontWeight: "bold"}} onPress={onPress}>{title}</AppText>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        padding: 10,
        alignItems: "center"
    },
    icon: {
        marginRight: 10
    },
    title: {
        marginLeft: 10
    }
});
export default ItemWithIcon;