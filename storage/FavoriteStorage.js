import AsyncStorage from "@react-native-async-storage/async-storage";

const FAVORITE_KEY = 'favorite';

export const storeFavorite = async (favorite) => {
    try {
        const jsonValue = JSON.stringify(favorite)
        const favorites = await getFavorites();
        const favoritesArray = Array.isArray(favorites) ? favorites : [favorites];
        if (favoritesArray) {
            favoritesArray.push(favorite);
            await AsyncStorage.setItem(FAVORITE_KEY, JSON.stringify(favoritesArray));
        } else {
            await AsyncStorage.setItem(FAVORITE_KEY, jsonValue);
        }
    } catch (e) {
        console.log(e);
    }
}

export const getFavorites = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem(FAVORITE_KEY)
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch(e) {
        console.log(e);
    }
}

export const removeFavorite = async (favorite) => {
    try {
        const jsonValue = await AsyncStorage.getItem(FAVORITE_KEY)
        const favorites = jsonValue != null ? JSON.parse(jsonValue) : null;
        const favoritesArray = Array.isArray(favorites) ? favorites : [favorites];
        const newFavorites = favoritesArray.filter(f => f.recipe.recipe.label !== favorite.recipe.recipe.label);
        await AsyncStorage.setItem(FAVORITE_KEY, JSON.stringify(newFavorites));
    } catch(e) {
        console.log(e);
    }
}

export const isFavorite = async (favorite) => {
    try {
        const jsonValue = await AsyncStorage.getItem(FAVORITE_KEY)
        const favorites = jsonValue != null ? JSON.parse(jsonValue) : null;
        const favoritesArray = Array.isArray(favorites) ? favorites : [favorites];
        if (favoritesArray) {
            return favoritesArray.filter(f => f.recipe.recipe.label === favorite.recipe.recipe.label).length > 0;
        }
        return false;
    } catch(e) {
        console.log(e);
    }
}


