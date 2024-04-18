import React from 'react';
import {View, StyleSheet, Image, TouchableHighlight} from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import AppText from "../AppText";
import colors from "../../config/colors";

function ListItem({image, title, subtitle, renderRightActions, renderLeftActions}) {
    return (
        renderLeftActions && renderRightActions) ? (
        <Swipeable renderRightActions={renderLeftActions} renderLeftActions={renderRightActions}>
            <TouchableHighlight
                style={styles.bigView}
                underlayColor={colors.none}
            >
                <>
                    <Image source={image} style={{width: 70, height: 70, borderRadius: 35, marginHorizontal: 10}}/>
                    <View style={{padding: 10}}>
                        <AppText style={styles.title}>{title}</AppText>
                        <AppText style={{color: colors.secondary}}>{subtitle}</AppText>
                    </View>
                </>
            </TouchableHighlight>
        </Swipeable>
    ) : (
        <TouchableHighlight
            style={styles.bigView}
            underlayColor={colors.none}
        >
            <>
                <Image source={image} style={{width: 70, height: 70, borderRadius: 35, marginHorizontal: 10}}/>
                <View style={{padding: 10}}>
                    <AppText style={styles.title}>{title}</AppText>
                    <AppText style={{color: colors.secondary}}>{subtitle}</AppText>
                </View>
            </>
        </TouchableHighlight>
    );
}

const styles = StyleSheet.create({
    bigView: {
        width: '100%',
        flexDirection: 'row',
    }
});

export default ListItem;