import axios from 'axios';
import {fetchUser} from './FetchUserDataService';
import {API_URL} from "../SaveurSolidaireApi";

axios.defaults.baseURL = API_URL;

export const register = async data => {
  try {
    const userCredential = await axios.post('/auth/register',
      data,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    const user = userCredential.data;
    console.log(user);
    return true;
  } catch (error) {
    console.log(error.message);
    let message = '';
    for (const key in error.response.data) {
      message += key + ': ' + error.response.data[key] + '\n';
    }
    alert(message);

    if (error.response && error.status === 403) {
      alert(error.message);
    }
    return false;
  }
};

export const registerSeller = async data => {
  try {
    const userCredential = await axios.post(
      'https://api-saveursolidaire.ivoriandev.com/v1/auth/register-seller',
      data,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    const user = userCredential.data;

    await fetchUser(user.token);

    return true;
  } catch (error) {
    if (error.response && error.status === 403) {
      alert(error.message);
    }
    return false;
  }
};
