import axios from "axios";
import {getUser} from "../storage/UserStorage";

axios.defaults.baseURL = "https://api-saveursolidaire.ivoriandev.com/v1";

export const getAllOrdersByUserAndIsPaidTrue = async () => {
    try {
        const user = await getUser();
        const response = await axios.get('/orders/user/{user.id}/is-paid',
            {
                headers: {
                    'accept': 'application/json;charset=UTF-8',
                    'Authorization': 'Bearer ${user.token}',
                },
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
        const user = await getUser();
        const response = await axios.post('/orders',
            data,
            {
                headers: {
                    'accept': 'application/json;charset=UTF-8',
                    'Authorization': 'Bearer ${user.token}',
                },
            },
        );
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export const updateIsPaidOrder = async (orderId, isPaid) => {
    try {
        const user = await getUser();
        const response = await axios.put(`/orders/${orderId}`,
            { isPaid },
            {
                headers: {
                    'accept': 'application/json;charset=UTF-8',
                    'Authorization': `Bearer ${user.token}`,
                },
            },
        );
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
}
