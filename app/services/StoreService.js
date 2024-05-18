import axios from "axios";
import {user} from "../constants/icons";
import {getUser} from "../storage/UserStorage";

axios.defaults.baseURL = "https://api-saveursolidaire.ivoriandev.com/v1";

export const getAllStores = async () => {
    try {
        const user = await getUser();
        console.log(user.token);
        const response = await axios.get('/stores',
            {
                headers: {
                    'accept': 'application/json;charset=UTF-8',
                    'Authorization': 'Bearer ${user.token}',
                },
            },
        );
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
}
