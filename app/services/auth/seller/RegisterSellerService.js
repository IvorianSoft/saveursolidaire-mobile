import axios from "axios";
import {API_URL} from "../../SaveurSolidaireApi";

export const registerSeller = async (data) => {
    try {
        const response = await axios.post(
            `${API_URL}/auth/register-seller`,
            data,
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            },
        );
        console.log('response', response.data);
        return !!(response.status === 200 && response.data.token);

    } catch (error) {
        console.log(error);
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
