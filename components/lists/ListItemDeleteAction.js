import React from 'react';
import {View, StyleSheet} from "react-native";
import colors from "../../config/colors";
import {MaterialCommunityIcons} from "@expo/vector-icons";

function ListItemDeleteAction({onPress}) {
    return (
        <View style={styles.container}>
            <MaterialCommunityIcons name={"trash-can"} size={35} color={colors.white} onPress={onPress}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.red,
        width: 70,
        height: 70,
        justifyContent: "center",
        alignItems:"center"
    }
});

export default ListItemDeleteAction;