import axios from "axios";

import {API_URL} from "../SaveurSolidaireApi";

import {getToken} from "../../storage/UserStorage";

const getHeader = async () => {
    const token = await getToken();
    return {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
    };
}

export const getOrdersList = async (id) => {
    try {
        const headers = await getHeader();
        const response = await axios.get(
            `${API_URL}/orders/store/${id}`,
            {
                headers: headers,
            },
        );
        console.log("getOrdersList response.data:", response.data)
        return response.data;
    } catch (error) {
        console.log("Error during getOrdersList:", error);
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