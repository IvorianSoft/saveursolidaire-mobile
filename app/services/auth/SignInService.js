import axios from 'axios';
import {fetchUser} from './FetchUserDataService';

export const signIn = async data => {
  try {
    console.log('data', data);
    const response = await axios.post(
      'https://api-saveursolidaire.ivoriandev.com/v1/auth/authenticate',
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
    if (error.response && error.status === 403) {
      alert(error.message);
    }
    return false;
  }
};
