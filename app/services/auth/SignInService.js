import axios from 'axios';
import {fetchUser} from './FetchUserDataService';
import {API_URL} from '../SaveurSolidaireApi';

export const signIn = async data => {
  try {
    console.log('data', data);
    const response = await axios.post(
        `${API_URL}/auth/authenticate`,
      data,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    console.log('response', response.data);
    const userCredential = await response.data;

    await fetchUser(userCredential.token);

    return true;
  } catch (error) {
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
    return false;
  }
};
