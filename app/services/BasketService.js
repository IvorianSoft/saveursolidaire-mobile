import axios from "axios";
import {API_URL} from "./SaveurSolidaireApi";
import {getToken} from "../storage/UserStorage";

axios.defaults.baseURL = API_URL;

const getHeader = async () => {
    const token = await getToken();
    return {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
    };
}

export const searchBaskets = async (search) => {
    try {
        const headers = await getHeader();
        const response = await axios.get(
            `/baskets/search?longitude=${search.longitude}&latitude=${search.latitude}&radius=${search.radius}`,
            {
                headers: headers,
            },
        );
        console.log("searchBaskets response.data:", response.data)
        return response.data;
    } catch (error) {
        console.log("Error during searchBaskets:", error);
    }
}