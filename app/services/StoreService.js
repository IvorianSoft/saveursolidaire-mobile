import axios from "axios";
import {user} from "../constants/icons";
import {getToken} from "../storage/UserStorage";
import {API_URL} from "./SaveurSolidaireApi";

axios.defaults.baseURL = API_URL;

const getHeader = async () => {
    const token = await getToken();
    return {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
    };
}

export const getAllStores = async () => {
    try {
        const headers = await getHeader();
        const response = await axios.get('/stores',
            {
                headers: headers,
            },
        );
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
}
