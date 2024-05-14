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

export const getBasketsList = async (id) => {
    try {
        const headers = await getHeader();
        const response = await axios.get(
            `${API_URL}/baskets/store/${id}`,
            {
                headers: headers,
            },
        );
        console.log("getBasketsList response.data:", response.data)
        return response.data;
    } catch (error) {
        console.log("Error during getBasketsList:", error);
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

export const addBasket = async (basket) => {
    try {
        const headers = await getHeader();
        const response = await axios.post(
            `${API_URL}/baskets`,
            basket,
            {
                headers: headers,
            },
        );
        console.log("addBasket response.data:", response.data)
        return response.data;
    } catch (error) {
        console.log("Error during addBasket:", error);
        if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
            let message = null;
            if (error.response.data){
                const obj = error.response.data;
                message = '';
                for (const key in obj) {
                    message += `${key}: ${obj[key]}\n`;
                }
            }

            alert(error.response.data.message || message || 'An error occurred');
        } else if (error.request) {
            console.log(error.request);
            alert('No response received from the server');
        } else {
            console.log('Error', error.message);
            alert(error.message || 'An error occurred');
        }
    }
}

export const getBasket = async (id) => {
    try {
        const headers = await getHeader();
        const response = await axios.get(
            `${API_URL}/baskets/${id}`,
            {
                headers: headers,
            },
        );
        console.log("getBasket response.data:", response.data)
        return response.data;
    } catch (error) {
        console.log("Error during getBasket:", error);
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

export const updateBasketStatus = async (id) => {
    try {
        const headers = await getHeader();
        const response = await axios.put(
            `${API_URL}/baskets/${id}/active-status`,
            {},
            {
                headers: headers,
            },
        );
        console.log("updateStatus response.data:", response.data)
        return response.data;
    } catch (error) {
        console.log("Error during updateStatus:", error);
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

export const updateBasketQuantity = async (id, quantity) => {
    try {
        const headers = await getHeader();
        const response = await axios.put(
            `${API_URL}/baskets/${id}/quantity/${quantity}`,
            {},
            {
                headers: headers,
            },
        );
        console.log("updateQuantity response.data:", response.data)
        return response.data;
    } catch (error) {
        console.log("Error during updateQuantity:", error);
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

export const updateBasketDetails = async (id, basket) => {
    try {
        const headers = await getHeader();
        const response = await axios.put(
            `${API_URL}/baskets/${id}`,
            basket,
            {
                headers: headers,
            },
        );
        console.log("updateBasketDetails response.data:", response.data)
        return response.data;
    } catch (error) {
        console.log("Error during updateBasketDetails:", error);
        if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
            let message = null;
            if (error.response.data){
                const obj = error.response.data;
                message = '';
                for (const key in obj) {
                    message += `${key}: ${obj[key]}\n`;
                }
            }

            alert(error.response.data.message || message || 'An error occurred');
        } else if (error.request) {
            console.log(error.request);
            alert('No response received from the server');
        } else {
            console.log('Error', error.message);
            alert(error.message || 'An error occurred');
        }
    }
}
