import axios from "axios";

import { API_URL } from "../SaveurSolidaireApi";
import {getToken} from "../../storage/UserStorage";
import {replaceStore} from "../../storage/StoreStorage";

const getHeader = async () => {
    const token = await getToken();
    return {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
    };
}

export const updateStore = async (store) => {
    try {
        const headers = await getHeader();
        const response = await axios.put(
            `${API_URL}/stores/${store.id}`,
            store,
            {
                headers: headers,
            },
        );
        const storeUpdated = response.data;
        await replaceStore(storeUpdated)
        return storeUpdated;
    } catch (error) {
        console.log("Error during updateStore:", error);
        if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
            alert(error.response.data.message || 'An error occurred');
        } else if (error.request) {
            console.log(error.request);
            alert('No response received from the server');
        } else {
            console.log('Error', error.message);
            alert(error.message || 'An error occurred');
        }
    }
};

export const updateStoreLocation = async (id, location) => {
    try {
        const headers = await getHeader();
        const response = await axios.put(
            `${API_URL}/stores/${id}/location`,
            location,
            {
                headers: headers,
            },
        );
        const storeUpdated = response.data;
        await replaceStore(storeUpdated)
        return storeUpdated;
    } catch (error) {
        console.log("Error during updateStoreLocation:", error);
        if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
            alert(error.response.data.message || 'An error occurred');
        } else if (error.request) {
            console.log(error.request);
            alert('No response received from the server');
        } else {
            console.log('Error', error.message);
            alert(error.message || 'An error occurred');
        }
    }
}
