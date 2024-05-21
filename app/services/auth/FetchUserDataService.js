import axios from 'axios';
import {storeUser} from '../../storage/UserStorage';
import {storeStore} from '../../storage/StoreStorage';
import {API_URL} from '../SaveurSolidaireApi';

const headers = token => ({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
});

export const fetchUser = async token => {
    try {
        const {data} = await axios.get(`${API_URL}/auth/me`, {headers: headers(token)});
        await storeUser({...data, token});

        if (data.role.name === 'SELLER') {
            await fetchStore(token);
        }
    } catch (error) {
        if (error.status === 403) {
            alert(error.message);
        }
    }
};

const fetchStore = async token => {
    try {
        const {data} = await axios.get(`${API_URL}/stores`, {headers: headers(token)});
        if (data.length > 0) {
            await storeStore(data[0]);
        }
    } catch (error) {
        console.log('Error during fetchStore:', error);
    }
};
