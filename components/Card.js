import React, {useState} from 'react';

import {Animated, Dimensions, Image, StyleSheet, TouchableOpacity, View} from "react-native";
import colors from "../config/colors";
import AppText from "./AppText";
import Icon from "./Icon";

const Card = (recipe) => {
    const [expanded, setExpanded] = useState(false);
    const opacityValue = useState(new Animated.Value(0))[0];

    const toggleExpanded = () => {
        setExpanded(!expanded);
        Animated.timing(opacityValue, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true,
        }).start();
    };

    return (
        <View style={styles.container}>
                <View style={styles.card}>
                    <Image style={styles.image} source={{ uri: recipe.recipe.recipe.image }} />
                    <View style={styles.detailsContainer}>
                        <AppText style={styles.title}>{recipe.recipe.recipe.label}</AppText>
                        <AppText style={styles.subTitle}>{recipe.recipe.recipe.source}</AppText>
                        {expanded && (
                            <View>
                                <AppText>Ingredients:</AppText>
                                {recipe.recipe.recipe.ingredients.map((ingredient, index) => (
                                    <AppText style={styles.ingredientLines} key={index}>- {ingredient.text}</AppText>
                                ))}
                                <AppText>Recipe:</AppText>
                                {recipe.recipe.recipe.instructionLines.map((instruction, index) => (
                                    <AppText style={styles.ingredientLines} key={index}>Step {index}: {instruction}</AppText>
                                ))}
                            </View>
                        )}
                    </View>
                    <View style={styles.arrowIcon}>
                        <TouchableOpacity style={styles.touchableOpacity} onPress={() => toggleExpanded()}>
                        <Icon backgroundColor="#FFFFFF" iconColor="#000000" name={expanded ? 'chevron-up' : 'chevron-down'} size={20} color={colors.primary} />
                        </TouchableOpacity>
                        </View>
                </View>
        </View>
    );
}

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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
        width: windowWidth * 0.9,
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
});

export default Card;