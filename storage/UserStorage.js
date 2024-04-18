import AsyncStorage from '@react-native-async-storage/async-storage';

const USER_KEY = 'user';

export const storeUser = async user => {
  try {
    const jsonValue = JSON.stringify(user);
    await AsyncStorage.setItem(USER_KEY, jsonValue);
    console.log('User stored in local storage:', user);
  } catch (e) {
    console.log(e);
  }
};

export const getUser = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(USER_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log(e);
  }
};

export const removeUser = async () => {
  try {
    await AsyncStorage.removeItem(USER_KEY);
  } catch (e) {
    console.log(e);
  }
};
