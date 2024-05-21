import axios from "axios";
import {getToken} from "../storage/UserStorage";
import {API_URL} from "./SaveurSolidaireApi";

axios.defaults.baseURL = API_URL;

const headers = async () => {
    const token = await getToken();
    return {
        'accept': 'application/json;charset=UTF-8',
        'Authorization': `Bearer ${token}`,
    };
}

export const getAllOrdersByUserAndIsPaidTrue = async () => {
    try {
        const header = await headers();
        const response = await axios.get('/orders/user/is-paid',
            {
                headers: header
            },
        );
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export const getAllOrdersByUserAndIsPaidFalse = async () => {
    try {
        const header = await headers();
        const response = await axios.get('/orders',
            {
                headers: header
            },
        );
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export const createOrder = async (data) => {
    try {
        const header = await headers();

        const response = await axios.post('/orders',
            data,
            {
                headers: header
            },
        );
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const updateIsPaidOrder = async (orderId) => {
    try {
        const header = await headers();
        const response = await axios.put(`/orders/${orderId}/status`,
            {},
            {
                headers: header
            },
        );
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}
