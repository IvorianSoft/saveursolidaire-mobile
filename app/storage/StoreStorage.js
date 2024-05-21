import AsyncStorage from "@react-native-async-storage/async-storage";

const STORE_KEY = 'store';

export const storeStore = async store => {
    try {
        const jsonValue = JSON.stringify(store);
        await AsyncStorage.setItem(STORE_KEY, jsonValue);
        console.log('Store stored in local storage:', store);
    } catch (e) {
        console.log(e);
    }
}

export const getStore = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem(STORE_KEY);
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        console.log(e);
    }
}

export const removeStore = async () => {
    try {
        await AsyncStorage.removeItem(STORE_KEY);
    } catch (e) {
        console.log(e);
    }
}

export const replaceStore = async store => {
    await removeStore();
    await storeStore(store);
}
