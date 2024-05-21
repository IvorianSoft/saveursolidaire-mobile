import React, {useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, View} from "react-native";
import {getFavorites, isFavorite, removeFavorite, basketFavorite} from "../storage/FavoriteStorage";
import FavoriteCard from "../components/FavoriteCard";
import LoaderComponent from "../components/Loader";

function FavoriteScreen({navigation}) {
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(false);

    const refreshFavorites = async () => {
        setLoading(true);
        const favorites = await getFavorites();
        setFavorites(favorites);
        console.log(favorites)
        setLoading(false);
    }

    useEffect(() => {
        refreshFavorites();
    }, []);

    const removeFavoriteHandler = async (favorite) => {
        await removeFavorite(favorite);
        await refreshFavorites();
    }

    return (
        <View style={styles.container}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        paddingHorizontal: 10,
                        paddingTop: 10,
                    }}
                    contentInsetAdjustmentBehavior="automatic">

                    {
                        favorites &&
                        favorites.map((favorite, index) => {
                            return (< FavoriteCard
                                navigation={ navigation }
                            key = {index}
                            basket = {favorite}
                            removeFavoriteHandler = {removeFavoriteHandler}
                            />)
                        })
                    }

                    <LoaderComponent loading={loading} />
                </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

export default FavoriteScreen;
