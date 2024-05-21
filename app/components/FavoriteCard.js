import React, {useEffect, useState} from 'react';

import {Animated, Dimensions, Image, StatusBar, StyleSheet, TouchableOpacity, View, Text} from "react-native";
import colors from "../config/colors";
import AppText from "./AppText";
import Icon from "./Icon";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import {isFavorite, removeFavorite, basketFavorite} from "../storage/FavoriteStorage";
import {star} from "../constants/icons";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faMapMarker, faMarker, faTrash} from "@fortawesome/free-solid-svg-icons";

const FavoriteCard = ({ removeFavoriteHandler, basket, navigation}) => {
    const opacityValue = useState(new Animated.Value(0))[0];
    const [iconName, setIconName] = useState('');

    const addOrRemoveFavorite = async (basket) => {
        const isFavoriteBool = await isFavorite(basket);
        if (isFavoriteBool) {
            await removeFavorite(basket);
        } else {
            await basketFavorite(basket);
        }
        const isFavoriteBoolAfter = await isFavorite(basket);
        setIconName(isFavoriteBoolAfter ? "star" : "star-outline");


    }

    useEffect(() => {
        const materialCommunityIconsName = async () => {
            const isFavoriteBool = await isFavorite(basket);
            setIconName(isFavoriteBool ? "star" : "star-outline");
        }
        materialCommunityIconsName();
    }, [basket]);

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Details', {basket})}
                >
                <Image style={styles.image} source={{ uri: basket?.image.url}} />
                </TouchableOpacity>
                <View style={styles.detailsContainer}>
                    <View style={styles.titleContainer}>
                        <AppText style={styles.title}>
                            {basket?.name}
                        </AppText>
                        {
                            removeFavoriteHandler && (
                                <FontAwesomeIcon
                                    icon={faTrash}
                                    size={20}
                                    color={colors.primary}
                                    onPress={() => removeFavoriteHandler(basket)}
                                />
                            )
                        }
                    </View>
                    <View style={styles.locationContainer}>
                        <FontAwesomeIcon
                            icon={faMapMarker}
                            size={20}
                            color={colors.secondary}
                        />
                        <AppText style={styles.subTitle}>{basket?.store.location.address}</AppText>
                    </View>
                </View>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: StatusBar.currentHeight,

    },
    touchableOpacity: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    arrowIcon: {
        position: 'absolute',
        right: 20,
        bottom: 20,
        transform: [{ scaleX: 2.5 }, { scaleY: 2.5 }],
    },
    card: {
        width: Dimensions.get('window').width - 40,
        borderRadius: 20,
        backgroundColor: colors.white,
        marginBottom: 20,
        shadowColor: colors.black,
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 8,
        overflow: 'hidden',
    },
    ingredientLines: {
        color: colors.secondary,
        fontSize: 16,
        fontWeight: '500',
        marginLeft: 20,
    },
    detailsContainer: {
        padding: 20,
    },
    image: {
        width: '100%',
        height: 250,
        resizeMode: 'cover',
    },
    title: {
        marginBottom: 10,
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.primary,
    },
    subTitle: {
        color: colors.secondary,
        fontSize: 16,
        fontWeight: '500',
    },
    titleContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 20,
    },
    starIcon: {
        backgroundColor: colors.white,
        borderRadius: 15,
        padding: 5,
        shadowColor: colors.black,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    locationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});

export default FavoriteCard;
